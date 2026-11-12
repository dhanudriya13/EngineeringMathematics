export type Difficulty = 'easy' | 'medium' | 'hard';

export interface AdaptiveState {
  difficulty: Difficulty;
  correctStreak: number;
  incorrectStreak: number;
  showHint: boolean;
}

export const DIFFICULTY_ORDER: readonly Difficulty[] = ['easy', 'medium', 'hard'];

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: 'Mudah',
  medium: 'Sedang',
  hard: 'Sulit',
};

export function createAdaptiveState(difficulty: Difficulty = 'easy'): AdaptiveState {
  return {
    difficulty,
    correctStreak: 0,
    incorrectStreak: 0,
    showHint: false,
  };
}

export function difficultyIndex(difficulty: Difficulty): number {
  const index = DIFFICULTY_ORDER.indexOf(difficulty);

  return index >= 0 ? index : 0;
}

export function applyCorrect(state: AdaptiveState): AdaptiveState {
  const correctStreak = state.correctStreak + 1;
  const currentIndex = difficultyIndex(state.difficulty);

  if (correctStreak >= 2 && currentIndex < DIFFICULTY_ORDER.length - 1) {
    return {
      difficulty: DIFFICULTY_ORDER[currentIndex + 1]!,
      correctStreak: 0,
      incorrectStreak: 0,
      showHint: false,
    };
  }

  return {
    difficulty: state.difficulty,
    correctStreak: Math.min(correctStreak, 2),
    incorrectStreak: 0,
    showHint: false,
  };
}

export function applyIncorrect(state: AdaptiveState): AdaptiveState {
  const incorrectStreak = state.incorrectStreak + 1;
  const currentIndex = difficultyIndex(state.difficulty);

  if (incorrectStreak >= 2 && currentIndex > 0) {
    return {
      difficulty: DIFFICULTY_ORDER[currentIndex - 1]!,
      correctStreak: 0,
      incorrectStreak: 0,
      showHint: true,
    };
  }

  return {
    difficulty: state.difficulty,
    correctStreak: 0,
    incorrectStreak,
    showHint: state.showHint || incorrectStreak >= 2,
  };
}
