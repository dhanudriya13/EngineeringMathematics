import { describe, expect, it } from 'vitest';
import { curriculumModules } from '../../src/data/curriculum';
import { formulas } from '../../src/data/formulas';
import { glossary } from '../../src/data/glossary';

const moduleIds = new Set(curriculumModules.map((module) => module.id));

describe('data referensi rumus', () => {
  it('menggunakan id rumus yang unik', () => {
    const ids = formulas.map((formula) => formula.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('menghubungkan setiap rumus ke modul yang valid', () => {
    for (const formula of formulas) {
      expect(moduleIds.has(formula.moduleId)).toBe(true);
    }
  });

  it('melengkapi ekspresi, penjelasan, dan variabel', () => {
    for (const formula of formulas) {
      expect(formula.expression.trim().length).toBeGreaterThan(0);
      expect(formula.explanation.trim().length).toBeGreaterThan(0);
      expect(formula.variables.length).toBeGreaterThan(0);
      expect(formula.example.trim().length).toBeGreaterThan(0);
    }
  });
});

describe('data glosarium', () => {
  it('menggunakan istilah yang unik', () => {
    const terms = glossary.map((entry) => entry.term.toLowerCase());
    expect(new Set(terms).size).toBe(terms.length);
  });

  it('menghubungkan setiap istilah ke modul yang valid', () => {
    for (const entry of glossary) {
      expect(moduleIds.has(entry.moduleId)).toBe(true);
    }
  });

  it('melengkapi definisi dan padanan bahasa Inggris', () => {
    for (const entry of glossary) {
      expect(entry.definition.trim().length).toBeGreaterThan(0);
      expect(entry.english.trim().length).toBeGreaterThan(0);
    }
  });

  it('mencakup istilah inti kurikulum', () => {
    const terms = new Set(glossary.map((entry) => entry.term));

    for (const required of [
      'Vektor',
      'Skalar',
      'Magnitudo',
      'Vektor Satuan',
      'Perkalian Titik',
      'Perkalian Silang',
      'Basis',
      'Dimensi',
    ]) {
      expect(terms.has(required)).toBe(true);
    }
  });
});
