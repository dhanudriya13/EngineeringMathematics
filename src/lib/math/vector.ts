export type Vector = readonly number[];
export type Vector2 = readonly [number, number];
export type Vector3 = readonly [number, number, number];

export const NUMERIC_TOLERANCE = 1e-9;

function assertVector(vector: Vector, name: string): void {
  if (!Array.isArray(vector) || vector.length === 0) {
    throw new Error(`${name} harus berupa vektor dengan minimal satu komponen.`);
  }

  if (!vector.every((component) => Number.isFinite(component))) {
    throw new Error(`${name} hanya boleh berisi bilangan finite.`);
  }
}

function assertSameDimension(a: Vector, b: Vector): void {
  if (a.length !== b.length) {
    throw new Error(
      `Dimensi vektor tidak sama: ${a.length} dan ${b.length}. Operasi memerlukan dimensi yang sama.`,
    );
  }
}

export function vectorAdd(a: Vector, b: Vector): number[] {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  return a.map((component, index) => component + b[index]!);
}

export function vectorSubtract(a: Vector, b: Vector): number[] {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  return a.map((component, index) => component - b[index]!);
}

export function scalarMultiply(vector: Vector, scalar: number): number[] {
  assertVector(vector, 'Vektor');
  if (!Number.isFinite(scalar)) {
    throw new Error('Skalar harus berupa bilangan finite.');
  }

  return vector.map((component) => component * scalar);
}

export function dotProduct(a: Vector, b: Vector): number {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  return a.reduce((result, component, index) => result + component * b[index]!, 0);
}

export function crossProduct(a: Vector, b: Vector): Vector3 {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');

  if (a.length !== 3 || b.length !== 3) {
    throw new Error('Perkalian silang hanya didefinisikan untuk vektor tiga dimensi.');
  }

  return [
    a[1]! * b[2]! - a[2]! * b[1]!,
    a[2]! * b[0]! - a[0]! * b[2]!,
    a[0]! * b[1]! - a[1]! * b[0]!,
  ];
}

export function magnitude(vector: Vector): number {
  assertVector(vector, 'Vektor');

  return Math.sqrt(vector.reduce((result, component) => result + component ** 2, 0));
}

export function normalize(vector: Vector): number[] {
  assertVector(vector, 'Vektor');
  const length = magnitude(vector);

  if (length <= NUMERIC_TOLERANCE) {
    throw new Error('Vektor nol tidak memiliki arah dan tidak dapat dinormalisasi.');
  }

  return vector.map((component) => component / length);
}

export function isZeroVector(vector: Vector, epsilon = NUMERIC_TOLERANCE): boolean {
  assertVector(vector, 'Vektor');

  return magnitude(vector) <= epsilon;
}

export function isOrthogonal(a: Vector, b: Vector, epsilon = NUMERIC_TOLERANCE): boolean {
  return Math.abs(dotProduct(a, b)) <= epsilon;
}

export function angleBetween(a: Vector, b: Vector): number {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  const lengthA = magnitude(a);
  const lengthB = magnitude(b);

  if (lengthA <= NUMERIC_TOLERANCE || lengthB <= NUMERIC_TOLERANCE) {
    throw new Error('Sudut tidak terdefinisi jika salah satu vektor adalah vektor nol.');
  }

  const cosine = clamp(dotProduct(a, b) / (lengthA * lengthB), -1, 1);

  return Math.acos(cosine);
}

export function angleBetweenDegrees(a: Vector, b: Vector): number {
  return (angleBetween(a, b) * 180) / Math.PI;
}

export function scalarProjection(a: Vector, b: Vector): number {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  const lengthB = magnitude(b);

  if (lengthB <= NUMERIC_TOLERANCE) {
    throw new Error('Proyeksi tidak terdefinisi pada vektor nol.');
  }

  return dotProduct(a, b) / lengthB;
}

export function projectVector(a: Vector, b: Vector): number[] {
  assertVector(a, 'Vektor a');
  assertVector(b, 'Vektor b');
  assertSameDimension(a, b);

  const squaredLength = dotProduct(b, b);

  if (squaredLength <= NUMERIC_TOLERANCE) {
    throw new Error('Proyeksi tidak terdefinisi pada vektor nol.');
  }

  const factor = dotProduct(a, b) / squaredLength;

  return b.map((component) => factor * component);
}

export function vectorComponents(vector: Vector): { x: number; y: number; z: number | null } {
  assertVector(vector, 'Vektor');

  if (vector.length < 2) {
    throw new Error('Komponen memerlukan vektor dengan minimal dua dimensi.');
  }

  return {
    x: vector[0]!,
    y: vector[1]!,
    z: vector.length >= 3 ? vector[2]! : null,
  };
}

export function directionAngle2D(vector: Vector): number {
  assertVector(vector, 'Vektor');

  if (vector.length < 2) {
    throw new Error('Arah 2D memerlukan dua komponen.');
  }

  if (isZeroVector(vector)) {
    throw new Error('Vektor nol tidak memiliki arah yang terdefinisi.');
  }

  return Math.atan2(vector[1]!, vector[0]!);
}

export function directionAngle2DDegrees(vector: Vector): number {
  return (directionAngle2D(vector) * 180) / Math.PI;
}

export function linearCombination(
  vectors: readonly Vector[],
  coefficients: readonly number[],
): number[] {
  if (vectors.length === 0) {
    throw new Error('Minimal satu vektor diperlukan.');
  }

  if (vectors.length !== coefficients.length) {
    throw new Error('Jumlah vektor dan koefisien harus sama.');
  }

  const dimension = vectors[0]!.length;
  const result = new Array<number>(dimension).fill(0);

  vectors.forEach((vector, vectorIndex) => {
    assertVector(vector, `Vektor ke-${vectorIndex + 1}`);

    if (vector.length !== dimension) {
      throw new Error('Semua vektor harus memiliki dimensi yang sama.');
    }

    const coefficient = coefficients[vectorIndex]!;

    if (!Number.isFinite(coefficient)) {
      throw new Error(`Koefisien ke-${vectorIndex + 1} harus berupa bilangan finite.`);
    }

    vector.forEach((component, componentIndex) => {
      result[componentIndex]! += component * coefficient;
    });
  });

  return result;
}

export function distance(a: Vector, b: Vector): number {
  return magnitude(vectorSubtract(a, b));
}

export function clamp(value: number, minimum: number, maximum: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(minimum) || !Number.isFinite(maximum)) {
    throw new Error('Nilai clamp harus berupa bilangan finite.');
  }

  if (minimum > maximum) {
    throw new Error('Batas minimum tidak boleh lebih besar daripada maksimum.');
  }

  return Math.min(Math.max(value, minimum), maximum);
}

export function nearlyEqual(a: number, b: number, epsilon = NUMERIC_TOLERANCE): boolean {
  return Math.abs(a - b) <= epsilon;
}

export function roundTo(value: number, decimals = 4): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  const factor = 10 ** decimals;

  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function formatNumber(value: number, decimals = 4): string {
  if (!Number.isFinite(value)) {
    return String(value);
  }

  const rounded = roundTo(value, decimals);
  const normalized = Object.is(rounded, -0) ? 0 : rounded;

  return normalized.toString();
}
