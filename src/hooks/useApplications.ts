import { useEffect, useState } from 'react';
import { applicationService } from '../services/applicationService';
import { Application } from '../types';

export const useApplications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const data = await applicationService.getAll();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const refreshApplications = async () => {
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (error) {
      console.error('Error refreshing applications:', error);
    }
  };

  const handleAddApplication = async (
    companyName: string,
    position: string,
    platform: string,
    status: string,
    appliedAt: string
  ) => {
    try {
      await applicationService.create({
        companyName,
        position: position || undefined,
        platform: platform || undefined,
        status,
        appliedAt
      });
      
      await refreshApplications();
    } catch (error) {
      console.error('Error adding application:', error);
      throw error;
    }
  };

  const handleUpdateApplication = async (
    id: number,
    companyName: string,
    position: string,
    platform: string,
    status: string,
    appliedAt: string
  ) => {
    try {
      await applicationService.update(id, {
        companyName,
        position: position || undefined,
        platform: platform || undefined,
        status,
        appliedAt
      });
      
      await refreshApplications();
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  const handleDeleteApplication = async (id: number) => {
    try {
      await applicationService.delete(id);
      await refreshApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchQuery === '' || 
      app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.position && app.position.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.platform && app.platform.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return {
    applications,
    loading,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    filteredApplications,
    handleAddApplication,
    handleUpdateApplication,
    handleDeleteApplication,
  };
};
