import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { OutgoingDashboard } from './OutgoingDashboard';
import { IncomingDashboard } from './IncomingDashboard';

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
    return <IncomingDashboard />;
  }

  // Se per qualche motivo il ruolo non è definito, mostra la dashboard admin come fallback
  console.warn('User role not defined, defaulting to admin dashboard');
  return <AdminDashboard />;
};