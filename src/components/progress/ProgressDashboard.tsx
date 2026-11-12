import { useEffect, useState } from 'react';
import { curriculumModules } from '../../data/curriculum';
import { getQuizById } from '../../data/quizzes';
import {
  createEmptyProgress,
  getCompletionPercentage,
  loadProgress,
  resetProgress,
  type LearningProgress,
} from '../../lib/progress/storage';
import styles from './ProgressDashboard.module.css';

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function ProgressDashboard() {
  const [progress, setProgress] = useState<LearningProgress>(createEmptyProgress);
  const [available, setAvailable] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadProgress();
    setProgress(loaded.progress);
    setAvailable(loaded.available);
    setError(loaded.error ?? null);
  }, []);

  const completion = getCompletionPercentage(progress, curriculumModules.length);
  const completedModules = progress.completedModules.flatMap((id) => {
    const module = curriculumModules.find((item) => item.id === id);
    return module ? [module] : [];
  });
  const lastVisited = progress.lastVisitedModule
    ? curriculumModules.find((module) => module.id === progress.lastVisitedModule)
    : null;
  const exerciseStats = Object.values(progress.exerciseStats);
  const exerciseAttempts = exerciseStats.reduce((total, item) => total + item.attempts, 0);
  const exerciseCorrect = exerciseStats.reduce((total, item) => total + item.correct, 0);
  const quizRows = Object.entries(progress.quizAttempts)
    .flatMap(([id, attempt]) => {
      const quiz = getQuizById(id);
      return quiz ? [{ quiz, attempt }] : [];
    })
    .sort((a, b) => b.attempt.updatedAt.localeCompare(a.attempt.updatedAt));
  const isEmpty =
    progress.completedModules.length === 0 &&
    exerciseAttempts === 0 &&
    quizRows.length === 0;

  function handleReset() {
    const result = resetProgress();
    setProgress(result.progress);
    setAvailable(result.available);
    setConfirming(false);
    setMessage(
      result.saved
        ? 'Progres berhasil dihapus dari peramban ini.'
        : result.error ?? 'Progres tidak dapat dihapus.',
    );
  }

  return (
    <div className={styles.app}>
      {(!available || error) && (
        <div className={styles.notice} role="status">
          {error ??
            'Local Storage tidak tersedia. Progres tidak akan tersimpan di perangkat ini.'}
        </div>
      )}

      <div className={styles.overview}>
        <section className={styles.hero} aria-labelledby="progress-overview-title">
          <p className={styles.note}>Penyelesaian kurikulum</p>
          <p className={styles.percentage}>{completion}%</p>
          <h2 id="progress-overview-title">
            {completedModules.length} dari {curriculumModules.length} modul selesai
          </h2>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={completion}
            aria-label="Persentase penyelesaian modul"
          >
            <div className={styles.progressFill} style={{ width: `${completion}%` }} />
          </div>
          {lastVisited ? (
            <p className={styles.note}>
              Modul terakhir dibuka:{' '}
              <a href={`/materi/${lastVisited.id}`}>{lastVisited.title}</a>
            </p>
          ) : (
            <p className={styles.note}>Belum ada modul yang dibuka di peramban ini.</p>
          )}
          <p className={styles.note}>
            Progres bersifat lokal untuk perangkat dan peramban ini. Data tidak disinkronkan ke
            perangkat lain.
          </p>
        </section>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>{progress.completedExercises.length}</span>
            <span className={styles.statLabel}>Latihan dijawab benar</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{exerciseAttempts}</span>
            <span className={styles.statLabel}>Total percobaan latihan</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{exerciseCorrect}</span>
            <span className={styles.statLabel}>Jawaban latihan benar</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{quizRows.length}</span>
            <span className={styles.statLabel}>Kuis dikerjakan</span>
          </div>
        </div>
      </div>

      {isEmpty ? (
        <section className={styles.section}>
          <h2>Belum ada progres</h2>
          <p className={styles.empty}>
            Mulai dengan membaca modul, mengerjakan latihan, atau menyelesaikan kuis. Progres akan
            muncul di halaman ini setelah Anda menandai modul selesai atau menjawab soal.
          </p>
          <div className={styles.actions}>
            <a className={styles.button} href="/materi">Buka kurikulum</a>
            <a className={styles.button} href="/latihan">Mulai latihan</a>
            <a className={styles.button} href="/kuis">Mulai kuis</a>
          </div>
        </section>
      ) : (
        <>
          <section className={styles.section} aria-labelledby="completed-modules-title">
            <h2 id="completed-modules-title">Modul selesai</h2>
            {completedModules.length > 0 ? (
              <ul className={styles.moduleList}>
                {completedModules.map((module) => (
                  <li key={module.id}>
                    <a href={`/materi/${module.id}`}>
                      <span className={styles.moduleNumber}>
                        {String(module.number).padStart(2, '0')}
                      </span>
                      <span>{module.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>
                Belum ada modul yang ditandai selesai. Gunakan tombol “Tandai modul selesai” di
                halaman modul.
              </p>
            )}
          </section>

          <section className={styles.section} aria-labelledby="quiz-history-title">
            <h2 id="quiz-history-title">Riwayat kuis</h2>
            {quizRows.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Kuis</th>
                    <th scope="col">Skor terbaik</th>
                    <th scope="col">Skor terakhir</th>
                    <th scope="col">Percobaan</th>
                    <th scope="col">Diperbarui</th>
                  </tr>
                </thead>
                <tbody>
                  {quizRows.map(({ quiz, attempt }) => (
                    <tr key={quiz.id}>
                      <td>{quiz.title}</td>
                      <td className={`${styles.score} ${attempt.bestScore >= 80 ? styles.scoreGood : ''}`}>
                        {attempt.bestScore}%
                      </td>
                      <td className={styles.score}>{attempt.lastScore}%</td>
                      <td>{attempt.attempts}</td>
                      <td>{dateFormatter.format(new Date(attempt.updatedAt))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.empty}>Belum ada kuis yang diselesaikan.</p>
            )}
          </section>
        </>
      )}

      <section className={styles.section} aria-labelledby="reset-title">
        <h2 id="reset-title">Atur ulang progres</h2>
        <p className={styles.note}>
          Tindakan ini menghapus modul selesai, riwayat latihan, dan riwayat kuis dari peramban
          ini. Tindakan tidak dapat dibatalkan.
        </p>
        {!confirming ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.button} ${styles.danger}`}
              onClick={() => {
                setConfirming(true);
                setMessage(null);
              }}
              disabled={!available}
            >
              Hapus progres
            </button>
          </div>
        ) : (
          <div className={styles.confirm} role="alert">
            <p>Hapus seluruh progres belajar di peramban ini?</p>
            <div className={styles.actions}>
              <button
                type="button"
                className={`${styles.button} ${styles.danger}`}
                onClick={handleReset}
              >
                Ya, hapus
              </button>
              <button
                type="button"
                className={styles.button}
                onClick={() => setConfirming(false)}
              >
                Batal
              </button>
            </div>
          </div>
        )}
        {message && (
          <p className={styles.status} role="status">
            {message}
          </p>
        )}
      </section>
    </div>
  );
}
