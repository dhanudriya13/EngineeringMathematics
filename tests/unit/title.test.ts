import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { formatPageTitle } from '../../src/lib/title';

describe('formatPageTitle', () => {
  it('menggunakan judul situs dan tagline untuk halaman tanpa judul', () => {
    expect(formatPageTitle()).toBe(`${site.name} — ${site.tagline}`);
  });

  it('menambahkan nama situs pada judul halaman', () => {
    expect(formatPageTitle('Kurikulum Vektor')).toBe(`Kurikulum Vektor — ${site.name}`);
  });

  it('tidak menduplikasi nama situs', () => {
    expect(formatPageTitle(site.name)).toBe(`${site.name} — ${site.tagline}`);
  });
});
