import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { curriculumModules } from '../../src/data/curriculum';

const modulesDir = join(process.cwd(), 'src/content/modules');
const moduleFiles = readdirSync(modulesDir).filter(
  (file) => file.endsWith('.mdx') && file !== '_template.mdx',
);
const moduleSlugs = moduleFiles.map((file) => file.replace(/\.mdx$/, ''));

describe('berkas modul pembelajaran', () => {
  it('menyediakan satu berkas MDX untuk setiap modul kurikulum', () => {
    expect(moduleFiles).toHaveLength(16);
    expect([...moduleSlugs].sort()).toEqual(
      curriculumModules.map((module) => module.id).sort(),
    );
  });

  it('menyesuaikan nomor urut frontmatter dengan data kurikulum', () => {
    for (const module of curriculumModules) {
      const content = readFileSync(join(modulesDir, `${module.id}.mdx`), 'utf8');
      const match = content.match(/^order:\s*(\d+)/m);
      expect(Number(match?.[1])).toBe(module.number);
    }
  });

  it('menandai semua modul sebagai terbit, bukan draft', () => {
    for (const file of moduleFiles) {
      const content = readFileSync(join(modulesDir, file), 'utf8');
      expect(content).toMatch(/^---[\s\S]*draft:\s*false[\s\S]*?---/);
    }
  });

  it('memuat judul dan tujuan pembelajaran pada frontmatter', () => {
    for (const file of moduleFiles) {
      const content = readFileSync(join(modulesDir, file), 'utf8');
      expect(content).toMatch(/^---[\s\S]*title:\s*'/);
      expect(content).toMatch(/^---[\s\S]*objectives:\s*\n\s+-/);
    }
  });

  it('menyertakan bagian ringkasan dan referensi rumus', () => {
    for (const file of moduleFiles) {
      const content = readFileSync(join(modulesDir, file), 'utf8');
      expect(content).toContain('## Ringkasan');
      expect(content).toContain('## Referensi Rumus');
    }
  });
});
