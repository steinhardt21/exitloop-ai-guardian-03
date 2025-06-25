import React from 'react';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const AdminPreview: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <AdminDashboard />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminPreview; 