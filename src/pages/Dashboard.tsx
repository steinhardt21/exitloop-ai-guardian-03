import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { OutgoingSidebar } from '@/components/dashboard/OutgoingSidebar';
import { IncomingSidebar } from '@/components/dashboard/IncomingSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { TemplateList } from '@/components/templates/TemplateList';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { HandoverCompletionView } from '@/components/handovers/HandoverCompletionView';
import { OutgoingAchievements } from '@/components/dashboard/OutgoingAchievements';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTemplates } from '@/hooks/useDatabase';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedHandoverId, setSelectedHandoverId] = useState<string | null>(null);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  
  const { 
    templates, 
    createTemplate, 
    updateTemplate, 
    deleteTemplate 
  } = useTemplates();

  const handleNavigation = (page: string, handoverId?: string) => {
    setCurrentPage(page);
    if (handoverId) {
      setSelectedHandoverId(handoverId);
    }
  };

  const handleCreateTemplate = async (template: any) => {
    try {
      await createTemplate(template);
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleUpdateTemplate = async (updatedTemplate: any) => {
    try {
      await updateTemplate(updatedTemplate.id, updatedTemplate);
    } catch (error) {
      console.error('Error updating template:', error);
    }
  };

  const handleDuplicateTemplate = async (template: any) => {
    try {
      const duplicatedTemplate = {
        ...template,
        name: `${template.name} (Copia)`,
        sections: template.sections
      };
      await createTemplate(duplicatedTemplate);
    } catch (error) {
      console.error('Error duplicating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    try {
      await deleteTemplate(templateId);
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleHandoverCreated = (handover: any) => {
    console.log('Handover created:', handover);
  };

  // Determina quale sidebar usare in base al ruolo
  const renderSidebar = () => {
    if (user?.role === 'outgoing') {
      return (
        <OutgoingSidebar 
          onNavigate={handleNavigation}
          currentPage={currentPage}
        />
      );
    }
    
    if (user?.role === 'incoming') {
      return (
        <IncomingSidebar 
          onNavigate={handleNavigation}
          currentPage={currentPage}
        />
      );
    }
    
    // Default per admin
    return (
      <DashboardSidebar 
        onNavigate={handleNavigation}
        currentPage={currentPage}
      />
    );
  };

  const renderContent = () => {
    // Contenuti specifici per dipendente uscente
    if (user?.role === 'outgoing') {
      switch (currentPage) {
        case 'handover-completion':
          return (
            <HandoverCompletionView
              handoverId={selectedHandoverId || '1'}
              onNavigate={handleNavigation}
            />
          );
        case 'achievements':
          return <OutgoingAchievements onNavigate={handleNavigation} />;
        case 'handovers':
          return <DashboardContent onNavigate={handleNavigation} />;
        case 'profile':
          return (
            <div className="flex-1 bg-gray-50 overflow-auto p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilo</h1>
              <p className="text-gray-600">Gestisci le tue informazioni personali</p>
            </div>
          );
        default:
          return <DashboardContent onNavigate={handleNavigation} />;
      }
    }

    // Contenuti specifici per dipendente entrante
    if (user?.role === 'incoming') {
      switch (currentPage) {
        case 'handovers':
          return <DashboardContent onNavigate={handleNavigation} />;
        case 'chat':
          return (
            <div className="flex-1 bg-gray-50 overflow-auto p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat AI</h1>
              <p className="text-gray-600">Cronologia delle tue conversazioni con l'AI Assistant</p>
            </div>
          );
        case 'knowledge':
          return (
            <div className="flex-1 bg-gray-50 overflow-auto p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Hub</h1>
              <p className="text-gray-600">Le tue note, bookmark e risorse salvate</p>
            </div>
          );
        case 'quick-access':
          return (
            <div className="flex-1 bg-gray-50 overflow-auto p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Access</h1>
              <p className="text-gray-600">Contatti, tool e task urgenti sempre a portata di mano</p>
            </div>
          );
        case 'profile':
          return (
            <div className="flex-1 bg-gray-50 overflow-auto p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Profilo</h1>
              <p className="text-gray-600">Gestisci le tue informazioni personali</p>
            </div>
          );
        default:
          return <DashboardContent onNavigate={handleNavigation} />;
      }
    }

    // Contenuti per admin (esistenti)
    switch (currentPage) {
      case 'templates':
        return (
          <div className="flex-1 bg-gray-50 overflow-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Gestione Template
                  </h1>
                  <p className="text-gray-600">
                    Crea e gestisci i template per gli handover
                  </p>
                </div>
                
                <Button 
                  className="bg-exitloop-purple hover:bg-exitloop-purple/90 gap-2"
                  onClick={() => setIsCreateTemplateOpen(true)}
                >
                  <Plus size={16} />
                  Nuovo Template
                </Button>
              </div>

              <TemplateList
                templates={templates}
                onEdit={() => {}}
                onDuplicate={handleDuplicateTemplate}
                onDelete={handleDeleteTemplate}
                onHandoverCreated={handleHandoverCreated}
                onTemplateCreated={handleCreateTemplate}
                onTemplateUpdated={handleUpdateTemplate}
              />
            </div>
          </div>
        );
      
      case 'handovers':
        return (
          <div className="flex-1 bg-gray-50 overflow-auto p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestione Handover</h1>
            <p className="text-gray-600">Visualizza e gestisci tutti gli handover</p>
          </div>
        );
      
      case 'search':
        return (
          <div className="flex-1 bg-gray-50 overflow-auto p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ricerca</h1>
            <p className="text-gray-600">Cerca tra handover, template e utenti</p>
          </div>
        );
      
      default:
        return <DashboardContent onNavigate={handleNavigation} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        {renderSidebar()}
        {renderContent()}
        
        <CreateTemplateModal
          isOpen={isCreateTemplateOpen}
          onClose={() => setIsCreateTemplateOpen(false)}
          onSave={handleCreateTemplate}
        />
      </div>
    </TooltipProvider>
  );
};

export default Dashboard;