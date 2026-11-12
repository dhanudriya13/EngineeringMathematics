import { describe, expect, it } from 'vitest';
import {
  PROGRESS_STORAGE_KEY,
  createEmptyProgress,
  getCompletionPercentage,
  isModuleCompleted,
  loadProgress,
  recordExerciseResult,
  recordModuleVisit,
  recordQuizAttempt,
  resetProgress,
  saveProgress,
  setModuleCompletion,
  type StorageLike,
} from '../../src/lib/progress/storage';

function createMemoryStorage(initial: Record<string, string> = {}): StorageLike & {
  values: Map<string, string>;
} {
  const values = new Map(Object.entries(initial));

  return {
    values,
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => {
      values.set(key, value);
    },
    removeItem: (key) => {
      values.delete(key);
    },
  };
}

describe('penyimpanan progres', () => {
  it('mengembalikan progres awal saat penyimpanan kosong', () => {
    const storage = createMemoryStorage();
    const loaded = loadProgress(storage);

    expect(loaded.available).toBe(true);
    expect(loaded.progress.completedModules).toEqual([]);
    expect(loaded.progress.lastVisitedModule).toBeNull();
  });

  it('menangani Local Storage yang tidak tersedia', () => {
    const loaded = loadProgress(null);

    expect(loaded.available).toBe(false);
    expect(loaded.error).toMatch(/tidak tersedia/);
  });

  it('menangani JSON yang rusak tanpa melempar error', () => {
    const storage = createMemoryStorage({ [PROGRESS_STORAGE_KEY]: '{rusak' });
    const loaded = loadProgress(storage);

    expect(loaded.available).toBe(false);
    expect(loaded.progress.completedModules).toEqual([]);
  });

  it('mencatat modul terakhir dan status selesai', () => {
    const storage = createMemoryStorage();
    recordModuleVisit('pengantar-vektor', storage);
    const result = setModuleCompletion('pengantar-vektor', true, storage);

    expect(result.progress.lastVisitedModule).toBe('pengantar-vektor');
    expect(isModuleCompleted(result.progress, 'pengantar-vektor')).toBe(true);

    const undone = setModuleCompletion('pengantar-vektor', false, storage);
    expect(isModuleCompleted(undone.progress, 'pengantar-vektor')).toBe(false);
  });

  it('mencatat statistik latihan dan jawaban benar unik', () => {
    const storage = createMemoryStorage();
    recordExerciseResult('ex-1', true, storage);
    const result = recordExerciseResult('ex-1', false, storage);

    expect(result.progress.exerciseStats['ex-1']).toEqual({ attempts: 2, correct: 1 });
    expect(result.progress.completedExercises).toEqual(['ex-1']);
  });

  it('menyimpan skor terbaik kuis tanpa menurunkan skor sebelumnya', () => {
    const storage = createMemoryStorage();
    recordQuizAttempt('quiz-1', 60, storage);
    const improved = recordQuizAttempt('quiz-1', 90, storage);
    const lower = recordQuizAttempt('quiz-1', 70, storage);

    expect(improved.progress.quizAttempts['quiz-1']?.bestScore).toBe(90);
    expect(improved.progress.quizAttempts['quiz-1']?.attempts).toBe(2);
    expect(lower.progress.quizAttempts['quiz-1']?.bestScore).toBe(90);
    expect(lower.progress.quizAttempts['quiz-1']?.lastScore).toBe(70);
    expect(lower.progress.quizAttempts['quiz-1']?.attempts).toBe(3);
  });

  it('mengatur ulang progres', () => {
    const storage = createMemoryStorage();
    recordModuleVisit('pengantar-vektor', storage);
    setModuleCompletion('pengantar-vektor', true, storage);

    const result = resetProgress(storage);
    expect(result.saved).toBe(true);
    expect(result.progress.completedModules).toEqual([]);
  });

  it('menghitung persentase penyelesaian dengan batas aman', () => {
    const progress = createEmptyProgress();
    progress.completedModules = ['a', 'b'];

    expect(getCompletionPercentage(progress, 4)).toBe(50);
    expect(getCompletionPercentage(progress, 0)).toBe(0);
  });

  it('melaporkan kegagalan penyimpanan tanpa melempar error', () => {
    const storage: StorageLike = {
      getItem: () => null,
      setItem: () => {
        throw new Error('penuh');
      },
      removeItem: () => undefined,
    };
    const result = saveProgress(createEmptyProgress(), storage);

    expect(result.saved).toBe(false);
    expect(result.available).toBe(false);
    expect(result.error).toMatch(/gagal disimpan/);
  });
});
