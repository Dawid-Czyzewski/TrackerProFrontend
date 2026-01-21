import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../../../src/components/auth/LoginForm';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

describe('LoginForm', () => {
  const mockProps = {
    email: '',
    password: '',
    onEmailChange: vi.fn(),
    onPasswordChange: vi.fn(),
    onSubmit: vi.fn(),
    loading: false,
    fieldErrors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form', () => {
    render(<LoginForm {...mockProps} />);

    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /auth.login/i })).toBeInTheDocument();
  });

  it('should call onEmailChange when email input changes', async () => {
    render(<LoginForm {...mockProps} />);

    const emailInput = screen.getByPlaceholderText('twoj@email.com');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(mockProps.onEmailChange).toHaveBeenCalledWith('test@example.com');
  });

  it('should call onPasswordChange when password input changes', async () => {
    render(<LoginForm {...mockProps} />);

    const passwordInput = screen.getByPlaceholderText('••••••••');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(mockProps.onPasswordChange).toHaveBeenCalledWith('password123');
  });

  it('should call onSubmit when form is submitted', async () => {
    render(<LoginForm {...mockProps} />);

    const form = screen.getByRole('button', { name: /auth.login/i }).closest('form');
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockProps.onSubmit).toHaveBeenCalled();
  });

  it('should display field errors', () => {
    render(
      <LoginForm
        {...mockProps}
        fieldErrors={{
          email: 'Email is required',
          password: 'Password is required',
        }}
      />
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  it('should disable button when loading', () => {
    render(<LoginForm {...mockProps} loading={true} />);

    const submitButton = screen.getByRole('button', { name: /auth.loggingIn/i });
    expect(submitButton).toBeDisabled();
  });
});
