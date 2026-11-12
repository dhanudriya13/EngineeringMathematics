# Vector Lab

Platform belajar Matematika Teknik interaktif untuk mahasiswa Sistem Informasi. Vector Lab menghubungkan konsep vektor, notasi matematika, visualisasi geometris, dan penerapan komputasi dalam satu alur belajar.

> **Status proyek:** Fase 1–7 selesai. Seluruh fitur inti tersedia: 16 modul, referensi rumus, glosarium, mesin matematika, playground 2D/3D, latihan adaptif, kuis, progres lokal, pengujian, dan konfigurasi deployment statis. Lihat [PRD.md](./PRD.md) sebagai sumber acuan produk.

## Ringkasan

- **Statis sejak awal.** Seluruh halaman dirender sebagai situs statis tanpa server aplikasi.
- **Tanpa akun dan tanpa backend.** Tidak ada autentikasi, basis data, atau pengiriman data pengguna.
- **Bahasa Indonesia.** Seluruh antarmuka dan konten ditulis dalam Bahasa Indonesia, dengan padanan istilah Inggris bila diperlukan.
- **Desktop-first.** Tata letak dioptimalkan untuk layar lebar dan tetap dapat digunakan pada layar sempit.
- **React hanya untuk interaksi.** React dimuat sebagai island hanya pada halaman yang membutuhkan interaksi; halaman materi dan referensi tetap statis.
- **Progres lokal.** Modul selesai, latihan, dan skor kuis disimpan di Local Storage tanpa akun.
- **Visualisasi bertahap.** Playground memakai SVG untuk 2D dan memuat Three.js secara lazy hanya ketika visualisasi 3D dipilih.
- **Kebenaran matematika diutamakan.** KaTeX digunakan untuk menampilkan notasi matematika secara konsisten.

## Fitur yang Tersedia

- Proyek Astro dengan TypeScript strict mode dan output statis.
- Integrasi React untuk menu seluler, playground, latihan, kuis, progres, dan penanda modul selesai.
- Integrasi MDX dan content collection `modules`.
- Rendering matematika dengan KaTeX melalui `remark-math`, `rehype-katex`, dan komponen `Formula`.
- Sistem desain **Academic Modern** berbasis token CSS semantik.
- Navigasi utama, header, footer, breadcrumb, dan tata letak aplikasi.
- Halaman beranda lengkap dengan kurikulum, alur belajar, pratinjau playground, dan contoh penerapan.
- Halaman ringkasan kurikulum 16 modul dalam empat tahap.
- **16 modul pembelajaran lengkap** dengan tujuan, prasyarat, definisi, notasi, penjelasan rumus, diagram SVG, contoh bertahap, penerapan komputasi, kesalahan umum, latihan mandiri, ringkasan, dan referensi rumus.
- Halaman modul dinamis dengan sidebar kurikulum, daftar isi, metadata, prasyarat, serta navigasi modul sebelumnya dan berikutnya.
- **Referensi rumus** dengan 22 entri, penjelasan simbol, contoh, dan pencarian/filter topik berbasis klien.
- **Glosarium** dengan 34 istilah dua bahasa, definisi, rumus terkait, tautan modul, dan pencarian berbasis klien.
- Diagram vektor SVG untuk penjumlahan, magnitudo, komponen, koordinat 3D, perkalian titik, proyeksi, perkalian silang, rentang, dan transformasi.
- **Mesin matematika murni** di `src/lib/math` untuk penjumlahan, pengurangan, perkalian skalar, magnitudo, normalisasi, perkalian titik, perkalian silang, sudut, proyeksi, komponen, kombinasi linear, jarak, dan toleransi floating-point.
- **Validasi masukan numerik** yang mendukung bilangan negatif, desimal, notasi ilmiah, dan pesan kesalahan yang jelas.
- **Playground 8 alat:** penjumlahan, pengurangan, perkalian skalar, komponen, perkalian titik, eksplorasi sudut, proyeksi, dan perkalian silang.
- **Visualisasi 2D SVG** dengan ujung panah yang dapat ditarik, serta **visualisasi 3D Three.js** yang dimuat secara lazy.
- **Latihan adaptif deterministik** dengan tiga tingkat kesulitan, umpan balik, penjelasan, petunjuk, dan percobaan ulang.
- **Kuis per topik** dengan lima soal, kunci jawaban setelah submit, skor, pengulangan, dan indikator selesai.
- **Progres lokal** untuk modul selesai, latihan, kuis, skor terbaik, modul terakhir, dan reset dengan konfirmasi.
- **82 pengujian unit** (Vitest) dan **16 pengujian E2E** (Playwright) termasuk audit aksesibilitas dengan axe.
- Halaman Tentang berbasis MDX dengan contoh rendering rumus dan halaman 404 dalam Bahasa Indonesia.
- Konfigurasi ESLint, pemeriksaan tipe Astro, build produksi statis, serta konfigurasi Netlify dan Cloudflare Pages.

