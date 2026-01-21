import { describe, it, expect, vi, beforeEach } from 'vitest';
import { authService } from '../../src/services/authService';
import api from '../../src/services/api';

vi.mock('../../src/services/api', () => ({
  default: {
    post: vi.fn(),
    get: vi.fn(),
  },
}));

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as any;

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should login and store tokens', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: 1,
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
          },
        },
      };

      (api.post as any).mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(api.post).toHaveBeenCalledWith('/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'test-refresh-token');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('register', () => {
    it('should register and store tokens if user is verified', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: 1,
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe',
            isVerified: true,
          },
        },
      };

      (api.post as any).mockResolvedValue(mockResponse);

      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });

      expect(api.post).toHaveBeenCalledWith('/register', {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
      expect(result).toEqual(mockResponse.data);
    });

    it('should not store tokens if user is not verified', async () => {
      const mockResponse = {
        data: {
          token: 'test-token',
          refreshToken: 'test-refresh-token',
          user: {
            id: 1,
            email: 'test@example.com',
            isVerified: false,
          },
        },
      };

      (api.post as any).mockResolvedValue(mockResponse);

      await authService.register({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(localStorage.setItem).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should remove tokens from localStorage', () => {
      authService.logout();

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      };

      (api.get as any).mockResolvedValue({ data: mockUser });

      const result = await authService.getCurrentUser();

      expect(api.get).toHaveBeenCalledWith('/me');
      expect(result).toEqual(mockUser);
    });
  });

  describe('verifyEmail', () => {
    it('should verify email with token', async () => {
      const mockResponse = {
        data: {
          message: 'Email verified',
          user: {
            id: 1,
            email: 'test@example.com',
            isVerified: true,
          },
        },
      };

      (api.get as any).mockResolvedValue(mockResponse);

      const result = await authService.verifyEmail('verification-token');

      expect(api.get).toHaveBeenCalledWith('/verify-email?token=verification-token');
      expect(result).toEqual(mockResponse.data);
    });
  });
});
