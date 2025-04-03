import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventForm from '../components/EventForm';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/',
  })),
}));

describe('EventForm integration test', () => {
  const mockEvent = {
    title: 'Integration Event',
    description: 'Testing the integration of EventForm.',
    location: 'Integration Location',
    startDate: '2025-04-10T00:00',
    endDate: '2025-04-10T00:00',
  };

  const mockUser = {
    id: '12345',
    name: 'Test User',
  };

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(mockUser));

    //mock the fetch API for success and error cases
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    //mock the alert function to prevent blocking
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    //clear fakes after each test
    localStorage.clear();
    jest.resetAllMocks();
  });

  it('should submit the form and navigate to /events', async () => {
    render(<EventForm event={mockEvent} formAction="create" />);

    //check pre-filled form fields
    expect(screen.getByLabelText(/Title/i)).toHaveValue(mockEvent.title);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(mockEvent.description);
    expect(screen.getByLabelText(/Location/i)).toHaveValue(mockEvent.location);
    expect(screen.getByLabelText(/Start Date\/Time/i)).toHaveValue(mockEvent.startDate);
    expect(screen.getByLabelText(/End Date\/Time/i)).toHaveValue(mockEvent.endDate);

    //simulate form submission
    const submitButton = screen.getByRole('button', { name: /Create Event/i });
    fireEvent.click(submitButton);

    //verify the API call is made with data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...mockEvent,
          //use fake user id form above
          userId: mockUser.id,
        }),
      });
    });

    //verify page change to /events
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/events');
    });
  });

  it('should display an error if the API request fails', async () => {
    //mock API fetch to simulate failure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Failed to create event' }),
      })
    );

    render(<EventForm event={mockEvent} formAction="create" />);

    //simulate form submission
    const submitButton = screen.getByRole('button', { name: /Create Event/i });
    fireEvent.click(submitButton);

    //check for error message
    const errorMessage = await screen.findByText(/Failed to create event/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
