export interface NumericParseResult {
  value: number | null;
  error: string | null;
}

const NUMBER_PATTERN = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?$/i;

export function parseNumericInput(raw: string): NumericParseResult {
  const normalized = raw.trim().replace(',', '.');

  if (normalized === '') {
    return { value: null, error: 'Nilai tidak boleh kosong.' };
  }

  if (!NUMBER_PATTERN.test(normalized)) {
    return { value: null, error: 'Gunakan format angka yang valid, misalnya -2,5.' };
  }

  const value = Number(normalized);

  if (!Number.isFinite(value)) {
    return { value: null, error: 'Nilai harus berupa bilangan finite.' };
  }

  return { value, error: null };
}

export interface VectorParseResult {
  vector: number[] | null;
  errors: string[];
}

export function parseVectorInput(rawValues: readonly string[]): VectorParseResult {
  const errors: string[] = [];
  const vector: number[] = [];

  rawValues.forEach((raw, index) => {
    const result = parseNumericInput(raw);

    if (result.error || result.value === null) {
      errors.push(`Komponen ${index + 1}: ${result.error ?? 'Nilai tidak valid.'}`);
      return;
    }

    vector.push(result.value);
  });

  return {
    vector: errors.length === 0 ? vector : null,
    errors,
  };
}

export function formatInputValue(value: number): string {
  return Object.is(value, -0) ? '0' : String(value);
}
