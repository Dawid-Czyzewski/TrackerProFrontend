import api from './api';
import { Application, ApplicationStats } from '../types';

export const applicationService = {
  getAll: async (): Promise<Application[]> => {
    const response = await api.get('/applications');
    return response.data;
  },

  getById: async (id: number): Promise<Application> => {
    const response = await api.get(`/applications/${id}`);
    return response.data;
  },

  create: async (data: Partial<Application>): Promise<Application> => {
    const response = await api.post('/applications', data);
    return response.data;
  },

  update: async (id: number, data: Partial<Application>): Promise<Application> => {
    const response = await api.put(`/applications/${id}`, data);
    return response.data;
  },

  changeStatus: async (id: number, status: string): Promise<Application> => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data;
  },

  getStats: async (): Promise<ApplicationStats> => {
    const response = await api.get('/applications/stats');
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/applications/${id}`);
  },
};
