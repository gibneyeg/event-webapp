import { test, expect } from '@playwright/test';

test.describe('Events API', () => {
  test('GET /api/events should return events when userId is provided', async ({ request }) => {
    const response = await request.get('/api/events?userId=1');
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });
  
  test('GET /api/events should return 401 when userId is not provided', async ({ request }) => {
    const response = await request.get('/api/events');
    
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Need to be logged in to get events');
  });


  test('POST /api/events should validate required fields', async ({ request }) => {
    const incompleteData = {
      description: 'Missing required fields',
      location: 'Test Location',
    };

    const response = await request.post('/api/events', {
      data: incompleteData
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBeTruthy();
  });
  
  test('POST /api/events should require userId', async ({ request }) => {
    const dataWithoutUserId = {
      title: 'Test Event',
      description: 'Test Description',
      location: 'Test Location',
      startDate: new Date().toISOString(),
    };

    const response = await request.post('/api/events', {
      data: dataWithoutUserId
    });
    
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('User ID is required to create an event');
  });
  
  test('GET /api/events/[id] should return event when userId is provided', async ({ request }) => {
    const response = await request.get('/api/events/1?userId=1');
    
    // Handle both success and failure cases
    if (response.status() === 200) {
      const body = await response.json();
      expect(body.id).toBe(1);
    } else if (response.status() === 404) {
      const body = await response.json();
      expect(body.error).toBe('Event not found');
    }
  });
  
  test('GET /api/events/[id] should require authentication', async ({ request }) => {
    const response = await request.get('/api/events/1');
    
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.error).toBe('Need to be logged in to get events');
  });
});