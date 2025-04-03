import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test('should show login form', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h2')).toHaveText('Sign in to your account');
    await expect(page.locator('#email-address')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/login');
    
    // submitting without entering anything
    await page.locator('button[type="submit"]').click();
    
    // Browser validation should prevent submission
    await expect(page).toHaveURL('/login');
  });

  
  test('should redirect after successful login', async ({ page }) => {
    // Mock the fetch response for a successful login
    await page.route('/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ 
          user: { 
            id: 1, 
            email: 'test@example.com',
            name: 'Test User'
          }
        }),
      });
    });
    
    // Mock localStorage for the test
    await page.addInitScript(() => {      
      const mockLocalStorage = {
        getItem: function(key) {
          return this[key] || null;
        },
        setItem: function(key, value) {
          this[key] = value;
        },
        removeItem: function(key) {
          delete this[key];
        }
      };
      
      // Replace window.localStorage with our mock
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
      });
    });
    
    await page.goto('/login');
    
    // Fill the form
    await page.locator('#email-address').fill('test@example.com');
    await page.locator('#password').fill('password123');
    
    // Submit the form
    await page.locator('button[type="submit"]').click();
    
    // Should redirect to homepage
    await page.waitForURL('/');
    
    // checking that on homepage
    await expect(page.locator('.hero-title')).toBeVisible();
  });
});