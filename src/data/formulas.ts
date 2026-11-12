import type { FormulaEntry } from '../types';

export const formulas: readonly FormulaEntry[] = [
  {
    id: 'magnitude-2d',
    name: 'Magnitudo Vektor 2D',
    topic: 'Fondasi',
    moduleId: 'magnitudo-dan-arah',
    expression: String.raw`\lVert \mathbf{v} \rVert = \sqrt{x^2 + y^2}`,
    explanation:
      'Panjang vektor dua dimensi dihitung dengan teorema Pythagoras dari komponen x dan y.',
    variables: [
      { symbol: String.raw`\mathbf{v}`, meaning: 'Vektor dua dimensi.' },
      { symbol: String.raw`x`, meaning: 'Komponen vektor pada sumbu x.' },
      { symbol: String.raw`y`, meaning: 'Komponen vektor pada sumbu y.' },
    ],
    example: 'Untuk v = (3, 4), magnitudonya adalah √(9 + 16) = 5.',
  },
  {
    id: 'magnitude-3d',
    name: 'Magnitudo Vektor 3D',
    topic: 'Fondasi',
    moduleId: 'magnitudo-dan-arah',
    expression: String.raw`\lVert \mathbf{v} \rVert = \sqrt{x^2 + y^2 + z^2}`,
    explanation:
      'Magnitudo vektor tiga dimensi menjumlahkan kuadrat ketiga komponennya sebelum diakarkan.',
    variables: [
      { symbol: String.raw`x,\; y,\; z`, meaning: 'Komponen vektor pada sumbu x, y, dan z.' },
    ],
    example: 'Untuk v = (1, 2, 2), magnitudonya adalah √(1 + 4 + 4) = 3.',
  },
  {
    id: 'unit-vector',
    name: 'Vektor Satuan',
    topic: 'Fondasi',
    moduleId: 'magnitudo-dan-arah',
    expression: String.raw`\hat{\mathbf{v}} = \frac{\mathbf{v}}{\lVert \mathbf{v} \rVert}`,
    explanation:
      'Vektor satuan memiliki panjang satu dan arah yang sama dengan vektor asal. Operasi ini tidak terdefinisi untuk vektor nol.',
    variables: [
      { symbol: String.raw`\mathbf{v}`, meaning: 'Vektor yang akan dinormalisasi.' },
      { symbol: String.raw`\hat{\mathbf{v}}`, meaning: 'Vektor satuan hasil normalisasi.' },
      { symbol: String.raw`\lVert \mathbf{v} \rVert`, meaning: 'Magnitudo vektor v.' },
    ],
    example: 'Untuk v = (3, 4), vektor satuannya adalah (3/5, 4/5).',
  },
  {
    id: 'components-polar',
    name: 'Komponen dari Panjang dan Sudut',
    topic: 'Fondasi',
    moduleId: 'komponen-dan-posisi',
    expression: String.raw`x = r\cos\theta, \qquad y = r\sin\theta`,
    explanation:
      'Jika panjang vektor r dan sudut terhadap sumbu x positif diketahui, komponennya diperoleh dengan kosinus dan sinus.',
    variables: [
      { symbol: String.raw`r`, meaning: 'Panjang atau magnitudo vektor.' },
      { symbol: String.raw`\theta`, meaning: 'Sudut terhadap sumbu x positif.' },
    ],
    example: 'Vektor dengan r = 10 dan θ = 30° memiliki komponen (5√3, 5).',
  },
  {
    id: 'position-vector',
    name: 'Vektor Posisi dan Perpindahan',
    topic: 'Fondasi',
    moduleId: 'komponen-dan-posisi',
    expression: String.raw`\overrightarrow{AB} = (x_B - x_A,\; y_B - y_A)`,
    explanation:
      'Vektor dari titik A ke titik B diperoleh dengan mengurangkan koordinat titik awal dari koordinat titik ujung.',
    variables: [
      { symbol: String.raw`(x_A, y_A)`, meaning: 'Koordinat titik awal A.' },
      { symbol: String.raw`(x_B, y_B)`, meaning: 'Koordinat titik ujung B.' },
    ],
    example: 'Dari A(1, 2) ke B(4, 6), vektor AB = (3, 4).',
  },
  {
    id: 'distance-between-points',
    name: 'Jarak Dua Titik',
    topic: 'Fondasi',
    moduleId: 'koordinat-2d-3d',
    expression: String.raw`d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2 + (z_2-z_1)^2}`,
    explanation:
      'Jarak dua titik adalah magnitudo vektor yang menghubungkan kedua titik tersebut.',
    variables: [
      { symbol: String.raw`(x_1,y_1,z_1)`, meaning: 'Koordinat titik pertama.' },
      { symbol: String.raw`(x_2,y_2,z_2)`, meaning: 'Koordinat titik kedua.' },
    ],
    example: 'Jarak (0, 0, 0) ke (1, 2, 2) adalah √(1 + 4 + 4) = 3.',
  },
  {
    id: 'vector-addition',
    name: 'Penjumlahan Vektor',
    topic: 'Operasi Dasar',
    moduleId: 'penjumlahan-pengurangan',
    expression: String.raw`\mathbf{a}+\mathbf{b}=(a_1+b_1,\; a_2+b_2,\; a_3+b_3)`,
    explanation:
      'Penjumlahan dilakukan per komponen. Secara geometris, hasilnya adalah vektor resultan dari susunan ujung-ke-ujung atau diagonal jajargenjang.',
    variables: [
      { symbol: String.raw`\mathbf{a},\mathbf{b}`, meaning: 'Dua vektor yang dijumlahkan.' },
    ],
    example: '(2, 1) + (1, 3) = (3, 4).',
  },
  {
    id: 'vector-subtraction',
    name: 'Pengurangan Vektor',
    topic: 'Operasi Dasar',
    moduleId: 'penjumlahan-pengurangan',
    expression: String.raw`\mathbf{a}-\mathbf{b}=(a_1-b_1,\; a_2-b_2,\; a_3-b_3)`,
    explanation:
      'Pengurangan vektor sama dengan menambahkan vektor negatif: a − b = a + (−b). Arah hasilnya berbeda dari b − a.',
    variables: [
      { symbol: String.raw`\mathbf{a},\mathbf{b}`, meaning: 'Vektor yang dikurangkan.' },
    ],
    example: '(2, 1) − (1, 3) = (1, −2).',
  },
  {
    id: 'scalar-multiplication',
    name: 'Perkalian Skalar',
    topic: 'Operasi Dasar',
    moduleId: 'perkalian-skalar',
    expression: String.raw`k\mathbf{v}=(kv_1,\; kv_2,\; kv_3)`,
    explanation:
      'Setiap komponen dikalikan dengan skalar k. Panjang vektor berubah menjadi |k| kali panjang semula; arah berbalik jika k negatif.',
    variables: [
      { symbol: String.raw`k`, meaning: 'Skalar pengali.' },
      { symbol: String.raw`\mathbf{v}`, meaning: 'Vektor yang dikalikan.' },
    ],
    example: '3(2, −1) = (6, −3).',
  },
  {
    id: 'dot-algebraic',
    name: 'Perkalian Titik dari Komponen',
    topic: 'Analisis Vektor',
    moduleId: 'perkalian-titik',
    expression: String.raw`\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2+a_3b_3`,
    explanation:
      'Perkalian titik menjumlahkan hasil kali komponen yang bersesuaian. Hasilnya adalah skalar, bukan vektor.',
    variables: [
      { symbol: String.raw`a_i,\; b_i`, meaning: 'Komponen ke-i dari masing-masing vektor.' },
    ],
    example: '(1, 2, 3) · (4, −5, 6) = 4 − 10 + 18 = 12.',
  },
  {
    id: 'dot-geometric',
    name: 'Perkalian Titik Secara Geometris',
    topic: 'Analisis Vektor',
    moduleId: 'perkalian-titik',
    expression: String.raw`\mathbf{a}\cdot\mathbf{b}=\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert\cos\theta`,
    explanation:
      'Bentuk geometris menghubungkan perkalian titik dengan panjang kedua vektor dan kosinus sudut di antaranya.',
    variables: [
      { symbol: String.raw`\theta`, meaning: 'Sudut antara vektor a dan b.' },
    ],
    example: 'Jika kedua vektor tegak lurus, cos 90° = 0 sehingga hasilnya nol.',
  },
  {
    id: 'angle-between',
    name: 'Sudut Antara Dua Vektor',
    topic: 'Analisis Vektor',
    moduleId: 'sudut-antarvektor',
    expression: String.raw`\theta=\arccos\left(\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert}\right)`,
    explanation:
      'Sudut diperoleh dari invers kosinus hasil bagi perkalian titik dengan hasil kali magnitudo. Nilai di dalam arccos harus berada pada rentang −1 sampai 1.',
    variables: [
      { symbol: String.raw`\theta`, meaning: 'Sudut antara kedua vektor dalam radian atau derajat.' },
    ],
    example: 'Untuk a = (1, 0) dan b = (1, 1), cos θ = 1/√2 sehingga θ = 45°.',
  },
  {
    id: 'orthogonal-condition',
    name: 'Syarat Ortogonal',
    topic: 'Analisis Vektor',
    moduleId: 'sudut-antarvektor',
    expression: String.raw`\mathbf{a}\perp\mathbf{b}\iff\mathbf{a}\cdot\mathbf{b}=0`,
    explanation:
      'Dua vektor tak nol saling tegak lurus jika dan hanya jika perkalian titiknya nol.',
    variables: [
      { symbol: String.raw`\perp`, meaning: 'Simbol untuk menyatakan tegak lurus.' },
    ],
    example: '(1, 2) · (2, −1) = 2 − 2 = 0, jadi kedua vektor ortogonal.',
  },
  {
    id: 'scalar-projection',
    name: 'Proyeksi Skalar',
    topic: 'Analisis Vektor',
    moduleId: 'proyeksi-vektor',
    expression: String.raw`\operatorname{comp}_{\mathbf{b}}\mathbf{a}=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{b}\rVert}`,
    explanation:
      'Proyeksi skalar menyatakan panjang bayangan vektor a pada arah b. Nilainya dapat negatif jika sudutnya tumpul.',
    variables: [
      { symbol: String.raw`\operatorname{comp}_{\mathbf{b}}\mathbf{a}`, meaning: 'Panjang proyeksi a pada arah b.' },
    ],
    example: 'a = (3, 4) dan b = (1, 0) menghasilkan proyeksi skalar 3.',
  },
  {
    id: 'vector-projection',
    name: 'Proyeksi Vektor',
    topic: 'Analisis Vektor',
    moduleId: 'proyeksi-vektor',
    expression: String.raw`\operatorname{proj}_{\mathbf{b}}\mathbf{a}=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{b}\rVert^2}\,\mathbf{b}`,
    explanation:
      'Proyeksi vektor adalah vektor pada arah b yang panjangnya sama dengan proyeksi skalar.',
    variables: [
      { symbol: String.raw`\operatorname{proj}_{\mathbf{b}}\mathbf{a}`, meaning: 'Vektor proyeksi a pada b.' },
      { symbol: String.raw`\lVert\mathbf{b}\rVert^2`, meaning: 'Kuadrat magnitudo vektor b.' },
    ],
    example: 'a = (3, 4) dan b = (1, 0) menghasilkan proyeksi vektor (3, 0).',
  },
  {
    id: 'cross-product',
    name: 'Perkalian Silang',
    topic: 'Analisis Vektor',
    moduleId: 'perkalian-silang',
    expression: String.raw`\mathbf{a}\times\mathbf{b}=(a_2b_3-a_3b_2,\;a_3b_1-a_1b_3,\;a_1b_2-a_2b_1)`,
    explanation:
      'Perkalian silang dua vektor tiga dimensi menghasilkan vektor baru yang tegak lurus terhadap keduanya.',
    variables: [
      { symbol: String.raw`\mathbf{a},\mathbf{b}`, meaning: 'Vektor tiga dimensi yang dikalikan.' },
    ],
    example: '(1, 2, 3) × (4, 5, 6) = (−3, 6, −3).',
  },
  {
    id: 'cross-magnitude',
    name: 'Magnitudo Perkalian Silang',
    topic: 'Analisis Vektor',
    moduleId: 'perkalian-silang',
    expression: String.raw`\lVert\mathbf{a}\times\mathbf{b}\rVert=\lVert\mathbf{a}\rVert\,\lVert\mathbf{b}\rVert\sin\theta`,
    explanation:
      'Panjang hasil perkalian silang sama dengan luas jajargenjang yang dibentuk kedua vektor.',
    variables: [
      { symbol: String.raw`\theta`, meaning: 'Sudut antara vektor a dan b.' },
    ],
    example: 'Jika kedua vektor sejajar, sin θ = 0 sehingga hasil silangnya vektor nol.',
  },
  {
    id: 'linear-combination',
    name: 'Kombinasi Linear',
    topic: 'Ruang Vektor',
    moduleId: 'kombinasi-linear',
    expression: String.raw`\mathbf{w}=c_1\mathbf{v}_1+c_2\mathbf{v}_2+\cdots+c_n\mathbf{v}_n`,
    explanation:
      'Kombinasi linear dibentuk dengan mengalikan setiap vektor dengan koefisien skalar, lalu menjumlahkan hasilnya.',
    variables: [
      { symbol: String.raw`c_i`, meaning: 'Koefisien skalar untuk vektor ke-i.' },
      { symbol: String.raw`\mathbf{v}_i`, meaning: 'Vektor pembentuk kombinasi.' },
    ],
    example: '(3, 4) = 3(1, 0) + 4(0, 1).',
  },
  {
    id: 'basis-representation',
    name: 'Representasi terhadap Basis',
    topic: 'Ruang Vektor',
    moduleId: 'basis-dan-dimensi',
    expression: String.raw`\mathbf{v}=c_1\mathbf{b}_1+c_2\mathbf{b}_2+\cdots+c_n\mathbf{b}_n`,
    explanation:
      'Setiap vektor dalam ruang berdimensi n dapat dinyatakan secara unik sebagai kombinasi linear dari vektor basis.',
    variables: [
      { symbol: String.raw`\mathbf{b}_i`, meaning: 'Vektor basis yang saling bebas linear dan merentang ruang.' },
      { symbol: String.raw`c_i`, meaning: 'Koordinat vektor terhadap basis tersebut.' },
    ],
    example: 'Dalam basis standar R², (3, 4) memiliki koordinat (3, 4).',
  },
  {
    id: 'rotation-2d',
    name: 'Matriks Rotasi 2D',
    topic: 'Transformasi',
    moduleId: 'transformasi-vektor',
    expression: String.raw`R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}`,
    explanation:
      'Matriks rotasi memutar vektor sebesar θ berlawanan arah jarum jam tanpa mengubah panjangnya.',
    variables: [
      { symbol: String.raw`\theta`, meaning: 'Sudut rotasi.' },
    ],
    example: 'Rotasi (1, 0) sebesar 90° menghasilkan (0, 1).',
  },
  {
    id: 'scaling-2d',
    name: 'Matriks Penskalaan 2D',
    topic: 'Transformasi',
    moduleId: 'transformasi-vektor',
    expression: String.raw`S(s_x,s_y)=\begin{pmatrix}s_x&0\\0&s_y\end{pmatrix}`,
    explanation:
      'Matriks penskalaan mengalikan komponen x dan y dengan faktor yang dapat berbeda.',
    variables: [
      { symbol: String.raw`s_x,\;s_y`, meaning: 'Faktor skala pada sumbu x dan y.' },
    ],
    example: 'Penskalaan (2, 3) dengan faktor 2 menghasilkan (4, 6).',
  },
  {
    id: 'translation-homogeneous',
    name: 'Translasi dengan Koordinat Homogen',
    topic: 'Transformasi',
    moduleId: 'transformasi-vektor',
    expression: String.raw`\begin{pmatrix}x'\\y'\\1\end{pmatrix}=\begin{pmatrix}1&0&t_x\\0&1&t_y\\0&0&1\end{pmatrix}\begin{pmatrix}x\\y\\1\end{pmatrix}`,
    explanation:
      'Translasi bukan transformasi linear biasa pada R². Koordinat homogen memungkinkan translasi ditulis sebagai perkalian matriks.',
    variables: [
      { symbol: String.raw`t_x,\;t_y`, meaning: 'Perpindahan pada sumbu x dan y.' },
    ],
    example: 'Translasi (2, 1) memindahkan titik (3, 4) ke (5, 5).',
  },
];

export const formulaTopics = [...new Set(formulas.map((formula) => formula.topic))];
