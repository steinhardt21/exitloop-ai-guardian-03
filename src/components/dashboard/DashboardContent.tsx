import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { UserDashboard } from './UserDashboard';

export const DashboardContent: React.FC = () => {
  const { user } = useAuth();
  
  // Per ora consideriamo tutti gli utenti come admin
  // In futuro questo sarà basato sul ruolo effettivo dell'utente
  const isAdmin = true; // user?.role === 'admin'

  if (isAdmin) {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
};