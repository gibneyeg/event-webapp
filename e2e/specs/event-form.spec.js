import { test, expect } from '@playwright/test';

test.describe('Event Form Component', () => {
  test.beforeEach(async ({ page }) => {
    // Set up mock localStorage with user data before each test
    await page.addInitScript(() => {
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      }));
    });
  });

  test('should display the event form with all fields', async ({ page }) => {
    await page.goto('/events/new');
    
    // Check that the form is displayed 
    await expect(page.locator('.event-form-container')).toBeVisible();
    await expect(page.locator('.page-title')).toBeVisible();
    
    await expect(page.locator('.btn-submit')).toBeVisible();
    await expect(page.locator('.btn-cancel')).toBeVisible();
  });

  test('should show loading state during form submission', async ({ page }) => {
    // Mock the API response
    await page.route('/api/events', async (route) => {
      // Delay the response to ensure we can verify the loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return a successful response
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ id: 123, title: 'Test Event' })
      });
    });
    
    await page.goto('/events/new');
    
    // Fill in the form 
    await page.locator('#title').fill('Test Event Name');
    
    // Get current date/time for the required format
    const now = new Date();
    const startDateValue = now.toISOString().slice(0, 16);
    await page.locator('#startDate').fill(startDateValue);
    
    // Set up alert handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Event created successfully');
      await dialog.accept();
    });
    
    await page.locator('.btn-submit').click();
    
    await expect(page.locator('.btn-submit')).toHaveText('Creating...');
  });

  test('should show error message when not logged in', async ({ page }) => {
    // Clear the mock localStorage
    await page.addInitScript(() => {
      localStorage.removeItem('user');
    });
    
    await page.goto('/events/new');
    
    // Fill in form 
    await page.locator('#title').fill('Event without login');
    
    // Get current date/time for the required format
    const now = new Date();
    const startDateValue = now.toISOString().slice(0, 16);
    await page.locator('#startDate').fill(startDateValue);
    
    await page.locator('.btn-submit').click();
    
    await expect(page.locator('text=You must be logged in to create an event')).toBeVisible();
  });

  test('should validate form fields before submission', async ({ page }) => {
    await page.goto('/events/new');
    
    // Try to submit without filling required fields
    await page.locator('.btn-submit').click();
    
    // Browser validation should prevent form submission
    await expect(page).toHaveURL('/events/new');
  });

});