import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from '/home/wisdom/Documents/GitHub/event-webapp/src/app/page.js';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  })),
}));

describe('Create New Event button test', () => {
  test('make "Create New Event" button in the right place', () => {
    const { container } = render(<Page />);

    // Check if the button exists
    const button = screen.getByRole('button', { name: /create new event/i });
    expect(button).toBeInTheDocument();

    // Ensure the button is inside the hero-actions container
    const heroActions = container.querySelector('.hero-actions');
    expect(heroActions).toContainElement(button);

    // Debugging the layout (optional)
    console.log(container.innerHTML);
  });
});

