import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const pages = ['/', '/materi/pengantar-vektor', '/rumus', '/glosarium'];

for (const path of pages) {
  test(`tidak ada pelanggaran aksesibilitas kritis di ${path}`, async ({ page }) => {
    await page.goto(path);

    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter((violation) => violation.impact === 'critical');

    expect(
      critical,
      `Pelanggaran kritis di ${path}: ${critical.map((violation) => violation.id).join(', ')}`,
    ).toEqual([]);
  });
}
