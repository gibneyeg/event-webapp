import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage with basic elements and header', async ({ page }) => {
    await page.goto('/');
    
    // Check main elements
    await expect(page.locator('.hero-title')).toBeVisible();
    await expect(page.locator('.hero-title')).toHaveText('Welcome to Event Creator');
    
    // The header is actually a nav with class "main-header"
    await expect(page.locator('.main-header')).toBeVisible();
  });

  test('should have navigation links in header', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('.nav-button')).toHaveCount(2); 
    await expect(page.locator('.nav-button:has-text("Home")')).toBeVisible();
    await expect(page.locator('.nav-button:has-text("Events")')).toBeVisible();
  });

  test('should have authentication buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for sign-in and sign-up buttons
    await expect(page.locator('.sign-up')).toBeVisible();
    await expect(page.locator('.sign-in')).toBeVisible();
  });

  test('should have feature cards with action buttons', async ({ page }) => {
    await page.goto('/');
    
    // Check for the two feature cards
    await expect(page.locator('.feature-card')).toHaveCount(2);
    
    // First card
    await expect(page.locator('.feature-card:first-child .text-button')).toHaveText('View Events →');
    
    // Second card
    await expect(page.locator('.feature-card:nth-child(2) .text-button')).toHaveText('Create Event →');
  });

  test('should have properly styled hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that the hero section exists
    const heroSection = page.locator('.hero');
    await expect(heroSection).toBeVisible();
    
    // Check for hero content
    await expect(page.locator('.hero-description')).toHaveText('Create and manage your events in one place');
  });
  
});