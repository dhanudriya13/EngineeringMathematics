import { describe, expect, it } from 'vitest';
import { curriculumGroups, curriculumModules } from '../../src/data/curriculum';

describe('struktur kurikulum', () => {
  it('memuat 16 modul bernomor 1 sampai 16 tanpa duplikasi', () => {
    expect(curriculumModules).toHaveLength(16);

    const numbers = curriculumModules.map((module) => module.number).sort((a, b) => a - b);
    expect(numbers).toEqual(Array.from({ length: 16 }, (_, index) => index + 1));
  });

  it('menggunakan id modul yang unik', () => {
    const ids = curriculumModules.map((module) => module.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('menempatkan setiap modul pada salah satu tahap yang tersedia', () => {
    const groupIds = new Set(curriculumGroups.map((group) => group.id));

    for (const module of curriculumModules) {
      expect(groupIds.has(module.group)).toBe(true);
    }
  });

  it('membagi modul secara merata ke dalam empat tahap', () => {
    for (const group of curriculumGroups) {
      const modules = curriculumModules.filter((module) => module.group === group.id);
      expect(modules).toHaveLength(4);
    }
  });

  it('memastikan setiap modul memiliki judul dan deskripsi', () => {
    for (const module of curriculumModules) {
      expect(module.title.trim().length).toBeGreaterThan(0);
      expect(module.description.trim().length).toBeGreaterThan(0);
    }
  });
});
