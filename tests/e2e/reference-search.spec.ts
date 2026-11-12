import { expect, test } from '@playwright/test';

test('pencarian rumus memfilter hasil', async ({ page }) => {
  await page.goto('/rumus');

  const input = page.getByLabel('Cari rumus');
  await expect(input).toBeVisible();
  await input.fill('proyeksi');

  await expect(page.getByText('2 dari 22 rumus ditampilkan')).toBeVisible();
  await expect(page.locator('[data-formula-card]:not([hidden])')).toHaveCount(2);
});

test('filter topik rumus memfilter hasil', async ({ page }) => {
  await page.goto('/rumus');

  await page.getByLabel('Topik').selectOption('Transformasi');
  await expect(page.locator('[data-formula-card]:not([hidden])')).toHaveCount(3);
});

test('pencarian glosarium menemukan istilah dari padanan Inggris', async ({ page }) => {
  await page.goto('/glosarium');

  const input = page.getByLabel('Cari istilah');
  await expect(input).toBeVisible();
  await input.fill('independence');

  await expect(page.getByText('1 dari 34 istilah ditampilkan')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Bebas Linear' })).toBeVisible();
});
