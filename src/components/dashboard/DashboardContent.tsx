import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { OutgoingDashboard } from './OutgoingDashboard';
import { UserDashboard } from './UserDashboard';

interface DashboardContentProps {
  onNavigate?: (page: string, handoverId?: string) => void;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  
  // Determina il tipo di dashboard in base al ruolo dell'utente
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }
  
  if (user?.role === 'outgoing') {
    return <OutgoingDashboard onNavigate={onNavigate} />;
  }
  
  if (user?.role === 'incoming') {
    return <UserDashboard />;
  }

  // Default fallback
  return <AdminDashboard />;
};