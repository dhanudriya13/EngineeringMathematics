import type { PlaygroundVector } from '../../data/playground';
import NumericField from './NumericField';
import styles from './Playground.module.css';

interface VectorInputProps {
  label: string;
  value: PlaygroundVector;
  dimension: 2 | 3;
  onChange: (value: PlaygroundVector) => void;
}

export default function VectorInput({ label, value, dimension, onChange }: VectorInputProps) {
  return (
    <fieldset className={styles.vectorInput}>
      <legend>{label}</legend>
      <div className={styles.vectorFields}>
        <NumericField
          label="x"
          value={value.x}
          onChange={(x) => onChange({ ...value, x })}
          min={-10}
          max={10}
          step={0.5}
        />
        <NumericField
          label="y"
          value={value.y}
          onChange={(y) => onChange({ ...value, y })}
          min={-10}
          max={10}
          step={0.5}
        />
        {dimension === 3 && (
          <NumericField
            label="z"
            value={value.z}
            onChange={(z) => onChange({ ...value, z })}
            min={-10}
            max={10}
            step={0.5}
          />
        )}
      </div>
    </fieldset>
  );
}