## Teknologi

| Lapisan | Teknologi |
|---|---|
| Framework | Astro 7 |
| Bahasa | TypeScript 5 |
| Komponen interaktif | React 19 |
| Konten | MDX + Astro Content Collections |
| Matematika | KaTeX |
| Visualisasi 2D | SVG |
| Visualisasi 3D | Three.js + React Three Fiber |
| Persistensi lokal | Browser Local Storage |
| Ikon | Lucide React |
| Pengujian | Vitest, Playwright, axe-core |
| Linting | ESLint + typescript-eslint + eslint-plugin-astro |

## Persyaratan

- Node.js `>=22.23.4`
- npm `>=10`

### Catatan dependensi

`package.json` menggunakan `overrides` untuk menyatukan versi `katex` pada pipeline MDX dengan versi yang sudah dipatch, serta `minimatch` pada perkakas linting. Setelah memperbarui dependensi, jalankan `npm audit` dan seluruh pemeriksaan di bawah untuk memastikan override masih kompatibel.

## Memulai

```bash
npm install
npm run dev
```

Server pengembangan berjalan di `http://localhost:4321`.

## Perintah

| Perintah | Keterangan |
|---|---|
| `npm run dev` | Menjalankan server pengembangan Astro. |
| `npm run build` | Membuat build produksi statis ke `dist/`. |
| `npm run preview` | Meninjau hasil build produksi secara lokal. |
| `npm run check` | Memeriksa tipe TypeScript dan file Astro. |
| `npm run typecheck` | Alias untuk `npm run check`. |
| `npm run lint` | Menjalankan ESLint pada seluruh proyek. |
| `npm run lint:fix` | Menjalankan ESLint dan memperbaiki masalah yang dapat diperbaiki otomatis. |
| `npm run test` | Menjalankan pengujian unit sekali. |
| `npm run test:watch` | Menjalankan Vitest dalam mode watch. |
| `npm run test:e2e` | Menjalankan pengujian end-to-end Playwright. |
| `npm run test:e2e:ui` | Membuka antarmuka Playwright untuk pengujian E2E. |
| `npm run serve:dist` | Menyajikan `dist/` dengan server statis tanpa daemon. |

## Struktur Proyek

