import { describe, expect, it } from 'vitest';
import { curriculumModules } from '../../src/data/curriculum';
import { exercises } from '../../src/data/exercises';
import { quizzes } from '../../src/data/quizzes';

describe('bank latihan', () => {
  it('menyediakan lima soal untuk setiap modul', () => {
    expect(exercises).toHaveLength(80);

    for (const module of curriculumModules) {
      const moduleExercises = exercises.filter((exercise) => exercise.moduleId === module.id);
      expect(moduleExercises).toHaveLength(5);
    }
  });

  it('menggunakan id soal yang unik', () => {
    const ids = exercises.map((exercise) => exercise.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('mencakup ketiga tingkat kesulitan pada setiap modul', () => {
    for (const module of curriculumModules) {
      const levels = new Set(
        exercises
          .filter((exercise) => exercise.moduleId === module.id)
          .map((exercise) => exercise.difficulty),
      );

      expect(levels.has('easy')).toBe(true);
      expect(levels.has('medium')).toBe(true);
      expect(levels.has('hard')).toBe(true);
    }
  });

  it('melengkapi petunjuk, penjelasan, dan jawaban yang valid', () => {
    for (const exercise of exercises) {
      expect(exercise.hint.trim().length).toBeGreaterThan(0);
      expect(exercise.explanation.trim().length).toBeGreaterThan(0);

      if (exercise.type === 'numeric') {
        expect(typeof exercise.answer).toBe('number');
        expect(Number.isFinite(Number(exercise.answer))).toBe(true);
      } else {
        expect(typeof exercise.answer).toBe('string');
        expect(exercise.choices?.some((choice) => choice.id === exercise.answer)).toBe(true);
      }
    }
  });
});

describe('kuis topik', () => {
  it('menyediakan satu kuis untuk setiap modul', () => {
    expect(quizzes).toHaveLength(16);
    expect(quizzes.map((quiz) => quiz.moduleId).sort()).toEqual(
      curriculumModules.map((module) => module.id).sort(),
    );
  });

  it('menggunakan lima soal valid pada setiap kuis', () => {
    for (const quiz of quizzes) {
      expect(quiz.questionIds).toHaveLength(5);

      for (const id of quiz.questionIds) {
        expect(exercises.some((exercise) => exercise.id === id)).toBe(true);
      }
    }
  });
});
