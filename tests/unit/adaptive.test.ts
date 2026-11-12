import { describe, expect, it } from 'vitest';
import {
  DIFFICULTY_LABELS,
  applyCorrect,
  applyIncorrect,
  createAdaptiveState,
  difficultyIndex,
} from '../../src/lib/quiz/adaptive';

describe('mesin latihan adaptif', () => {
  it('dimulai dari tingkat mudah', () => {
    expect(createAdaptiveState()).toEqual({
      difficulty: 'easy',
      correctStreak: 0,
      incorrectStreak: 0,
      showHint: false,
    });
  });

  it('menaikkan tingkat setelah dua jawaban benar berturut-turut', () => {
    const first = applyCorrect(createAdaptiveState('easy'));
    expect(first.difficulty).toBe('easy');
    expect(first.correctStreak).toBe(1);

    const second = applyCorrect(first);
    expect(second.difficulty).toBe('medium');
    expect(second.correctStreak).toBe(0);

    const third = applyCorrect(second);
    const fourth = applyCorrect(third);
    expect(fourth.difficulty).toBe('hard');
  });

  it('tidak menaikkan tingkat melewati sulit', () => {
    let state = createAdaptiveState('hard');

    for (let index = 0; index < 5; index += 1) {
      state = applyCorrect(state);
    }

    expect(state.difficulty).toBe('hard');
  });

  it('menurunkan tingkat dan menampilkan petunjuk setelah dua jawaban salah', () => {
    const first = applyIncorrect(createAdaptiveState('medium'));
    expect(first.difficulty).toBe('medium');
    expect(first.showHint).toBe(false);

    const second = applyIncorrect(first);
    expect(second.difficulty).toBe('easy');
    expect(second.showHint).toBe(true);
  });

  it('tetap di tingkat mudah tetapi menampilkan petunjuk setelah dua salah', () => {
    let state = createAdaptiveState('easy');
    state = applyIncorrect(state);
    state = applyIncorrect(state);

    expect(state.difficulty).toBe('easy');
    expect(state.showHint).toBe(true);
  });

  it('mengosongkan lawan streak saat hasil berubah', () => {
    const afterCorrect = applyCorrect(createAdaptiveState('medium'));
    expect(afterCorrect.incorrectStreak).toBe(0);

    const afterIncorrect = applyIncorrect(afterCorrect);
    expect(afterIncorrect.correctStreak).toBe(0);
  });

  it('menyediakan label tingkat dalam Bahasa Indonesia', () => {
    expect(DIFFICULTY_LABELS.easy).toBe('Mudah');
    expect(DIFFICULTY_LABELS.medium).toBe('Sedang');
    expect(DIFFICULTY_LABELS.hard).toBe('Sulit');
    expect(difficultyIndex('hard')).toBe(2);
  });
});
