import { describe, expect, it } from 'vitest';
import {
  angleBetweenDegrees,
  clamp,
  crossProduct,
  directionAngle2DDegrees,
  distance,
  dotProduct,
  formatNumber,
  isOrthogonal,
  isZeroVector,
  linearCombination,
  magnitude,
  nearlyEqual,
  normalize,
  projectVector,
  scalarMultiply,
  scalarProjection,
  vectorAdd,
  vectorComponents,
  vectorSubtract,
} from '../../src/lib/math';

describe('operasi dasar vektor', () => {
  it('menjumlahkan dan mengurangkan vektor per komponen', () => {
    expect(vectorAdd([2, 1], [1, 3])).toEqual([3, 4]);
    expect(vectorSubtract([2, 1], [1, 3])).toEqual([1, -2]);
  });

  it('mengalikan vektor dengan skalar', () => {
    expect(scalarMultiply([2, -1], 3)).toEqual([6, -3]);
    expect(scalarMultiply([4, 2], -0.5)).toEqual([-2, -1]);
  });

  it('menolak vektor dengan dimensi berbeda', () => {
    expect(() => vectorAdd([1, 2], [1, 2, 3])).toThrow(/Dimensi/);
  });

  it('menolak komponen yang bukan bilangan finite', () => {
    expect(() => vectorAdd([1, Number.NaN], [1, 2])).toThrow(/finite/);
  });
});

describe('magnitudo dan normalisasi', () => {
  it('menghitung magnitudo 2D dan 3D', () => {
    expect(magnitude([3, 4])).toBe(5);
    expect(magnitude([1, 2, 2])).toBe(3);
  });

  it('menghasilkan vektor satuan dengan panjang satu', () => {
    const unit = normalize([3, 4]);
    expect(unit).toEqual([0.6, 0.8]);
    expect(magnitude(unit)).toBeCloseTo(1, 12);
  });

  it('menolak normalisasi vektor nol', () => {
    expect(() => normalize([0, 0])).toThrow(/Vektor nol/);
    expect(isZeroVector([0, 0])).toBe(true);
  });
});

describe('perkalian titik dan sudut', () => {
  it('menghitung perkalian titik 2D dan 3D', () => {
    expect(dotProduct([1, 2], [3, 4])).toBe(11);
    expect(dotProduct([1, 2, 3], [4, -5, 6])).toBe(12);
  });

  it('mendeteksi ortogonalitas', () => {
    expect(isOrthogonal([2, -3], [3, 2])).toBe(true);
    expect(isOrthogonal([1, 0], [1, 1])).toBe(false);
  });

  it('menghitung sudut 0, 90, dan 180 derajat', () => {
    expect(angleBetweenDegrees([1, 0], [2, 0])).toBeCloseTo(0, 10);
    expect(angleBetweenDegrees([1, 0], [0, 1])).toBeCloseTo(90, 10);
    expect(angleBetweenDegrees([1, 0], [-1, 0])).toBeCloseTo(180, 10);
  });

  it('tidak menghasilkan NaN karena pembulatan floating-point', () => {
    const angle = angleBetweenDegrees([0.1, 0.2], [0.1, 0.2]);
    expect(Number.isNaN(angle)).toBe(false);
    expect(angle).toBeCloseTo(0, 10);
  });

  it('menolak sudut yang melibatkan vektor nol', () => {
    expect(() => angleBetweenDegrees([0, 0], [1, 0])).toThrow(/vektor nol/);
  });
});

describe('perkalian silang', () => {
  it('menghitung hasil dan memeriksa ortogonalitas', () => {
    const result = crossProduct([1, 2, 3], [4, 5, 6]);
    expect(result).toEqual([-3, 6, -3]);
    expect(dotProduct(result, [1, 2, 3])).toBe(0);
    expect(dotProduct(result, [4, 5, 6])).toBe(0);
  });

  it('menerapkan sifat anti-komutatif', () => {
    const a = [1, 0, 0];
    const b = [0, 1, 0];
    expect(crossProduct(a, b)).toEqual([0, 0, 1]);
    expect(crossProduct(b, a)).toEqual([0, 0, -1]);
  });

  it('menolak vektor selain 3D', () => {
    expect(() => crossProduct([1, 2], [3, 4])).toThrow(/tiga dimensi/);
  });
});

describe('proyeksi', () => {
  it('menghitung proyeksi skalar dan vektor', () => {
    expect(scalarProjection([3, 4], [1, 0])).toBe(3);
    expect(projectVector([3, 4], [1, 0])).toEqual([3, 0]);
    expect(projectVector([1, 2], [3, 1])).toEqual([1.5, 0.5]);
  });

  it('menolak proyeksi pada vektor nol', () => {
    expect(() => scalarProjection([1, 2], [0, 0])).toThrow(/vektor nol/);
    expect(() => projectVector([1, 2], [0, 0])).toThrow(/vektor nol/);
  });
});

describe('komponen, kombinasi, dan utilitas', () => {
  it('mengambil komponen vektor 2D dan 3D', () => {
    expect(vectorComponents([3, 4])).toEqual({ x: 3, y: 4, z: null });
    expect(vectorComponents([1, 2, 5])).toEqual({ x: 1, y: 2, z: 5 });
  });

  it('menghitung arah 2D dengan kuadran yang benar', () => {
    expect(directionAngle2DDegrees([1, 0])).toBeCloseTo(0, 10);
    expect(directionAngle2DDegrees([-1, 1])).toBeCloseTo(135, 10);
    expect(directionAngle2DDegrees([0, -1])).toBeCloseTo(-90, 10);
  });

  it('membentuk kombinasi linear', () => {
    expect(
      linearCombination(
        [
          [1, 1],
          [1, -1],
        ],
        [2, 1],
      ),
    ).toEqual([3, 1]);
  });

  it('menolak kombinasi linear dengan jumlah koefisien yang salah', () => {
    expect(() => linearCombination([[1, 2]], [1, 2])).toThrow(/Jumlah vektor/);
  });

  it('menghitung jarak, clamp, dan perbandingan hampir sama', () => {
    expect(distance([0, 0], [3, 4])).toBe(5);
    expect(clamp(1.5, 0, 1)).toBe(1);
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(nearlyEqual(0.1 + 0.2, 0.3)).toBe(true);
    expect(nearlyEqual(0.3, 0.31)).toBe(false);
  });

  it('memformat angka tanpa nol berlebih', () => {
    expect(formatNumber(1.5)).toBe('1.5');
    expect(formatNumber(1.234567)).toBe('1.2346');
    expect(formatNumber(-0)).toBe('0');
  });
});
