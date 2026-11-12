import { describe, expect, it } from 'vitest';
import type { Exercise } from '../../src/data/exercises';
import { getCorrectAnswerLabel, isAnswerCorrect } from '../../src/lib/quiz/answers';

const numericExercise: Exercise = {
  id: 'test-numeric',
  moduleId: 'pengantar-vektor',
  difficulty: 'easy',
  type: 'numeric',
  question: 'Hitung 2 + 2.',
  answer: 4,
  tolerance: 0.01,
  hint: 'Jumlahkan.',
  explanation: '2 + 2 = 4.',
};

const choiceExercise: Exercise = {
  id: 'test-choice',
  moduleId: 'pengantar-vektor',
  difficulty: 'easy',
  type: 'choice',
  question: 'Pilih A.',
  choices: [
    { id: 'a', label: 'Pilihan A' },
    { id: 'b', label: 'Pilihan B' },
  ],
  answer: 'a',
  hint: 'A.',
  explanation: 'A benar.',
};

describe('pemeriksaan jawaban', () => {
  it('menerima jawaban numerik dalam toleransi', () => {
    expect(isAnswerCorrect(numericExercise, '4')).toBe(true);
    expect(isAnswerCorrect(numericExercise, '4,005')).toBe(true);
    expect(isAnswerCorrect(numericExercise, '4.02')).toBe(false);
  });

  it('menolak jawaban numerik yang bukan angka', () => {
    expect(isAnswerCorrect(numericExercise, 'empat')).toBe(false);
    expect(isAnswerCorrect(numericExercise, '')).toBe(false);
  });

  it('memeriksa jawaban pilihan ganda', () => {
    expect(isAnswerCorrect(choiceExercise, 'a')).toBe(true);
    expect(isAnswerCorrect(choiceExercise, 'b')).toBe(false);
  });

  it('menampilkan label jawaban yang benar', () => {
    expect(getCorrectAnswerLabel(choiceExercise)).toBe('Pilihan A');
    expect(getCorrectAnswerLabel(numericExercise)).toBe('4');
  });
});
