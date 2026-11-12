import { describe, expect, it } from 'vitest';
import { isActivePath, normalizePath } from '../../src/lib/navigation';

describe('normalizePath', () => {
  it('mengembalikan root untuk string kosong', () => {
    expect(normalizePath('')).toBe('/');
  });

  it('menghapus query, hash, dan garis miring di akhir', () => {
    expect(normalizePath('/materi/?topik=vektor#rumus')).toBe('/materi');
  });

  it('mempertahankan root sebagai garis miring tunggal', () => {
    expect(normalizePath('/')).toBe('/');
  });
});

describe('isActivePath', () => {
  it('menandai beranda hanya pada halaman beranda', () => {
    expect(isActivePath('/', '/')).toBe(true);
    expect(isActivePath('/materi', '/')).toBe(false);
  });

  it('menandai halaman yang sama', () => {
    expect(isActivePath('/playground', '/playground')).toBe(true);
    expect(isActivePath('/playground/', '/playground')).toBe(true);
  });

  it('menandai subhalaman dari bagian yang sama', () => {
    expect(isActivePath('/materi/pengantar-vektor', '/materi')).toBe(true);
    expect(isActivePath('/playground/penjumlahan', '/playground')).toBe(true);
  });

  it('tidak menandai bagian lain yang memiliki awalan sama', () => {
    expect(isActivePath('/materi-lain', '/materi')).toBe(false);
    expect(isActivePath('/kuis-vektor', '/kuis')).toBe(false);
  });
});
