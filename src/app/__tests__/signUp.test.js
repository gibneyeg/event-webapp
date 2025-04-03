import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from '../components/SignUpForm';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    pathname: '/',
    query: {},
    asPath: '/',
  })),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'Account created successfully' }),
  })
);

describe('Signup intergation test', () => {
  it('should show success message and move to login page', async () => {
    render(<SignupForm />);

    //simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Fortnite' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.Fortnite@epic.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create a password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password123' },
    });

    //submit the form
    fireEvent.click(screen.getByText('Create account'));

    //assert success message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Account created successfully! You can now log in.'
      );
    });

    //assert navigation with a delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});

describe('Signup validation tests', () => {
  it('should fail when password is less than 6 characters', async () => {
    render(<SignupForm />);

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Fortnite' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.Fortnite@epic.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create a password'), {
      target: { value: 'pass' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'pass' },
    });

    //submit the form
    fireEvent.click(screen.getByText('Create account'));

    //assert error message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Password must be at least 6 characters');
    });
  });

  it('should fail when password is not the same', async () => {
    render(<SignupForm />);

    //simulate user input
    fireEvent.change(screen.getByPlaceholderText('Enter your full name'), {
      target: { value: 'John Fortnite' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.Fortnite@epic.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Create a password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm your password'), {
      target: { value: 'password1234' },
    });

    //submit the form
    fireEvent.click(screen.getByText('Create account'));

    //assert error message
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Passwords do not match');
    });
  });
});