import { curriculumModules } from './curriculum';
import { exercises } from './exercises';

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  questionIds: readonly string[];
}

export const quizzes: readonly Quiz[] = curriculumModules.map((module) => {
  const moduleExercises = exercises.filter((exercise) => exercise.moduleId === module.id);

  return {
    id: `quiz-${module.id}`,
    moduleId: module.id,
    title: `Kuis ${module.title}`,
    description: `${moduleExercises.length} soal untuk menguji pemahaman ${module.title.toLowerCase()}.`,
    questionIds: moduleExercises.map((exercise) => exercise.id),
  };
});

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

export function getQuizForModule(moduleId: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.moduleId === moduleId);
}