```text
.
├── public/
│   ├── _headers                # Header keamanan dan cache untuk Cloudflare Pages
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   └── serve.mjs               # Server statis untuk E2E dan preview dist/
├── src/
│   ├── components/
│   │   ├── home/                # Bagian-bagian halaman beranda
│   │   ├── layout/              # Header, footer, navigasi seluler
│   │   ├── learning/            # Kartu modul, header, sidebar, pager, progres modul
│   │   ├── mathematics/         # Formula KaTeX, MathFormula React, 11 diagram SVG
│   │   ├── navigation/          # Logo, navigasi utama, breadcrumb
│   │   ├── playground/          # Island playground, input, SVG 2D, scene 3D
│   │   ├── exercises/           # Island latihan adaptif
│   │   ├── quizzes/             # Island kuis topik
│   │   ├── progress/            # Dashboard progres lokal
│   │   └── ui/                  # Badge, tombol tautan, judul bagian
│   ├── content/
│   │   └── modules/             # 16 modul MDX + template internal
│   ├── content.config.ts        # Skema content collection
│   ├── data/                    # Navigasi, kurikulum, rumus, glosarium, soal, kuis, playground
│   ├── layouts/                 # BaseLayout dan ProseLayout
│   ├── lib/
│   │   ├── math/                # Fungsi vektor murni
│   │   ├── progress/            # Local Storage dan model progres
│   │   ├── quiz/                # Mesin adaptif dan validasi jawaban
│   │   ├── validation/          # Parsing bilangan dan vektor
│   │   └── content.ts, navigation.ts, title.ts
│   ├── pages/                   # Rute statis dan rute modul dinamis
│   ├── styles/                  # Token desain dan gaya global
│   └── types/                   # Tipe TypeScript bersama
├── tests/
│   ├── unit/                    # Pengujian unit Vitest
│   └── e2e/                     # Pengujian Playwright dan axe
├── astro.config.mjs
├── eslint.config.js
├── netlify.toml
├── vercel.json
├── playwright.config.ts
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

Semua folder di atas sudah diimplementasikan. Tidak ada folder placeholder yang ditampilkan sebagai fitur selesai.

## Arsitektur

### Static-first

Astro merender beranda, navigasi, materi, referensi, dan halaman informasi sebagai HTML statis. React dimuat sebagai island hanya pada halaman yang membutuhkan interaksi: menu seluler (`client:media`), playground, latihan, kuis, progres, dan penanda modul selesai. Visualisasi 3D Three.js dimuat secara lazy hanya ketika pengguna memilih tampilan 3D.

### Pemisahan tanggung jawab

- **Konten** berada di MDX dan data terstruktur, terpisah dari presentasi.
- **Logika matematika** berada di `src/lib/math`, bebas dari React dan dapat diuji secara independen.
- **Komponen UI** dibuat modular dan dapat digunakan ulang.
- **Data kurikulum dan navigasi** berada di `src/data` agar mudah diperbarui.
- **Token desain** berada di `src/styles/tokens.css` dan digunakan melalui variabel CSS semantik.

### Rute yang Tersedia

| Rute | Isi |
|---|---|
| `/` | Beranda dan ikhtisar platform. |
| `/materi` | Kurikulum 16 modul dalam empat tahap. |
| `/materi/[slug]` | Halaman modul dengan materi lengkap, daftar isi, dan navigasi modul. |
| `/playground` | Playground interaktif dengan delapan alat, visualisasi SVG 2D, dan Three.js 3D. |
| `/latihan` | Latihan adaptif dengan tiga tingkat, petunjuk, dan umpan balik. |
| `/kuis` | Kuis lima soal per topik dengan skor dan percobaan ulang. |
| `/rumus` | Referensi rumus dengan pencarian dan filter topik. |
| `/glosarium` | Glosarium istilah dengan pencarian. |
| `/progres` | Dashboard progres lokal, riwayat kuis, dan reset. |
| `/tentang` | Tujuan, pendekatan, dan prinsip teknis. |

## Sistem Desain Academic Modern

Token warna utama berada di `src/styles/tokens.css`:

| Token | Nilai | Penggunaan |
|---|---|---|
| `--color-primary` | `#233B63` | Navigasi dan penekanan utama |
| `--color-accent` | `#3B82F6` | Kontrol interaktif dan aksen |
| `--color-background` | `#FAFAF8` | Latar utama |
| `--color-surface` | `#FFFFFF` | Kartu dan permukaan konten |
| `--color-text` | `#20252D` | Tipografi utama |
| `--color-text-secondary` | `#667085` | Teks pendukung |
| `--color-border` | `#E5E7EB` | Garis dan batas |
| `--color-success` | `#15803D` | Jawaban benar |
| `--color-error` | `#DC2626` | Jawaban salah |

