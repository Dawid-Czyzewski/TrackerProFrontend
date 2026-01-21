import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Application } from '../types';
import { ApplicationsSkeleton } from '../components/SkeletonLoader';
import { useApplications } from '../hooks/useApplications';
import MonthlyStatistics from '../components/applications/MonthlyStatistics';
import ApplicationFilters from '../components/applications/ApplicationFilters';
import ApplicationList from '../components/applications/ApplicationList';
import AddApplicationModal from '../components/applications/AddApplicationModal';
import StatusHistoryModal from '../components/applications/StatusHistoryModal';
import DeleteConfirmationModal from '../components/applications/DeleteConfirmationModal';

const Applications: React.FC = () => {
  const { t } = useTranslation();
  const {
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
  } = useApplications();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addingApplication, setAddingApplication] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [editingApplication, setEditingApplication] = useState<Application | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deletingApplication, setDeletingApplication] = useState<Application | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAdd = async (
    companyName: string,
    position: string,
    platform: string,
    status: string,
    appliedAt: string
  ) => {
    setAddingApplication(true);
    try {
      await handleAddApplication(companyName, position, platform, status, appliedAt);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding application:', error);
    } finally {
      setAddingApplication(false);
    }
  };

  const handleUpdate = async (
    id: number,
    companyName: string,
    position: string,
    platform: string,
    status: string,
    appliedAt: string
  ) => {
    setAddingApplication(true);
    try {
      await handleUpdateApplication(id, companyName, position, platform, status, appliedAt);
      setIsEditModalOpen(false);
      setEditingApplication(null);
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setAddingApplication(false);
    }
  };

  const handleDeleteClick = (app: Application) => {
    setDeletingApplication(app);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingApplication) return;
    
    try {
      await handleDeleteApplication(deletingApplication.id);
      setIsDeleteModalOpen(false);
      setDeletingApplication(null);
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  if (loading) {
    return <ApplicationsSkeleton />;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">{t('application.title')}</h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">{t('application.subtitle')}</p>
      </div>

      <MonthlyStatistics applications={applications} />

      <ApplicationFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6">
        <div className="flex items-center justify-end mb-4 sm:mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 sm:px-4 py-2 sm:py-2.5 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-medium text-sm sm:text-base flex items-center justify-center gap-2 transition-colors touch-manipulation"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">{t('application.addApplication')}</span>
            <span className="sm:hidden text-lg font-bold">+</span>
          </button>
        </div>

        <ApplicationList
          applications={filteredApplications}
          onViewHistory={(app) => {
            setSelectedApplication(app);
            setIsHistoryModalOpen(true);
          }}
          onEdit={(app) => {
            setEditingApplication(app);
            setIsEditModalOpen(true);
          }}
          onDelete={handleDeleteClick}
        />
      </div>

      <AddApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
        loading={addingApplication}
      />

      <AddApplicationModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingApplication(null);
        }}
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        loading={addingApplication}
        application={editingApplication}
      />

      {selectedApplication && (
        <StatusHistoryModal
          isOpen={isHistoryModalOpen}
          onClose={() => {
            setIsHistoryModalOpen(false);
            setSelectedApplication(null);
          }}
          companyName={selectedApplication.companyName}
          statusHistory={selectedApplication.statusHistory || []}
          currentStatus={selectedApplication.status}
        />
      )}

      {deletingApplication && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setDeletingApplication(null);
          }}
          onConfirm={handleDeleteConfirm}
          companyName={deletingApplication.companyName}
          loading={false}
        />
      )}
    </div>
  );
};

export default Applications;
