import type { NavItem } from '../types';

export const site = {
  name: 'Vector Lab',
  tagline: 'Laboratorium matematika vektor untuk mahasiswa Sistem Informasi.',
  description:
    'Vector Lab adalah platform belajar Matematika Teknik yang menghubungkan konsep vektor, notasi matematika, visualisasi, dan penerapan komputasi.',
  locale: 'id_ID',
  language: 'id',
} as const;

export const navItems: readonly NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Materi', href: '/materi' },
  { label: 'Playground', href: '/playground' },
  { label: 'Latihan', href: '/latihan' },
  { label: 'Kuis', href: '/kuis' },
  { label: 'Rumus', href: '/rumus' },
  { label: 'Glosarium', href: '/glosarium' },
  { label: 'Progres', href: '/progres' },
];

export const footerNavigation = [
  {
    title: 'Belajar',
    links: [
      { label: 'Kurikulum', href: '/materi' },
      { label: 'Latihan', href: '/latihan' },
      { label: 'Kuis', href: '/kuis' },
    ],
  },
  {
    title: 'Referensi',
    links: [
      { label: 'Rumus', href: '/rumus' },
      { label: 'Glosarium', href: '/glosarium' },
      { label: 'Tentang', href: '/tentang' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Playground', href: '/playground' },
      { label: 'Progres', href: '/progres' },
    ],
  },
] as const;
