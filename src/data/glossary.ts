import type { GlossaryEntry } from '../types';

export const glossary: readonly GlossaryEntry[] = [
  {
    term: 'Vektor',
    english: 'Vector',
    definition:
      'Besaran yang memiliki magnitudo dan arah. Secara aljabar, vektor dinyatakan sebagai daftar komponen terurut.',
    moduleId: 'pengantar-vektor',
    formula: String.raw`\mathbf{v}=(v_1,v_2,\ldots,v_n)`,
  },
  {
    term: 'Skalar',
    english: 'Scalar',
    definition:
      'Besaran yang hanya memiliki magnitudo, tanpa arah. Contohnya suhu, massa, dan waktu.',
    moduleId: 'skalar-dan-vektor',
  },
  {
    term: 'Magnitudo',
    english: 'Magnitude',
    definition:
      'Panjang atau besar sebuah vektor. Magnitudo selalu bernilai tak negatif dan dihitung dari komponen-komponennya.',
    moduleId: 'magnitudo-dan-arah',
    formula: String.raw`\lVert\mathbf{v}\rVert=\sqrt{v_1^2+v_2^2}`,
  },
  {
    term: 'Arah',
    english: 'Direction',
    definition:
      'Orientasi sebuah vektor dalam ruang. Dua vektor dengan komponen berbeda dapat memiliki arah yang sama.',
    moduleId: 'magnitudo-dan-arah',
  },
  {
    term: 'Vektor Satuan',
    english: 'Unit Vector',
    definition:
      'Vektor dengan magnitudo satu. Vektor satuan menunjukkan arah tanpa membawa informasi panjang.',
    moduleId: 'magnitudo-dan-arah',
    formula: String.raw`\hat{\mathbf{v}}=\frac{\mathbf{v}}{\lVert\mathbf{v}\rVert}`,
  },
  {
    term: 'Vektor Nol',
    english: 'Zero Vector',
    definition:
      'Vektor yang seluruh komponennya nol. Vektor nol tidak memiliki arah yang terdefinisi dan tidak dapat dinormalisasi.',
    moduleId: 'representasi-vektor',
    formula: String.raw`\mathbf{0}=(0,0,0)`,
  },
  {
    term: 'Vektor Negatif',
    english: 'Negative Vector',
    definition:
      'Vektor yang memiliki magnitudo sama tetapi arah berlawanan dengan vektor asal.',
    moduleId: 'representasi-vektor',
    formula: String.raw`-\mathbf{v}=(-v_1,-v_2)`,
  },
  {
    term: 'Vektor Posisi',
    english: 'Position Vector',
    definition:
      'Vektor yang menyatakan posisi suatu titik relatif terhadap titik asal koordinat.',
    moduleId: 'komponen-dan-posisi',
    formula: String.raw`\overrightarrow{OP}=(x,y)`,
  },
  {
    term: 'Vektor Perpindahan',
    english: 'Displacement Vector',
    definition:
      'Vektor yang menyatakan perubahan posisi dari satu titik ke titik lain, bukan panjang lintasan yang ditempuh.',
    moduleId: 'komponen-dan-posisi',
    formula: String.raw`\overrightarrow{AB}=(x_B-x_A,\;y_B-y_A)`,
  },
  {
    term: 'Komponen Vektor',
    english: 'Vector Component',
    definition:
      'Nilai proyeksi vektor pada suatu sumbu koordinat. Komponen memungkinkan perhitungan dilakukan per arah.',
    moduleId: 'komponen-dan-posisi',
  },
  {
    term: 'Vektor Kolom',
    english: 'Column Vector',
    definition:
      'Penulisan vektor sebagai matriks satu kolom. Bentuk ini banyak digunakan dalam aljabar linear.',
    moduleId: 'representasi-vektor',
    formula: String.raw`\begin{pmatrix}x\\y\end{pmatrix}`,
  },
  {
    term: 'Penjumlahan Vektor',
    english: 'Vector Addition',
    definition:
      'Operasi menjumlahkan dua vektor dengan menjumlahkan komponen yang bersesuaian.',
    moduleId: 'penjumlahan-pengurangan',
    formula: String.raw`\mathbf{a}+\mathbf{b}=(a_1+b_1,\;a_2+b_2)`,
  },
  {
    term: 'Pengurangan Vektor',
    english: 'Vector Subtraction',
    definition:
      'Operasi mengurangkan satu vektor dari vektor lain. Hasilnya sama dengan menambahkan vektor negatif.',
    moduleId: 'penjumlahan-pengurangan',
    formula: String.raw`\mathbf{a}-\mathbf{b}=\mathbf{a}+(-\mathbf{b})`,
  },
  {
    term: 'Perkalian Skalar',
    english: 'Scalar Multiplication',
    definition:
      'Operasi mengalikan setiap komponen vektor dengan sebuah skalar. Operasi ini dapat mengubah panjang dan arah vektor.',
    moduleId: 'perkalian-skalar',
    formula: String.raw`k\mathbf{v}=(kv_1,kv_2)`,
  },
  {
    term: 'Perkalian Titik',
    english: 'Dot Product',
    definition:
      'Operasi dua vektor yang menghasilkan skalar. Nilainya berkaitan dengan panjang kedua vektor dan kosinus sudut di antaranya.',
    moduleId: 'perkalian-titik',
    formula: String.raw`\mathbf{a}\cdot\mathbf{b}=a_1b_1+a_2b_2`,
  },
  {
    term: 'Perkalian Silang',
    english: 'Cross Product',
    definition:
      'Operasi dua vektor tiga dimensi yang menghasilkan vektor baru tegak lurus terhadap keduanya. Perkalian silang tidak komutatif.',
    moduleId: 'perkalian-silang',
    formula: String.raw`\mathbf{a}\times\mathbf{b}`,
  },
  {
    term: 'Ortogonal',
    english: 'Orthogonal',
    definition:
      'Sifat dua vektor tak nol yang saling tegak lurus. Hasil perkalian titiknya sama dengan nol.',
    moduleId: 'sudut-antarvektor',
    formula: String.raw`\mathbf{a}\cdot\mathbf{b}=0`,
  },
  {
    term: 'Sudut Antarvektor',
    english: 'Angle Between Vectors',
    definition:
      'Sudut terkecil antara dua vektor yang disusun dari titik awal yang sama, dihitung melalui kosinus.',
    moduleId: 'sudut-antarvektor',
    formula: String.raw`\cos\theta=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{a}\rVert\lVert\mathbf{b}\rVert}`,
  },
  {
    term: 'Proyeksi Skalar',
    english: 'Scalar Projection',
    definition:
      'Panjang bayangan satu vektor pada arah vektor lain. Nilainya dapat negatif jika sudutnya tumpul.',
    moduleId: 'proyeksi-vektor',
    formula: String.raw`\operatorname{comp}_{\mathbf{b}}\mathbf{a}=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{b}\rVert}`,
  },
  {
    term: 'Proyeksi Vektor',
    english: 'Vector Projection',
    definition:
      'Vektor pada arah tertentu yang merupakan bayangan tegak lurus dari vektor lain.',
    moduleId: 'proyeksi-vektor',
    formula: String.raw`\operatorname{proj}_{\mathbf{b}}\mathbf{a}=\frac{\mathbf{a}\cdot\mathbf{b}}{\lVert\mathbf{b}\rVert^2}\mathbf{b}`,
  },
  {
    term: 'Kombinasi Linear',
    english: 'Linear Combination',
    definition:
      'Vektor yang dibentuk dengan mengalikan sejumlah vektor dengan skalar lalu menjumlahkan hasilnya.',
    moduleId: 'kombinasi-linear',
    formula: String.raw`c_1\mathbf{v}_1+\cdots+c_n\mathbf{v}_n`,
  },
  {
    term: 'Rentang',
    english: 'Span',
    definition:
      'Himpunan semua kombinasi linear yang dapat dibentuk dari sekumpulan vektor.',
    moduleId: 'kombinasi-linear',
    formula: String.raw`\operatorname{span}\{\mathbf{v}_1,\ldots,\mathbf{v}_n\}`,
  },
  {
    term: 'Bebas Linear',
    english: 'Linear Independence',
    definition:
      'Sifat sekumpulan vektor yang tidak dapat dinyatakan sebagai kombinasi linear nontrivial dari vektor lainnya.',
    moduleId: 'kombinasi-linear',
    formula: String.raw`c_1\mathbf{v}_1+\cdots+c_n\mathbf{v}_n=\mathbf{0}\Rightarrow c_i=0`,
  },
  {
    term: 'Bergantung Linear',
    english: 'Linear Dependence',
    definition:
      'Sifat sekumpulan vektor yang memuat setidaknya satu vektor yang dapat dinyatakan sebagai kombinasi linear vektor lainnya.',
    moduleId: 'kombinasi-linear',
  },
  {
    term: 'Ruang Vektor',
    english: 'Vector Space',
    definition:
      'Himpunan objek yang tertutup terhadap penjumlahan dan perkalian skalar serta memenuhi aksioma-aksioma ruang vektor.',
    moduleId: 'ruang-vektor',
  },
  {
    term: 'Subruang',
    english: 'Subspace',
    definition:
      'Himpunan bagian dari ruang vektor yang juga merupakan ruang vektor dengan operasi yang sama. Subruang harus memuat vektor nol.',
    moduleId: 'ruang-vektor',
  },
  {
    term: 'Basis',
    english: 'Basis',
    definition:
      'Sekumpulan vektor yang bebas linear dan merentang seluruh ruang. Setiap vektor dalam ruang dapat dinyatakan secara unik terhadap basis tersebut.',
    moduleId: 'basis-dan-dimensi',
  },
  {
    term: 'Dimensi',
    english: 'Dimension',
    definition:
      'Jumlah vektor dalam sebuah basis. Dimensi menunjukkan banyaknya arah bebas yang diperlukan untuk merentang ruang.',
    moduleId: 'basis-dan-dimensi',
  },
  {
    term: 'Basis Standar',
    english: 'Standard Basis',
    definition:
      'Basis yang paling umum digunakan pada Rⁿ, terdiri atas vektor satuan pada masing-masing sumbu.',
    moduleId: 'basis-dan-dimensi',
    formula: String.raw`\{\mathbf{e}_1,\mathbf{e}_2,\ldots,\mathbf{e}_n\}`,
  },
  {
    term: 'Koordinat',
    english: 'Coordinates',
    definition:
      'Koefisien yang menyatakan sebuah vektor sebagai kombinasi linear dari vektor-vektor basis.',
    moduleId: 'basis-dan-dimensi',
  },
  {
    term: 'Transformasi Linear',
    english: 'Linear Transformation',
    definition:
      'Fungsi yang mempertahankan operasi penjumlahan vektor dan perkalian skalar. Transformasi linear dapat dinyatakan dengan matriks.',
    moduleId: 'transformasi-vektor',
    formula: String.raw`T(c\mathbf{u}+\mathbf{v})=cT(\mathbf{u})+T(\mathbf{v})`,
  },
  {
    term: 'Matriks Rotasi',
    english: 'Rotation Matrix',
    definition:
      'Matriks yang memutar vektor sebesar sudut tertentu tanpa mengubah panjangnya.',
    moduleId: 'transformasi-vektor',
    formula: String.raw`R(\theta)=\begin{pmatrix}\cos\theta&-\sin\theta\\\sin\theta&\cos\theta\end{pmatrix}`,
  },
  {
    term: 'Translasi',
    english: 'Translation',
    definition:
      'Perpindahan seluruh titik atau objek dengan jarak dan arah yang sama. Translasi bukan transformasi linear pada R² tanpa koordinat homogen.',
    moduleId: 'transformasi-vektor',
  },
  {
    term: 'Vektor Fitur',
    english: 'Feature Vector',
    definition:
      'Vektor yang menyusun nilai-nilai fitur suatu objek data. Vektor fitur menjadi representasi dasar dalam ilmu data dan pembelajaran mesin.',
    moduleId: 'transformasi-vektor',
  },
];
