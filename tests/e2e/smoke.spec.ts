import { expect, test } from '@playwright/test';

test('beranda memuat judul dan navigasi utama', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Vector Lab/);

  const nav = page.getByRole('navigation', { name: 'Navigasi utama' });
  await expect(nav.getByRole('link')).toHaveCount(8);
});

test('navigasi antar modul berfungsi', async ({ page }) => {
  await page.goto('/materi');
  await page.getByRole('link', { name: /Pengantar Vektor/ }).first().click();
  await expect(page).toHaveURL(/materi\/pengantar-vektor/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Pengantar Vektor');

  await page.getByRole('link', { name: /Modul berikutnya/ }).click();
  await expect(page).toHaveURL(/materi\/skalar-dan-vektor/);
});

test('halaman 404 menampilkan pesan dalam Bahasa Indonesia', async ({ page }) => {
  await page.goto('/halaman-tidak-ada');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Halaman tidak ditemukan');
});
