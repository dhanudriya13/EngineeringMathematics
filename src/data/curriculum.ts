import type { CurriculumGroup, CurriculumModule } from '../types';

export const curriculumGroups: readonly CurriculumGroup[] = [
  {
    id: 'fondasi',
    title: 'Fondasi',
    description: 'Membangun intuisi, notasi, dan ukuran dasar vektor.',
  },
  {
    id: 'operasi',
    title: 'Operasi',
    description: 'Menghitung dan memvisualisasikan operasi dasar vektor.',
  },
  {
    id: 'analisis',
    title: 'Analisis',
    description: 'Mengukur hubungan antarvektor melalui sudut, proyeksi, dan perkalian.',
  },
  {
    id: 'aplikasi',
    title: 'Abstraksi & Aplikasi',
    description: 'Memperluas vektor ke ruang abstrak dan penerapan komputasi.',
  },
];

export const curriculumModules: readonly CurriculumModule[] = [
  {
    number: 1,
    id: 'pengantar-vektor',
    title: 'Pengantar Vektor',
    description: 'Mengapa vektor penting, dari besaran fisik hingga representasi data.',
    group: 'fondasi',
  },
  {
    number: 2,
    id: 'skalar-dan-vektor',
    title: 'Besaran Skalar dan Vektor',
    description: 'Membedakan besaran skalar dan vektor serta memahami peran arah.',
    group: 'fondasi',
  },
  {
    number: 3,
    id: 'representasi-vektor',
    title: 'Representasi dan Notasi Vektor',
    description: 'Membaca dan menulis vektor dalam bentuk geometris maupun aljabar.',
    group: 'fondasi',
  },
  {
    number: 4,
    id: 'magnitudo-dan-arah',
    title: 'Magnitudo dan Arah',
    description: 'Menghitung panjang vektor, arah, dan vektor satuan.',
    group: 'fondasi',
  },
  {
    number: 5,
    id: 'penjumlahan-pengurangan',
    title: 'Penjumlahan dan Pengurangan Vektor',
    description: 'Menjumlahkan dan mengurangkan vektor secara geometris dan komponen.',
    group: 'operasi',
  },
  {
    number: 6,
    id: 'perkalian-skalar',
    title: 'Perkalian Skalar',
    description: 'Memahami bagaimana skalar mengubah panjang dan arah vektor.',
    group: 'operasi',
  },
  {
    number: 7,
    id: 'komponen-dan-posisi',
    title: 'Komponen Vektor dan Vektor Posisi',
    description: 'Menguraikan vektor menjadi komponen dan menyatakan posisi.',
    group: 'operasi',
  },
  {
    number: 8,
    id: 'koordinat-2d-3d',
    title: 'Sistem Koordinat 2D dan 3D',
    description: 'Menempatkan vektor dalam bidang dua dan tiga dimensi.',
    group: 'operasi',
  },
  {
    number: 9,
    id: 'perkalian-titik',
    title: 'Perkalian Titik (Dot Product)',
    description: 'Menghitung perkalian titik dan makna geometrisnya.',
    group: 'analisis',
  },
  {
    number: 10,
    id: 'sudut-antarvektor',
    title: 'Sudut Antara Dua Vektor',
    description: 'Menentukan sudut antarvektor dan mengenali ortogonalitas.',
    group: 'analisis',
  },
  {
    number: 11,
    id: 'proyeksi-vektor',
    title: 'Proyeksi Vektor',
    description: 'Menguraikan satu vektor terhadap arah vektor lain.',
    group: 'analisis',
  },
  {
    number: 12,
    id: 'perkalian-silang',
    title: 'Perkalian Silang (Cross Product)',
    description: 'Menghitung perkalian silang dan menafsirkannya secara spasial.',
    group: 'analisis',
  },
  {
    number: 13,
    id: 'kombinasi-linear',
    title: 'Kombinasi Linear',
    description: 'Menyusun vektor baru dari kombinasi vektor lain dan koefisiennya.',
    group: 'aplikasi',
  },
  {
    number: 14,
    id: 'ruang-vektor',
    title: 'Ruang Vektor',
    description: 'Mengenal struktur abstrak ruang vektor dan sifat-sifatnya.',
    group: 'aplikasi',
  },
  {
    number: 15,
    id: 'basis-dan-dimensi',
    title: 'Basis dan Dimensi',
    description: 'Memahami basis, dimensi, dan koordinat dalam ruang vektor.',
    group: 'aplikasi',
  },
  {
    number: 16,
    id: 'transformasi-vektor',
    title: 'Transformasi Vektor dan Penerapannya',
    description: 'Menghubungkan transformasi vektor dengan grafika, gim, dan ilmu data.',
    group: 'aplikasi',
  },
];

export const applications = [
  {
    title: 'Grafika komputer',
    description: 'Posisi, arah, dan transformasi objek yang ditampilkan di layar.',
  },
  {
    title: 'Pengembangan gim',
    description: 'Kecepatan, gerak, dan arah tumbukan antarentitas dalam simulasi.',
  },
  {
    title: 'Antarmuka pengguna',
    description: 'Koordinat, perpindahan, dan penskalaan elemen pada tata letak.',
  },
  {
    title: 'Ilmu data',
    description: 'Vektor fitur dan ukuran kemiripan antarobservasi.',
  },
  {
    title: 'Pembelajaran mesin',
    description: 'Representasi data dalam ruang berdimensi tinggi.',
  },
  {
    title: 'Teknik',
    description: 'Gaya, proyeksi, dan geometri spasial dalam analisis struktur.',
  },
] as const;
