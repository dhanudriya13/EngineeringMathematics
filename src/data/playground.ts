export type PlaygroundToolId =
  | 'addition'
  | 'subtraction'
  | 'scalar'
  | 'components'
  | 'dot'
  | 'angle'
  | 'projection'
  | 'cross';

export type PlaygroundDimension = 2 | 3;

export interface PlaygroundVector {
  x: number;
  y: number;
  z: number;
}

export interface PlaygroundExample {
  label: string;
  dimension: PlaygroundDimension;
  a: PlaygroundVector;
  b: PlaygroundVector;
  scalar: number;
}

export interface PlaygroundTool {
  id: PlaygroundToolId;
  label: string;
  shortLabel: string;
  description: string;
  formula: string;
  supports3D: boolean;
  examples: readonly PlaygroundExample[];
}

const zero = { x: 0, y: 0, z: 0 };

export const playgroundTools: readonly PlaygroundTool[] = [
  {
    id: 'addition',
    label: 'Penjumlahan Vektor',
    shortLabel: 'Penjumlahan',
    description:
      'Susun dua vektor dari titik awal yang sama atau ujung-ke-ujung, lalu amati resultan dan perhitungan komponennya.',
    formula: String.raw`\mathbf{a}+\mathbf{b}=(a_1+b_1,\;a_2+b_2)` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 3, y: 2, z: 0 },
        b: { x: 1, y: 4, z: 0 },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 2, y: 1, z: 2 },
        b: { x: -1, y: 3, z: 1 },
        scalar: 1,
      },
    ],
  },
  {
    id: 'subtraction',
    label: 'Pengurangan Vektor',
    shortLabel: 'Pengurangan',
    description:
      'Bandingkan arah a − b dan b − a. Vektor a − b menghubungkan ujung b ke ujung a ketika keduanya disusun dari titik awal yang sama.',
    formula: String.raw`\mathbf{a}-\mathbf{b}=(a_1-b_1,\;a_2-b_2)` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 4, y: 3, z: 0 },
        b: { x: 1, y: 1, z: 0 },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 3, y: 2, z: 1 },
        b: { x: 1, y: -1, z: 2 },
        scalar: 1,
      },
    ],
  },
  {
    id: 'scalar',
    label: 'Perkalian Skalar',
    shortLabel: 'Perkalian Skalar',
    description:
      'Ubah nilai skalar untuk melihat perubahan panjang dan arah vektor. Skalar negatif membalik arah vektor.',
    formula: String.raw`k\mathbf{v}=(kv_1,\;kv_2,\;kv_3)` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 2, y: 1, z: 0 },
        b: { ...zero },
        scalar: 2,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 1, y: 2, z: 1 },
        b: { ...zero },
        scalar: -1.5,
      },
    ],
  },
  {
    id: 'components',
    label: 'Komponen Vektor',
    shortLabel: 'Komponen',
    description:
      'Uraikan vektor menjadi komponen x, y, dan z. Amati magnitudo dan komponen yang membentuk vektor tersebut.',
    formula: String.raw`\mathbf{v}=(x,y,z),\qquad \lVert\mathbf{v}\rVert=\sqrt{x^2+y^2+z^2}` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 3, y: 4, z: 0 },
        b: { ...zero },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 2, y: -1, z: 2 },
        b: { ...zero },
        scalar: 1,
      },
    ],
  },
  {
    id: 'dot',
    label: 'Perkalian Titik',
    shortLabel: 'Perkalian Titik',
    description:
      'Hitung perkalian titik dan interpretasikan tanda serta nilainya. Hasil nol menunjukkan kedua vektor ortogonal.',
    formula: String.raw`\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 1, y: 2, z: 0 },
        b: { x: 3, y: 4, z: 0 },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 1, y: 2, z: 3 },
        b: { x: 4, y: -5, z: 6 },
        scalar: 1,
      },
    ],
  },
  {
    id: 'angle',
    label: 'Eksplorasi Sudut',
    shortLabel: 'Sudut',
    description:
      'Ubah arah kedua vektor dan amati sudut, kosinus, serta jenis sudut yang terbentuk.',
    formula: String.raw`\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert}` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 1, y: 0, z: 0 },
        b: { x: 1, y: 1, z: 0 },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: 1, z: 1 },
        scalar: 1,
      },
    ],
  },
  {
    id: 'projection',
    label: 'Proyeksi Vektor',
    shortLabel: 'Proyeksi',
    description:
      'Proyeksikan vektor a pada arah b. Bandingkan proyeksi skalar dengan proyeksi vektor.',
    formula: String.raw`\operatorname{proj}_{\mathbf{b}}\mathbf{a}=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{b}\rVert^2}\mathbf{b}` ,
    supports3D: true,
    examples: [
      {
        label: 'Contoh 2D',
        dimension: 2,
        a: { x: 3, y: 4, z: 0 },
        b: { x: 1, y: 0, z: 0 },
        scalar: 1,
      },
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 1, y: 2, z: 1 },
        b: { x: 2, y: 0, z: 1 },
        scalar: 1,
      },
    ],
  },
  {
    id: 'cross',
    label: 'Perkalian Silang',
    shortLabel: 'Perkalian Silang',
    description:
      'Hitung perkalian silang dua vektor tiga dimensi. Hasilnya tegak lurus terhadap kedua vektor dan mengikuti aturan tangan kanan.',
    formula: String.raw`\mathbf{a}\times\mathbf{b}=(a_2b_3-a_3b_2,\;a_3b_1-a_1b_3,\;a_1b_2-a_2b_1)` ,
    supports3D: false,
    examples: [
      {
        label: 'Contoh 3D',
        dimension: 3,
        a: { x: 1, y: 2, z: 3 },
        b: { x: 4, y: 5, z: 6 },
        scalar: 1,
      },
      {
        label: 'Vektor satuan',
        dimension: 3,
        a: { x: 1, y: 0, z: 0 },
        b: { x: 0, y: 1, z: 0 },
        scalar: 1,
      },
    ],
  },
];

export function getPlaygroundTool(id: PlaygroundToolId): PlaygroundTool {
  const tool = playgroundTools.find((item) => item.id === id);

  if (!tool) {
    throw new Error(`Alat playground tidak ditemukan: ${id}`);
  }

  return tool;
}
