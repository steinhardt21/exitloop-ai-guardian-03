import React from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { TooltipProvider } from '@/components/ui/tooltip';

const Dashboard: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <DashboardContent />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;