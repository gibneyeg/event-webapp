import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';
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
    const { container } = render(<Home />);

    // Check if the button exists
    const button = screen.getByRole('button', { name: /create event →/i });
        expect(button).toBeInTheDocument();

    // // Ensure the button is inside the hero-actions container
    // const heroActions = container.querySelector('.hero-actions');
    // expect(heroActions).toContainElement(button);

    //I made changes to the page this isnt there anymore 

    // Debugging the layout (optional)
    // console.log(container.innerHTML);
  });
});

