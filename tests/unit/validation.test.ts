import { describe, expect, it } from 'vitest';
import {
  formatInputValue,
  parseNumericInput,
  parseVectorInput,
} from '../../src/lib/validation/numbers';

describe('parseNumericInput', () => {
  it('menerima bilangan bulat, desimal, negatif, dan notasi ilmiah', () => {
    expect(parseNumericInput('42')).toEqual({ value: 42, error: null });
    expect(parseNumericInput('-3,5')).toEqual({ value: -3.5, error: null });
    expect(parseNumericInput('1e-3')).toEqual({ value: 0.001, error: null });
  });

  it('menolak input kosong', () => {
    expect(parseNumericInput('   ').value).toBeNull();
    expect(parseNumericInput('   ').error).toMatch(/kosong/);
  });

  it('menolak format yang bukan angka', () => {
    expect(parseNumericInput('3,4,5').value).toBeNull();
    expect(parseNumericInput('abc').error).toMatch(/format/);
    expect(parseNumericInput('Infinity').value).toBeNull();
  });
});

describe('parseVectorInput', () => {
  it('mengembalikan vektor jika semua komponen valid', () => {
    expect(parseVectorInput(['1', '2,5', '-3'])).toEqual({
      vector: [1, 2.5, -3],
      errors: [],
    });
  });

  it('mengumpulkan kesalahan per komponen', () => {
    const result = parseVectorInput(['1', '', 'x']);

    expect(result.vector).toBeNull();
    expect(result.errors).toHaveLength(2);
    expect(result.errors[0]).toMatch(/Komponen 2/);
    expect(result.errors[1]).toMatch(/Komponen 3/);
  });
});

describe('formatInputValue', () => {
  it('menghilangkan negatif nol', () => {
    expect(formatInputValue(-0)).toBe('0');
    expect(formatInputValue(2.5)).toBe('2.5');
  });
});
