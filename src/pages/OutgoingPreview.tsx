import React from 'react';
import { OutgoingDashboard } from '@/components/dashboard/OutgoingDashboard';
import { OutgoingSidebar } from '@/components/dashboard/OutgoingSidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

const OutgoingPreview: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <OutgoingSidebar />
        <div className="flex-1 bg-gray-50 overflow-auto">
          <OutgoingDashboard />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OutgoingPreview; 