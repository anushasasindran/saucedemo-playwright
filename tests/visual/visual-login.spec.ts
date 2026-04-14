import { test, expect } from '../../src/fixtures';

test.describe('Visual - Login Page', { tag: '@visual' }, () => {
  test('login page looks correct', async ({ page }) => {
    await page.goto('/');

    // Disable animations for deterministic screenshots
    await page.addStyleTag({
      content: `*, *::before, *::after {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }`,
    });

    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixelRatio: 0.01,
    });
  });

  test('login error state looks correct', async ({
    loginPage,
    users,
    page,
  }) => {
    await loginPage.navigate('/');
    await loginPage.login(users.invalid.username, users.invalid.password);

    await expect(page).toHaveScreenshot('login-error-state.png', {
      maxDiffPixelRatio: 0.01,
    });
  });
});