Warna diagram vektor juga memiliki token tersendiri (`--color-vector-a`, `--color-vector-b`, `--color-vector-result`, `--color-vector-projection`, `--color-axis`). Identitas vektor tidak boleh bergantung pada warna saja; label, panah, dan gaya garis harus tetap membedakan objek.

Tipografi:

- **Antarmuka dan teks:** Inter Variable.
- **Kode dan koordinat:** JetBrains Mono Variable.
- **Matematika:** font bawaan KaTeX.

Tata letak desktop:

- Lebar maksimum konten: `1280px`.
- Tinggi header: `68px`.
- Lebar sidebar: `256px`.
- Lebar baca: `760px`.
- Jarak bagian menggunakan skala `clamp()` agar tetap proporsional.

Aksesibilitas dasar mencakup HTML semantik, skip link, fokus yang terlihat, label navigasi, `aria-current`, dukungan `prefers-reduced-motion`, dan kontras teks yang memadai.

## Menulis Materi

Materi pembelajaran disimpan sebagai file MDX di `src/content/modules/`. Content collection didefinisikan di `src/content.config.ts` dan divalidasi saat build. Saat ini terdapat 16 modul terbit dan satu template internal `_template.mdx` yang ditandai `draft: true`.

### Skema frontmatter

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `title` | string | Ya | Judul modul. |
| `description` | string | Ya | Ringkasan singkat untuk daftar dan metadata. |
| `order` | number (1–16) | Ya | Urutan modul dalam kurikulum. |
| `difficulty` | `dasar` \| `menengah` \| `lanjut` | Ya | Tingkat kesulitan. |
| `estimatedDuration` | number | Ya | Estimasi durasi belajar dalam menit. |
| `prerequisites` | string[] | Tidak | ID modul prasyarat. Default `[]`. |
| `objectives` | string[] | Ya | Minimal satu tujuan pembelajaran. |
| `summary` | string | Tidak | Ringkasan tambahan. |
| `quizId` | string | Tidak | ID kuis terkait. |
| `draft` | boolean | Tidak | Default `false`. Draft tidak boleh ditampilkan di navigasi publik. |

Contoh:

```mdx
---
title: 'Pengantar Vektor'
description: 'Mengapa vektor penting dalam matematika dan komputasi.'
order: 1
difficulty: 'dasar'
estimatedDuration: 25
prerequisites: []
objectives:
  - 'Menjelaskan perbedaan besaran skalar dan vektor.'
  - 'Mengenali representasi vektor dalam bidang dua dimensi.'
summary: 'Modul pembuka tentang makna dan kegunaan vektor.'
draft: true
---

## Konsep

Vektor memiliki besar dan arah. Contoh notasi inline: $\mathbf{v} = (x, y)$.

$$
\lVert \mathbf{v} \rVert = \sqrt{x^2 + y^2}
$$
```

### Struktur modul yang wajib diikuti

Setiap modul harus memuat bagian berikut:

1. Tujuan pembelajaran.
2. Prasyarat.
3. Estimasi durasi.
4. Pengantar konsep.
5. Penjelasan intuitif.
6. Definisi matematis.
7. Notasi matematis.
8. Penjelasan rumus.
9. Ilustrasi visual.
10. Contoh bertahap.
11. Penerapan komputasi atau teknik.
12. Kesalahan umum.
13. Latihan.
14. Kuis topik.
15. Ringkasan.
16. Referensi rumus.

Aturan konten:

