import { useEffect, useRef, useState } from 'react';
import {
  isModuleCompleted,
  recordModuleVisit,
  setModuleCompletion,
} from '../../lib/progress/storage';
import styles from './ModuleProgress.module.css';

interface ModuleProgressProps {
  moduleId: string;
}

export default function ModuleProgress({ moduleId }: ModuleProgressProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [completed, setCompleted] = useState(false);
  const [available, setAvailable] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    rootRef.current?.setAttribute('data-hydrated', 'true');
    const visit = recordModuleVisit(moduleId);
    setAvailable(visit.available);

    if (!visit.available) {
      setMessage(visit.error ?? 'Progres tidak dapat disimpan.');
      return;
    }

    setCompleted(isModuleCompleted(visit.progress, moduleId));
  }, [moduleId]);

  function toggleCompleted() {
    const result = setModuleCompletion(moduleId, !completed);
    setAvailable(result.available);
    setCompleted(isModuleCompleted(result.progress, moduleId));

    setMessage(
      result.saved
        ? completed
          ? 'Tanda selesai dibatalkan.'
          : 'Modul ditandai selesai.'
        : result.error ?? 'Progres tidak dapat disimpan.',
    );
  }

  return (
    <div className={styles.box} ref={rootRef}>
      <div className={styles.copy}>
        <p className={styles.title}>Progres modul</p>
        <p className={`${styles.status} ${completed ? styles.statusComplete : ''}`}>
          {completed
            ? 'Modul ini ditandai selesai di peramban ini.'
            : available
              ? 'Tandai selesai setelah Anda memahami materi dan latihan.'
              : 'Local Storage tidak tersedia; progres tidak dapat disimpan.'}
        </p>
        {message && <p className={styles.message}>{message}</p>}
      </div>
      <button
        type="button"
        className={`${styles.button} ${completed ? styles.complete : ''}`}
        onClick={toggleCompleted}
        disabled={!available}
      >
        {completed ? 'Batalkan tanda selesai' : 'Tandai modul selesai'}
      </button>
    </div>
  );
}
