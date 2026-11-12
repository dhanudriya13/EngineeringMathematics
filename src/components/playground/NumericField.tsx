import { useEffect, useId, useRef, useState } from 'react';
import { formatInputValue, parseNumericInput } from '../../lib/validation/numbers';
import styles from './Playground.module.css';

interface NumericFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function NumericField({
  label,
  value,
  onChange,
  min = -10,
  max = 10,
  step = 0.5,
}: NumericFieldProps) {
  const inputId = useId();
  const errorId = useId();
  const [text, setText] = useState(() => formatInputValue(value));
  const [error, setError] = useState<string | null>(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (lastValue.current === value) {
      return;
    }

    lastValue.current = value;
    const parsed = parseNumericInput(text);

    if (parsed.value !== value) {
      setText(formatInputValue(value));
      setError(null);
    }
  }, [value, text]);

  function handleInput(raw: string) {
    setText(raw);
    const parsed = parseNumericInput(raw);

    if (parsed.error || parsed.value === null) {
      setError(parsed.error);
      return;
    }

    setError(null);
    onChange(parsed.value);
  }

  function handleBlur() {
    if (error) {
      setText(formatInputValue(value));
      setError(null);
    }
  }

  return (
    <div className={styles.numericField}>
      <label htmlFor={inputId}>{label}</label>
      <div className={styles.numericRow}>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={text}
          onChange={(event) => handleInput(event.target.value)}
          onBlur={handleBlur}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          className={error ? styles.inputError : undefined}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => {
            const next = Number(event.target.value);
            setText(formatInputValue(next));
            setError(null);
            onChange(next);
          }}
          aria-label={`Atur ${label}`}
        />
      </div>
      {error && (
        <p className={styles.fieldError} id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
