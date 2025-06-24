import React, { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { TemplateList } from '@/components/templates/TemplateList';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const Dashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'CTO Handover',
      sections: [
        { 
          id: 'sec1',
          title: 'Responsabilità Tecniche', 
          questions: [
            { id: 'q1', text: 'Quali sono le principali responsabilità tecniche?' },
            { id: 'q2', text: 'Chi sono i referenti tecnici chiave?' }
          ]
        },
        { 
          id: 'sec2',
          title: 'Progetti in Corso', 
          questions: [
            { id: 'q3', text: 'Quali progetti sono attualmente in sviluppo?' }
          ]
        }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Admin',
      usageCount: 5
    },
    {
      id: '2',
      name: 'Marketing Manager',
      sections: [
        { 
          id: 'sec3',
          title: 'Campagne Attive', 
          questions: [
            { id: 'q4', text: 'Quali campagne sono attualmente attive?' }
          ]
        },
        { 
          id: 'sec4',
          title: 'Tool e Processi', 
          questions: [
            { id: 'q5', text: 'Quali tool utilizzi quotidianamente?' }
          ]
        }
      ],
      createdAt: '2024-01-10T14:30:00Z',
      createdBy: 'Admin',
      usageCount: 3
    },
    {
      id: '3',
      name: 'Developer Senior',
      sections: [
        { 
          id: 'sec5',
          title: 'Codice e Repository', 
          questions: [
            { id: 'q6', text: 'Quali sono i repository principali?' },
            { id: 'q7', text: 'Dove si trova la documentazione tecnica?' }
          ]
        },
        { 
          id: 'sec6',
          title: 'Deployment', 
          questions: [
            { id: 'q8', text: 'Come funziona il processo di deploy?' }
          ]
        }
      ],
      createdAt: '2024-01-08T09:15:00Z',
      createdBy: 'Admin',
      usageCount: 8
    }
  ]);

  const handleCreateTemplate = (template: any) => {
    const newTemplate = {
      ...template,
      usageCount: 0
    };
    setTemplates([...templates, newTemplate]);
    toast.success(`Template "${template.name}" creato con successo!`);
  };

  const handleEditTemplate = (template: any) => {
    // Questa funzione ora viene gestita direttamente dal TemplateList
    // tramite il modal di modifica
  };

  const handleUpdateTemplate = (updatedTemplate: any) => {
    setTemplates(templates.map(t => 
      t.id === updatedTemplate.id ? updatedTemplate : t
    ));
    toast.success(`Template "${updatedTemplate.name}" modificato con successo!`);
  };

  const handleDuplicateTemplate = (template: any) => {
    const duplicatedTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      name: `${template.name} (Copia)`,
      createdAt: new Date().toISOString(),
      usageCount: 0
    };
    setTemplates([...templates, duplicatedTemplate]);
    toast.success(`Template "${template.name}" duplicato con successo!`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    setTemplates(templates.filter(t => t.id !== templateId));
    toast.success(`Template "${template?.name}" eliminato con successo!`);
  };

  const handleHandoverCreated = (handover: any) => {
    toast.success(`Invito inviato a ${handover.employee}`, {
      description: `L'handover "${handover.title}" è stato creato e l'invito è stato inviato via email.`
    });
  };

  const renderContent = () => {
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
                onEdit={handleEditTemplate}
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
        return <DashboardContent />;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar 
          onNavigate={setCurrentPage}
          currentPage={currentPage}
        />
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