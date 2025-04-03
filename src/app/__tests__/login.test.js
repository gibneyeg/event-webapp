import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../components/LoginForm';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    pathname: '/login',
    query: {},
    asPath: '/login',
  })),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ user: { id: 1, name: 'John Fortnite' } }),
  })
);

describe('Login integration test', () => {
  it('should move to the homepage after login passes', async () => {
    render(<LoginForm />);

    //simulate user input
    fireEvent.change(screen.getByPlaceholderText('Email address'), {
      target: { value: 'john.Fortnite@epic.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    //submit the form
    fireEvent.click(screen.getByText('Sign in'));

    //a
    // ssert navigation after successful login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });
});