- Tulis dalam Bahasa Indonesia yang jelas dan sesuai untuk mahasiswa tahun awal.
- Jangan menampilkan rumus tanpa menjelaskan arti simbol dan variabelnya.
- Bedakan operasi 2D dan 3D secara eksplisit, terutama untuk perkalian silang.
- Tangani kasus khusus seperti vektor nol, pembagian dengan nol, dan pembulatan bilangan pecahan.
- Verifikasi semua contoh perhitungan dan kunci jawaban secara independen.
- Jangan menganggap draft atau template sebagai materi yang selesai.

File `src/content/modules/_template.mdx` adalah kerangka internal, bukan materi pembelajaran, dan ditandai `draft: true`.

### Data referensi rumus

Referensi rumus berada di `src/data/formulas.ts`. Setiap entri memiliki `id`, `name`, `topic`, `moduleId`, `expression` (LaTeX), `explanation`, `variables`, dan `example`. Halaman `/rumus` merender entri dan menyediakan pencarian klien tanpa backend.

### Data glosarium

Glosarium berada di `src/data/glossary.ts`. Setiap entri memiliki `term`, `english`, `definition`, `moduleId`, dan `formula` opsional. Halaman `/glosarium` mengelompokkan istilah berdasarkan huruf dan menyediakan pencarian klien.

### Diagram

Diagram vektor berada di `src/components/mathematics/diagrams/` dan diimpor langsung dari MDX. Setiap diagram menggunakan SVG statis, memiliki judul/deskripsi aksesibel, dan memakai token warna vektor yang sama.

### Data soal dan kuis

Bank soal berada di `src/data/exercises.ts` dan berisi 80 soal (lima per modul, mencakup tingkat mudah, sedang, dan sulit). Setiap soal memiliki `id`, `moduleId`, `difficulty`, `type`, `question`, `choices` opsional, `answer`, `tolerance` opsional, `hint`, dan `explanation`.

Kuis diturunkan dari bank soal di `src/data/quizzes.ts`: setiap modul memperoleh satu kuis dengan lima soal. Menambah soal otomatis memperbarui kuis terkait. Validasi jawaban numerik menggunakan toleransi; jawaban pilihan ganda dibandingkan berdasarkan ID pilihan.

Mesin adaptif berada di `src/lib/quiz/adaptive.ts` dan menggunakan aturan deterministik: dua jawaban benar berturut-turut menaikkan tingkat, dua jawaban salah menurunkan tingkat dan menampilkan petunjuk. Tidak ada AI atau API eksternal.

### Matematika di MDX

Pipeline markdown dikonfigurasi di `astro.config.mjs` menggunakan `@astrojs/markdown-remark`, `remark-math`, dan `rehype-katex`.

- Inline: `$a \cdot b = \lVert a \rVert \lVert b \rVert \cos\theta$`
- Display:

```mdx
$$
\mathbf{a} \times \mathbf{b} =
(a_2b_3 - a_3b_2,\; a_3b_1 - a_1b_3,\; a_1b_2 - a_2b_1)
$$
```

Untuk komponen Astro, gunakan `src/components/mathematics/Formula.astro`:

```astro
---
import Formula from '../components/mathematics/Formula.astro';
---

<Formula
  tex="\mathbf{a} \cdot \mathbf{b} = a_1b_1 + a_2b_2 + a_3b_3"
  display
  label="Perkalian titik dihitung dari hasil jumlah perkalian komponen."
/>
```

CSS KaTeX diimpor sekali di `src/layouts/BaseLayout.astro`, sehingga rumus dapat ditampilkan di seluruh halaman.

## Pengujian

Pengujian unit menggunakan Vitest dan berada di `tests/unit/`.

```bash
npm run test
```

Saat ini pengujian mencakup:

- Normalisasi path, navigasi aktif, dan judul halaman.
- Integritas kurikulum, 16 berkas modul, data rumus, dan glosarium.
- Fungsi matematika: operasi vektor, magnitudo, normalisasi, perkalian titik/silang, sudut, proyeksi, kombinasi linear, toleransi, dan kasus vektor nol.
- Validasi masukan numerik dan vektor.
- Mesin latihan adaptif dan pemeriksaan jawaban.
- Penyimpanan progres: modul, latihan, kuis, skor terbaik, reset, data rusak, dan penyimpanan tidak tersedia.
- Integritas bank soal (80 soal) dan kuis (16 kuis, 5 soal per topik).

