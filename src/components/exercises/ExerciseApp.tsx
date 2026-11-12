import { useEffect, useRef, useState } from 'react';
import { curriculumModules } from '../../data/curriculum';
import {
  getExercisesByDifficulty,
  getExercisesForModule,
  type Exercise,
} from '../../data/exercises';
import { recordExerciseResult } from '../../lib/progress/storage';
import {
  DIFFICULTY_LABELS,
  applyCorrect,
  applyIncorrect,
  createAdaptiveState,
  type AdaptiveState,
  type Difficulty,
} from '../../lib/quiz/adaptive';
import { getCorrectAnswerLabel, isAnswerCorrect } from '../../lib/quiz/answers';
import styles from './ExerciseApp.module.css';

type Mode = 'adaptive' | Difficulty;

const initialModule = curriculumModules[0]!;

function pickQuestion(moduleId: string, difficulty: Difficulty, cursor: number): Exercise {
  const levelPool = getExercisesByDifficulty(moduleId, difficulty);
  const pool = levelPool.length > 0 ? levelPool : getExercisesForModule(moduleId);
  const safePool = pool.length > 0 ? pool : getExercisesForModule(initialModule.id);

  return safePool[cursor % safePool.length]!;
}

export default function ExerciseApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [moduleId, setModuleId] = useState(initialModule.id);
  const [mode, setMode] = useState<Mode>('adaptive');
  const [adaptive, setAdaptive] = useState<AdaptiveState>(createAdaptiveState('easy'));
  const [cursor, setCursor] = useState(0);
  const [question, setQuestion] = useState<Exercise>(() =>
    pickQuestion(initialModule.id, 'easy', 0),
  );
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [storageNote, setStorageNote] = useState<string | null>(null);

  const moduleTitle =
    curriculumModules.find((module) => module.id === moduleId)?.title ?? 'Modul';
  const hintVisible = showHint || (mode === 'adaptive' && adaptive.showHint);
  const pool = getExercisesByDifficulty(moduleId, question.difficulty);

  useEffect(() => {
    rootRef.current?.setAttribute('data-hydrated', 'true');
  }, []);
  const position = pool.findIndex((item) => item.id === question.id) + 1;

  function resetAnswer() {
    setResponse('');
    setSubmitted(false);
    setIsCorrect(null);
    setShowHint(false);
    setAnswerError(null);
  }

  function startSession(nextModuleId: string, nextMode: Mode) {
    const startDifficulty: Difficulty = nextMode === 'adaptive' ? 'easy' : nextMode;

    setModuleId(nextModuleId);
    setMode(nextMode);
    setAdaptive(createAdaptiveState(startDifficulty));
    setCursor(0);
    setQuestion(pickQuestion(nextModuleId, startDifficulty, 0));
    resetAnswer();
  }

  function handleSubmit() {
    if (!response.trim()) {
      setAnswerError(
        question.type === 'choice'
          ? 'Pilih salah satu jawaban terlebih dahulu.'
          : 'Isi jawaban terlebih dahulu.',
      );
      return;
    }

    const correct = isAnswerCorrect(question, response);
    const write = recordExerciseResult(question.id, correct);

    setSubmitted(true);
    setIsCorrect(correct);
    setAnswerError(null);

    if (!correct) {
      setShowHint(true);
    }

    if (!write.available) {
      setStorageNote(write.error ?? 'Progres tidak dapat disimpan.');
    } else {
      setStorageNote(null);
    }

    if (mode === 'adaptive') {
      setAdaptive((current) => (correct ? applyCorrect(current) : applyIncorrect(current)));
    }
  }

  function handleNext() {
    const nextDifficulty: Difficulty = mode === 'adaptive' ? adaptive.difficulty : mode;
    const nextCursor = cursor + 1;

    setQuestion(pickQuestion(moduleId, nextDifficulty, nextCursor));
    setCursor(nextCursor);
    resetAnswer();
  }

  return (
    <div className={styles.app} ref={rootRef}>
      <div className={styles.toolbar}>
        <div className={styles.field}>
          <label htmlFor="exercise-module">Topik</label>
          <select
            id="exercise-module"
            className={styles.select}
            value={moduleId}
            onChange={(event) => startSession(event.target.value, mode)}
          >
            {curriculumModules.map((module) => (
              <option key={module.id} value={module.id}>
                {String(module.number).padStart(2, '0')} · {module.title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="exercise-mode">Mode latihan</label>
          <select
            id="exercise-mode"
            className={styles.select}
            value={mode}
            onChange={(event) => startSession(moduleId, event.target.value as Mode)}
          >
            <option value="adaptive">Adaptif</option>
            <option value="easy">Mudah</option>
            <option value="medium">Sedang</option>
            <option value="hard">Sulit</option>
          </select>
        </div>
      </div>

      <article className={styles.card} aria-labelledby="exercise-question">
        <div className={styles.meta}>
          <span className={styles.badge}>{moduleTitle}</span>
          <span className={`${styles.badge} ${styles.badgeLevel}`}>
            {DIFFICULTY_LABELS[question.difficulty]}
          </span>
          <span className={styles.badge}>
            {question.type === 'choice' ? 'Pilihan ganda' : 'Jawaban numerik'}
          </span>
          {position > 0 && pool.length > 0 && (
            <span className={styles.badge}>
              Soal {position} dari {pool.length}
            </span>
          )}
        </div>

        <h2 className={styles.question} id="exercise-question">
          {question.question}
        </h2>

        {question.type === 'choice' ? (
          <fieldset className={styles.choices}>
            <legend className={styles.visuallyHidden}>Pilih jawaban</legend>
            {question.choices?.map((choice) => {
              const selected = response === choice.id;
              const showCorrect = submitted && choice.id === question.answer;
              const showWrong = submitted && selected && choice.id !== question.answer;

              return (
                <label
                  key={choice.id}
                  className={`${styles.choice} ${showCorrect ? styles.choiceCorrect : ''} ${
                    showWrong ? styles.choiceWrong : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`exercise-${question.id}`}
                    value={choice.id}
                    checked={selected}
                    onChange={() => setResponse(choice.id)}
                    disabled={submitted}
                  />
                  <span>{choice.label}</span>
                </label>
              );
            })}
          </fieldset>
        ) : (
          <div className={styles.answerField}>
            <label htmlFor="exercise-answer">Jawaban</label>
            <input
              id="exercise-answer"
              type="text"
              inputMode="decimal"
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              disabled={submitted}
              className={answerError ? styles.inputError : undefined}
              aria-invalid={answerError ? 'true' : undefined}
              aria-describedby={answerError ? 'exercise-answer-error' : undefined}
            />
            {answerError && (
              <p className={styles.error} id="exercise-answer-error" role="alert">
                {answerError}
              </p>
            )}
          </div>
        )}

        <div className={styles.actions}>
          {!submitted ? (
            <>
              <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleSubmit}>
                Periksa jawaban
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => setShowHint((current) => !current)}
                aria-expanded={hintVisible}
              >
                {hintVisible ? 'Sembunyikan petunjuk' : 'Lihat petunjuk'}
              </button>
            </>
          ) : (
            <>
              <button type="button" className={styles.button} onClick={resetAnswer}>
                Coba lagi
              </button>
              <button type="button" className={`${styles.button} ${styles.buttonPrimary}`} onClick={handleNext}>
                Soal berikutnya
              </button>
            </>
          )}
        </div>

        {hintVisible && <p className={styles.hint}><strong>Petunjuk:</strong> {question.hint}</p>}

        {submitted && isCorrect !== null && (
          <div
            className={`${styles.feedback} ${
              isCorrect ? styles.feedbackCorrect : styles.feedbackWrong
            }`}
            role="status"
          >
            <p className={styles.feedbackTitle}>
              {isCorrect ? 'Jawaban benar.' : 'Belum tepat.'}
            </p>
            {!isCorrect && (
              <p>
                <strong>Jawaban benar:</strong> {getCorrectAnswerLabel(question)}
              </p>
            )}
            <p>{question.explanation}</p>
          </div>
        )}

        {mode === 'adaptive' && (
          <p className={styles.note}>
            Tingkat adaptif saat ini: {DIFFICULTY_LABELS[adaptive.difficulty]}. Dua jawaban benar
            berturut-turut menaikkan tingkat; dua jawaban salah menurunkan tingkat dan menampilkan
            petunjuk.
          </p>
        )}
        {storageNote && <p className={styles.note}>{storageNote}</p>}
      </article>
    </div>
  );
}
