import api from './api';
import { User } from '../types';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await api.post('/login', data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post('/register', data);
    if (response.data.user?.isVerified) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/me');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<{ message: string; user: User }> => {
    const response = await api.get(`/verify-email?token=${token}`);
    return response.data;
  },
};
