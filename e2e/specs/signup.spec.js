import { test, expect } from '@playwright/test';

test.describe('Signup Page', () => {
  test('should show signup form', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.locator('h2')).toHaveText('Create an account');
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#confirmPassword')).toBeVisible();
  });

  test('should validate mismatched passwords', async ({ page }) => {
    await page.goto('/signup');
    
    // Fill the form with mismatched passwords
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('different');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });

  test('should check password length', async ({ page }) => {
    await page.goto('/signup');
    
    // Fill the form with short password
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('short');
    await page.locator('#confirmPassword').fill('short');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible();
  });

  test('should show loading state and success message', async ({ page }) => {
    // Mock the API endpoint
    await page.route('/api/auth/signup', async (route) => {
      // Delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'User created successfully' }),
      });
    });
    
    await page.goto('/signup');
    
    // Fill the form correctly
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('button[type="submit"]')).toHaveText('Creating account...');
    
    await expect(page.locator('text=Account created successfully')).toBeVisible();
    
    // Should redirect to login page
    await page.waitForURL('/login', { timeout: 5000 });
  });
  
  test('should handle signup failure gracefully', async ({ page }) => {
    // Mock the API endpoint for failure
    await page.route('/api/auth/signup', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Email already exists' }),
      });
    });
    
    await page.goto('/signup');
    
    // Fill the form
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('existing@example.com');
    await page.locator('#password').fill('password123');
    await page.locator('#confirmPassword').fill('password123');
    
    await page.locator('button[type="submit"]').click();
    
    await expect(page.locator('text=Email already exists')).toBeVisible();
    
    // Should still be on signup page
    await expect(page).toHaveURL('/signup');
  });
});