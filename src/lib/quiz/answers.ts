import type { Exercise } from '../../data/exercises';
import { formatNumber } from '../math';
import { parseNumericInput } from '../validation/numbers';

export function isAnswerCorrect(exercise: Exercise, response: string): boolean {
  if (exercise.type === 'choice') {
    return response === exercise.answer;
  }

  const parsed = parseNumericInput(response);

  if (parsed.value === null) {
    return false;
  }

  return Math.abs(parsed.value - Number(exercise.answer)) <= (exercise.tolerance ?? 1e-6);
}

export function getCorrectAnswerLabel(exercise: Exercise): string {
  if (exercise.type === 'choice') {
    return (
      exercise.choices?.find((choice) => choice.id === exercise.answer)?.label ??
      String(exercise.answer)
    );
  }

  return formatNumber(Number(exercise.answer), 4);
}
