import { expect, test, type Page } from '@playwright/test';

test('latihan memberikan umpan balik setelah menjawab', async ({ page }) => {
  await page.goto('/latihan');

  await expect(page.locator('#exercise-question')).toContainText('Hitung magnitudo vektor (6, 8).');
  await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await page.locator('#exercise-answer').fill('10');
  await page.getByRole('button', { name: 'Periksa jawaban' }).click();

  await expect(page.getByText('Jawaban benar.')).toBeVisible();
});

async function answerQuiz(page: Page) {
  const answers = ['10', 'a', '5', 'a', '12'];

  for (let index = 0; index < answers.length; index += 1) {
    const numeric = await page.locator('#quiz-answer').count();

    if (numeric > 0) {
      await page.locator('#quiz-answer').fill(answers[index]!);
    } else {
      await page.locator(`input[type="radio"][value="${answers[index]}"]`).check();
    }

    await page.getByRole('button', { name: 'Periksa jawaban' }).click();
    await expect(page.getByText('Jawaban benar.')).toBeVisible();

    const isLast = index === answers.length - 1;
    await page
      .getByRole('button', { name: isLast ? 'Lihat hasil' : 'Soal berikutnya' })
      .click();
  }
}

test('kuis dapat diselesaikan dan mencatat skor', async ({ page }) => {
  await page.goto('/kuis');
  await page.getByRole('button', { name: 'Mulai kuis' }).first().click();
  await answerQuiz(page);

  await expect(page.locator('[class*="finalScore"]')).toHaveText('100%');
});

test('modul dapat ditandai selesai dan tercatat di progres', async ({ page }) => {
  await page.goto('/materi/pengantar-vektor');

  await expect(page.locator('[data-hydrated="true"]')).toBeVisible();
  await page.getByRole('button', { name: 'Tandai modul selesai' }).click();
  await expect(page.getByRole('button', { name: /Batalkan tanda selesai/ })).toBeVisible();

  await page.goto('/progres');
  await expect(page.getByText('1 dari 16 modul selesai')).toBeVisible();
  await expect(page.locator('[class*="moduleList"] a')).toHaveCount(1);
  await expect(page.locator('[class*="moduleList"] a')).toContainText('Pengantar Vektor');
});
