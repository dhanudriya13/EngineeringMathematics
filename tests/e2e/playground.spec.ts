import { expect, test } from '@playwright/test';

test('playground menampilkan delapan alat dan hasil penjumlahan', async ({ page }) => {
  await page.goto('/playground');

  const tabs = page.locator('[aria-label="Alat playground"] button');
  await expect(tabs).toHaveCount(8);
  await expect(page.locator('[class*="resultValuePrimary"]')).toHaveText('(4, 6)');
});

test('perkalian silang memuat visualisasi 3D', async ({ page }) => {
  await page.goto('/playground');

  await page
    .locator('[aria-label="Alat playground"] button')
    .filter({ hasText: 'Perkalian Silang' })
    .click();

  await expect(page.locator('canvas')).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText('(-3, 6, -3)')).toBeVisible();
});

test('proyeksi menampilkan pesan kesalahan untuk vektor nol', async ({ page }) => {
  await page.goto('/playground');

  await page
    .locator('[aria-label="Alat playground"] button')
    .filter({ hasText: 'Proyeksi' })
    .click();

  await expect(page.getByText('Proyeksi vektor', { exact: false }).first()).toBeVisible();
});
