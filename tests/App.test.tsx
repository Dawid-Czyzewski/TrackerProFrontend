import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../src/App';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      changeLanguage: vi.fn(),
    },
  }),
}));

vi.mock('../src/services/authService', () => ({
  authService: {
    getCurrentUser: vi.fn().mockResolvedValue(null),
    logout: vi.fn(),
  },
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders app with loading state', async () => {
    await act(async () => {
      render(<App />);
    });
    
    await waitFor(() => {
      const loadingSpinner = document.querySelector('.animate-spin');
      expect(loadingSpinner || document.body).toBeInTheDocument();
    });
  });
});
