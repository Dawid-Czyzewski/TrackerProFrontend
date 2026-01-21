import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Auth from '../../src/pages/Auth';
import { authService } from '../../src/services/authService';

vi.mock('../../src/services/authService');
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Auth Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render login form by default', () => {
    renderWithRouter(<Auth />);
    expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
  });

  it('should switch between login and register tabs', async () => {
    renderWithRouter(<Auth />);

    const registerTab = screen.getByRole('button', { name: /auth.registerTab/i });
    await userEvent.click(registerTab);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Jan Kowalski')).toBeInTheDocument();
    });
  });

  it('should handle successful login', async () => {
    const mockLogin = vi.spyOn(authService, 'login').mockResolvedValue({
      token: 'test-token',
      refreshToken: 'test-refresh',
      user: {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        isVerified: true,
      },
    });

    renderWithRouter(<Auth />);

    const loginTab = screen.getByRole('button', { name: 'auth.loginTab' });
    await userEvent.click(loginTab);

    await waitFor(() => {
      expect(screen.getByPlaceholderText('twoj@email.com')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByPlaceholderText('twoj@email.com'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123');
    
    const submitButtons = screen.getAllByRole('button');
    const submitButton = submitButtons.find(btn => btn.getAttribute('type') === 'submit');
    if (submitButton) {
      await userEvent.click(submitButton);
    }

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });
  });
});
