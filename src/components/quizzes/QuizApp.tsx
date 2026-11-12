import { useEffect, useState } from 'react';
import { getExerciseById, type Exercise } from '../../data/exercises';
import { getQuizById, quizzes } from '../../data/quizzes';
import {
  createEmptyProgress,
  getBestQuizScore,
  loadProgress,
  recordQuizAttempt,
  type LearningProgress,
} from '../../lib/progress/storage';
import { getCorrectAnswerLabel, isAnswerCorrect } from '../../lib/quiz/answers';
import styles from './QuizApp.module.css';

export default function QuizApp() {
  const [progress, setProgress] = useState<LearningProgress>(createEmptyProgress);
  const [available, setAvailable] = useState(true);
  const [quizId, setQuizId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [response, setResponse] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [storageNote, setStorageNote] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded.progress);
    setAvailable(loaded.available);

    if (!loaded.available) {
      setStorageNote(loaded.error ?? 'Progres tidak dapat disimpan.');
    }
  }, []);

  const quiz = quizId ? getQuizById(quizId) : undefined;
  const questions: Exercise[] = quiz
    ? quiz.questionIds.flatMap((id) => {
        const exercise = getExerciseById(id);
        return exercise ? [exercise] : [];
      })
    : [];
  const question = questions[index];

  function resetAnswer() {
    setResponse('');
    setSubmitted(false);
    setIsCorrect(null);
    setAnswerError(null);
  }

  function startQuiz(id: string) {
    setQuizId(id);
    setIndex(0);
    setAnswers([]);
    setResponse('');
    setSubmitted(false);
    setIsCorrect(null);
    setFinished(false);
    setFinalScore(0);
    setAnswerError(null);
  }

  function handleSubmit() {
    if (!question) {
      return;
    }

    if (!response.trim()) {
      setAnswerError(
        question.type === 'choice'
          ? 'Pilih salah satu jawaban terlebih dahulu.'
          : 'Isi jawaban terlebih dahulu.',
      );
      return;
    }

    const correct = isAnswerCorrect(question, response);
    setAnswers((current) => [...current, correct]);
    setSubmitted(true);
    setIsCorrect(correct);
    setAnswerError(null);
  }

  function handleNext() {
    if (!quiz) {
      return;
    }

    if (index < questions.length - 1) {
      setIndex((current) => current + 1);
      resetAnswer();
      return;
    }

    const score = Math.round((answers.filter(Boolean).length / questions.length) * 100);
    const write = recordQuizAttempt(quiz.id, score);

    setProgress(write.progress);
    setAvailable(write.available);
    setFinalScore(score);
    setFinished(true);

    if (!write.available) {
      setStorageNote(write.error ?? 'Progres tidak dapat disimpan.');
    }
  }

  if (!quiz) {
    return (
      <div className={styles.app}>
        <div className={styles.listHeader}>
          <div>
            <h2>Pilih kuis topik</h2>
            <p className={styles.note}>
              Setiap kuis berisi lima soal dari modul terkait. Skor terbaik disimpan di peramban
              ini dan tidak disinkronkan antar perangkat.
            </p>
          </div>
          {!available && <span className={styles.badge}>Penyimpanan tidak tersedia</span>}
        </div>

        <div className={styles.grid}>
          {quizzes.map((item) => {
            const best = getBestQuizScore(progress, item.id);
            const attempts = progress.quizAttempts[item.id]?.attempts ?? 0;

            return (
              <article className={styles.card} key={item.id}>
                <div className={styles.cardHeader}>
                  <h3>{item.title}</h3>
                  {best >= 80 ? (
                    <span className={`${styles.badge} ${styles.badgeSuccess}`}>Selesai</span>
                  ) : attempts > 0 ? (
                    <span className={`${styles.badge} ${styles.badgeAccent}`}>
                      Terbaik {best}%
                    </span>
                  ) : (
                    <span className={styles.badge}>Belum dikerjakan</span>
                  )}
                </div>
                <div className={styles.meta}>
                  <span>{item.questionIds.length} soal</span>
                  <span>·</span>
                  <span>{attempts} percobaan</span>
                </div>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  onClick={() => startQuiz(item.id)}
                >
                  {attempts > 0 ? 'Ulangi kuis' : 'Mulai kuis'}
                </button>
              </article>
            );
          })}
        </div>

        {storageNote && <p className={styles.note}>{storageNote}</p>}
      </div>
    );
  }

  if (finished) {
    const correctCount = answers.filter(Boolean).length;

    return (
      <div className={styles.app}>
        <section className={styles.final} aria-labelledby="quiz-final-title">
          <span className={styles.badge}>Hasil kuis</span>
          <h2 id="quiz-final-title">{quiz.title}</h2>
          <p className={styles.finalScore}>{finalScore}%</p>
          <p>
            {correctCount} dari {questions.length} jawaban benar.
          </p>
          <p className={styles.note}>
            {finalScore >= 80
              ? 'Topik ini ditandai selesai berdasarkan skor terbaik Anda.'
              : 'Ulangi kuis untuk meningkatkan skor. Setiap percobaan disimpan secara lokal.'}
          </p>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={() => startQuiz(quiz.id)}
            >
              Ulangi kuis
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => {
                setQuizId(null);
                setFinished(false);
              }}
            >
              Pilih kuis lain
            </button>
          </div>
          {storageNote && <p className={styles.note}>{storageNote}</p>}
        </section>
      </div>
    );
  }

  if (!question) {
    return (
      <div className={styles.app}>
        <p className={styles.note}>Soal untuk kuis ini belum tersedia.</p>
        <button type="button" className={styles.button} onClick={() => setQuizId(null)}>
          Kembali ke daftar kuis
        </button>
      </div>
    );
  }

  const progressPercent = ((index + (submitted ? 1 : 0)) / questions.length) * 100;

  return (
    <div className={styles.app}>
      <section className={styles.runner} aria-labelledby="quiz-question">
        <div className={styles.runnerHeader}>
          <div>
            <span className={styles.badge}>{quiz.title}</span>
            <h2 id="quiz-question">
              Soal {index + 1} dari {questions.length}
            </h2>
          </div>
          <button type="button" className={styles.button} onClick={() => setQuizId(null)}>
            Keluar
          </button>
        </div>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progressPercent)}
          aria-label="Kemajuan kuis"
        >
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>

        <h2 className={styles.question}>{question.question}</h2>

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
                    name={`quiz-${question.id}`}
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
            <label htmlFor="quiz-answer">Jawaban</label>
            <input
              id="quiz-answer"
              type="text"
              inputMode="decimal"
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              disabled={submitted}
              className={answerError ? styles.inputError : undefined}
              aria-invalid={answerError ? 'true' : undefined}
              aria-describedby={answerError ? 'quiz-answer-error' : undefined}
            />
            {answerError && (
              <p className={styles.error} id="quiz-answer-error" role="alert">
                {answerError}
              </p>
            )}
          </div>
        )}

        <div className={styles.actions}>
          {!submitted ? (
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleSubmit}
            >
              Periksa jawaban
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.button} ${styles.buttonPrimary}`}
              onClick={handleNext}
            >
              {index === questions.length - 1 ? 'Lihat hasil' : 'Soal berikutnya'}
            </button>
          )}
        </div>

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

        {storageNote && <p className={styles.note}>{storageNote}</p>}
      </section>
    </div>
  );
}
