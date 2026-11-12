import type { AreaContent } from '../types';

export const areas: readonly AreaContent[] = [
  {
    slug: 'playground',
    eyebrow: 'Laboratorium interaktif',
    title: 'Playground Vektor',
    description:
      'Ruang eksperimen untuk mengubah nilai vektor, mengamati hasil secara geometris, dan membaca perhitungan matematisnya secara langsung.',
    phase: 'Tersedia',
    status: 'Delapan alat interaktif dapat digunakan langsung dengan visualisasi 2D dan 3D.',
    capabilities: [
      {
        title: 'Penjumlahan dan pengurangan',
        description:
          'Dua vektor dapat diubah untuk melihat resultan serta aturan ujung-ke-ujung (head-to-tail).',
      },
      {
        title: 'Perkalian skalar',
        description: 'Nilai skalar positif, negatif, dan nol memperlihatkan perubahan panjang dan arah.',
      },
      {
        title: 'Perkalian titik dan sudut',
        description: 'Nilai perkalian titik, sudut antarvektor, dan indikator ortogonalitas.',
      },
      {
        title: 'Proyeksi vektor',
        description: 'Proyeksi skalar dan vektor ditampilkan bersama rumus yang digunakan.',
      },
      {
        title: 'Perkalian silang',
        description: 'Visualisasi tiga dimensi, aturan tangan kanan, dan hasil yang tegak lurus.',
      },
      {
        title: 'Komponen dan sudut',
        description: 'Penguraian komponen, magnitudo, arah, serta eksplorasi sudut antarvektor.',
      },
    ],
    principles: [
      'Nilai masukan divalidasi dan mendukung bilangan negatif serta desimal.',
      'Operasi yang tidak terdefinisi, seperti normalisasi vektor nol, ditangani secara eksplisit.',
      'Rumus dan hasil numerik ditampilkan bersamaan dengan visualisasi.',
      'Setiap alat menyediakan contoh awal dan tombol atur ulang (reset).',
    ],
  },
];

export function getArea(slug: string): AreaContent | undefined {
  return areas.find((area) => area.slug === slug);
}