### Pengujian end-to-end

```bash
npm run test:e2e
```

Playwright menggunakan Chrome dan server statis `scripts/serve.mjs`. Cakupan E2E:

- Navigasi beranda, modul, pager, dan halaman 404.
- Pencarian/filter rumus dan glosarium.
- Playground: delapan alat, hasil penjumlahan, dan pemuatan 3D.
- Latihan, kuis lengkap, skor, penandaan modul selesai, dan progres.
- Audit aksesibilitas kritis dengan axe pada beranda, modul, rumus, dan glosarium.

Konfigurasi berada di `playwright.config.ts`.

## Build dan Deployment

```bash
npm run build
npm run serve:dist
```

Hasil build statis berada di `dist/`. Tidak ada variabel lingkungan, server aplikasi, atau basis data yang diperlukan. `scripts/serve.mjs` adalah server statis kecil untuk meninjau `dist/` dan menjalankan E2E tanpa daemon Astro.

### Vercel

`vercel.json` sudah menyediakan:

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- `cleanUrls: true` dan `trailingSlash: false`
- Header keamanan dan cache immutable untuk `/_astro/*`

Deploy melalui dashboard Vercel dengan mengimpor repositori, atau melalui CLI:

```bash
npx vercel login
npx vercel --prod
```

Tidak ada environment variable, database, atau server aplikasi yang diperlukan.

### Netlify

`netlify.toml` sudah menyediakan:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `22`
- Header keamanan dan cache immutable untuk `/_astro/*`

### Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: `22`
- `public/_headers` menyediakan header keamanan dan cache aset

`.nvmrc` tersedia untuk menyamakan versi Node. Setelah domain produksi ditentukan, tambahkan `site` pada `astro.config.mjs` bila sitemap atau URL absolut diperlukan.

## Status Pengembangan

| Fase | Cakupan | Status |
|---|---|---|
| 1 | Fondasi: Astro, React, MDX, KaTeX, desain, navigasi, beranda, pengujian | Selesai |
| 2 | 16 modul pembelajaran, rumus, glosarium | Selesai |
| 3 | Mesin matematika murni, validasi, dan pengujian | Selesai |
| 4 | Playground 2D/3D dan delapan operasi vektor | Selesai |
| 5 | Latihan adaptif, kuis, progres lokal | Selesai |
| 6 | QA, aksesibilitas, performa, pengujian end-to-end | Selesai |
| 7 | Konfigurasi deployment statis dan header keamanan | Selesai |

### Tugas setelah rilis

- Lakukan tinjauan matematika oleh dosen atau reviewer manusia sebelum publikasi final.
- Jalankan deployment ke akun Netlify/Cloudflare Pages dan verifikasi domain produksi.
- Tambahkan soal dan variasi contoh setelah konten inti ditinjau.
- Pertimbangkan sitemap setelah domain produksi ditentukan.
- Pantau performa nyata dan ukuran unduhan chunk 3D pada perangkat mahasiswa.

## Batasan yang Diketahui

- Tidak ada akun, backend, basis data, sinkronisasi cloud, atau laporan terpusat; ini sesuai ruang lingkup PRD.
- Progres hanya tersimpan di Local Storage peramban dan dapat hilang jika data peramban dihapus.
- Visualisasi 3D memuat chunk Three.js yang cukup besar, tetapi hanya diunduh ketika pengguna memilih tampilan 3D.
- Kunci jawaban kuis baru ditampilkan setelah siswa menjawab; tidak ada server-side grading.
- Konten dan contoh telah diperiksa secara internal, tetapi tinjauan manusia tetap disarankan sebelum digunakan sebagai materi resmi.
