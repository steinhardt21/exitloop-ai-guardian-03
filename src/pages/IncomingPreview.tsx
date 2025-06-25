import React from 'react';
import { IncomingDashboard } from '@/components/dashboard/IncomingDashboard';
import { IncomingSidebar } from '@/components/dashboard/IncomingSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const IncomingPreview: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <IncomingSidebar />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <IncomingDashboard />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IncomingPreview; 