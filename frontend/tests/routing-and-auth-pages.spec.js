import { test, expect } from '@playwright/test';

test.describe('Auth pages and public navigation', () => {
  test('forgot password page shows heading and email step', async ({ page }) => {
    await page.goto('/forgot-password', { waitUntil: 'load', timeout: 60_000 });
    await expect(page.getByRole('heading', { name: /forgot your password\?/i })).toBeVisible();
    await expect(page.getByLabel(/university email/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send reset link/i })).toBeVisible();
  });

  test('reset password page shows new-password form with placeholder token', async ({ page }) => {
    await page.goto('/reset-password/dev-test-token', { waitUntil: 'load', timeout: 60_000 });
    await expect(page.getByText(/set new password/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /choose a new password/i })).toBeVisible();
    await expect(page.getByLabel(/^new password$/i)).toBeVisible();
    await expect(page.getByLabel(/^confirm password$/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /update password/i })).toBeVisible();
  });

  test('login page links to register', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'load', timeout: 60_000 });
    await page.getByRole('link', { name: /create an account/i }).click();
    await expect(page).toHaveURL(/\/register$/);
  });

  test('register page links back to login', async ({ page }) => {
    await page.goto('/register', { waitUntil: 'load', timeout: 60_000 });
    await page.getByRole('link', { name: /^sign in$/i }).click();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('login page links to forgot password', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'load', timeout: 60_000 });
    await page.getByRole('link', { name: /forgot password\?/i }).click();
    await expect(page).toHaveURL(/\/forgot-password$/);
  });

  test('unmatched path redirects to login when not signed in', async ({ page }) => {
    await page.goto('/this-route-does-not-exist', { waitUntil: 'load', timeout: 60_000 });
    await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });
  });
});

test.describe('Protected routes (unauthenticated → login)', () => {
  test('student area redirects to login', async ({ page }) => {
    await page.goto('/student/browse', { waitUntil: 'load', timeout: 60_000 });
    await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });
  });

  test('organizer area redirects to login', async ({ page }) => {
    await page.goto('/organizer/events', { waitUntil: 'load', timeout: 60_000 });
    await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });
  });

  test('admin area redirects to login', async ({ page }) => {
    await page.goto('/admin/users', { waitUntil: 'load', timeout: 60_000 });
    await expect(page).toHaveURL(/\/login$/, { timeout: 20_000 });
  });
});

test.describe('OAuth callback', () => {
  test('callback without token shows sign-in failed state', async ({ page }) => {
    await page.goto('/oauth/callback', { waitUntil: 'load', timeout: 60_000 });
    await expect(page.getByRole('heading', { name: /sign-in failed/i })).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/no oauth token received/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /back to sign in/i })).toBeVisible();
  });
});
