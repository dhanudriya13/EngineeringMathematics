export interface ExerciseStats {
  attempts: number;
  correct: number;
}

export interface QuizAttempt {
  attempts: number;
  bestScore: number;
  lastScore: number;
  updatedAt: string;
}

export interface LearningProgress {
  version: 1;
  completedModules: string[];
  completedExercises: string[];
  exerciseStats: Record<string, ExerciseStats>;
  quizAttempts: Record<string, QuizAttempt>;
  lastVisitedModule: string | null;
  updatedAt: string;
}

export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

export interface ProgressLoadResult {
  progress: LearningProgress;
  available: boolean;
  error?: string;
}

export interface ProgressWriteResult extends ProgressLoadResult {
  saved: boolean;
}

export const PROGRESS_STORAGE_KEY = 'vector-lab:progress:v1';

export function createEmptyProgress(): LearningProgress {
  return {
    version: 1,
    completedModules: [],
    completedExercises: [],
    exerciseStats: {},
    quizAttempts: {},
    lastVisitedModule: null,
    updatedAt: new Date(0).toISOString(),
  };
}

export function getBrowserStorage(): StorageLike | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storage = window.localStorage;
    const probe = '__vector_lab_storage_probe__';
    storage.setItem(probe, '1');
    storage.removeItem(probe);

    return storage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isExerciseStats(value: unknown): value is ExerciseStats {
  return (
    isRecord(value) &&
    typeof value.attempts === 'number' &&
    typeof value.correct === 'number'
  );
}

function isQuizAttempt(value: unknown): value is QuizAttempt {
  return (
    isRecord(value) &&
    typeof value.attempts === 'number' &&
    typeof value.bestScore === 'number' &&
    typeof value.lastScore === 'number' &&
    typeof value.updatedAt === 'string'
  );
}

function isValidProgress(value: unknown): value is LearningProgress {
  if (!isRecord(value) || value.version !== 1) {
    return false;
  }

  if (!isStringArray(value.completedModules) || !isStringArray(value.completedExercises)) {
    return false;
  }

  if (!isRecord(value.exerciseStats) || !isRecord(value.quizAttempts)) {
    return false;
  }

  if (!Object.values(value.exerciseStats).every(isExerciseStats)) {
    return false;
  }

  if (!Object.values(value.quizAttempts).every(isQuizAttempt)) {
    return false;
  }

  return (
    (typeof value.lastVisitedModule === 'string' || value.lastVisitedModule === null) &&
    typeof value.updatedAt === 'string'
  );
}

function cloneProgress(progress: LearningProgress): LearningProgress {
  return JSON.parse(JSON.stringify(progress)) as LearningProgress;
}

export function loadProgress(storage: StorageLike | null = getBrowserStorage()): ProgressLoadResult {
  if (!storage) {
    return {
      progress: createEmptyProgress(),
      available: false,
      error: 'Local Storage tidak tersedia. Progres tidak akan tersimpan di perangkat ini.',
    };
  }

  try {
    const raw = storage.getItem(PROGRESS_STORAGE_KEY);

    if (!raw) {
      return { progress: createEmptyProgress(), available: true };
    }

    const parsed: unknown = JSON.parse(raw);

    if (!isValidProgress(parsed)) {
      return {
        progress: createEmptyProgress(),
        available: true,
        error: 'Data progres tidak dikenali dan dimulai dari awal.',
      };
    }

    return { progress: parsed, available: true };
  } catch {
    return {
      progress: createEmptyProgress(),
      available: false,
      error: 'Data progres tidak dapat dibaca. Periksa pengaturan penyimpanan peramban.',
    };
  }
}

export function saveProgress(
  progress: LearningProgress,
  storage: StorageLike | null = getBrowserStorage(),
): ProgressWriteResult {
  if (!storage) {
    return {
      progress,
      available: false,
      saved: false,
      error: 'Local Storage tidak tersedia. Progres tidak dapat disimpan.',
    };
  }

  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));

    return { progress, available: true, saved: true };
  } catch {
    return {
      progress,
      available: false,
      saved: false,
      error: 'Progres gagal disimpan. Penyimpanan peramban mungkin penuh atau diblokir.',
    };
  }
}

export function updateProgress(
  mutator: (progress: LearningProgress) => void,
  storage: StorageLike | null = getBrowserStorage(),
): ProgressWriteResult {
  const loaded = loadProgress(storage);

  if (!loaded.available) {
    return { ...loaded, saved: false };
  }

  const next = cloneProgress(loaded.progress);
  mutator(next);
  next.updatedAt = new Date().toISOString();

  return saveProgress(next, storage);
}

export function recordModuleVisit(moduleId: string, storage?: StorageLike | null): ProgressWriteResult {
  return updateProgress((progress) => {
    progress.lastVisitedModule = moduleId;
  }, storage);
}

export function setModuleCompletion(
  moduleId: string,
  completed: boolean,
  storage?: StorageLike | null,
): ProgressWriteResult {
  return updateProgress((progress) => {
    const set = new Set(progress.completedModules);

    if (completed) {
      set.add(moduleId);
    } else {
      set.delete(moduleId);
    }

    progress.completedModules = [...set].sort();
  }, storage);
}

export function recordExerciseResult(
  exerciseId: string,
  correct: boolean,
  storage?: StorageLike | null,
): ProgressWriteResult {
  return updateProgress((progress) => {
    const stats = progress.exerciseStats[exerciseId] ?? { attempts: 0, correct: 0 };
    stats.attempts += 1;

    if (correct) {
      stats.correct += 1;

      if (!progress.completedExercises.includes(exerciseId)) {
        progress.completedExercises.push(exerciseId);
      }
    }

    progress.exerciseStats[exerciseId] = stats;
  }, storage);
}

export function recordQuizAttempt(
  quizId: string,
  scorePercent: number,
  storage?: StorageLike | null,
): ProgressWriteResult {
  return updateProgress((progress) => {
    const previous = progress.quizAttempts[quizId];
    const score = Math.max(0, Math.min(100, Math.round(scorePercent)));

    progress.quizAttempts[quizId] = {
      attempts: (previous?.attempts ?? 0) + 1,
      bestScore: Math.max(previous?.bestScore ?? 0, score),
      lastScore: score,
      updatedAt: new Date().toISOString(),
    };
  }, storage);
}

export function resetProgress(storage?: StorageLike | null): ProgressWriteResult {
  return saveProgress(createEmptyProgress(), storage);
}

export function isModuleCompleted(progress: LearningProgress, moduleId: string): boolean {
  return progress.completedModules.includes(moduleId);
}

export function getBestQuizScore(progress: LearningProgress, quizId: string): number {
  return progress.quizAttempts[quizId]?.bestScore ?? 0;
}

export function getCompletionPercentage(
  progress: LearningProgress,
  totalModules: number,
): number {
  if (totalModules <= 0) {
    return 0;
  }

  return Math.round((progress.completedModules.length / totalModules) * 100);
}
