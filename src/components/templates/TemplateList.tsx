import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Edit, 
  Copy, 
  Trash2, 
  Users, 
  Calendar,
  MoreHorizontal,
  Plus,
  UserPlus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateHandoverModal } from '@/components/handovers/CreateHandoverModal';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';

interface Template {
  id: string;
  name: string;
  sections: any[];
  createdAt: string;
  createdBy: string;
  usageCount?: number;
}

interface TemplateListProps {
  templates: Template[];
  onEdit: (template: Template) => void;
  onDuplicate: (template: Template) => void;
  onDelete: (templateId: string) => void;
  onHandoverCreated?: (handover: any) => void;
  onTemplateCreated?: (template: Template) => void;
  onTemplateUpdated?: (template: Template) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDuplicate,
  onDelete,
  onHandoverCreated,
  onTemplateCreated,
  onTemplateUpdated
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isCreateHandoverOpen, setIsCreateHandoverOpen] = useState(false);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getTotalQuestions = (template: Template) => {
    return template.sections.reduce((total, section) => 
      total + (section.questions?.length || 0), 0
    );
  };

  const handleCreateHandover = (template: Template) => {
    setSelectedTemplate(template);
    setIsCreateHandoverOpen(true);
  };

  const handleHandoverCreated = (handover: any) => {
    if (onHandoverCreated) {
      onHandoverCreated(handover);
    }
    setIsCreateHandoverOpen(false);
    setSelectedTemplate(null);
  };

  const handleCreateNewTemplate = () => {
    setEditingTemplate(null);
    setIsCreateTemplateOpen(true);
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setIsCreateTemplateOpen(true);
  };

  const handleTemplateCreated = (template: Template) => {
    if (onTemplateCreated) {
      onTemplateCreated(template);
    }
    setIsCreateTemplateOpen(false);
    setEditingTemplate(null);
  };

  const handleTemplateUpdated = (template: Template) => {
    if (onTemplateUpdated) {
      onTemplateUpdated(template);
    }
    setIsCreateTemplateOpen(false);
    setEditingTemplate(null);
  };

  // Card speciale per creare nuovo template
  const CreateTemplateCard = () => (
    <Card 
      className="border-dashed border-2 border-exitloop-purple/30 hover:border-exitloop-purple/50 transition-colors cursor-pointer bg-exitloop-purple/5 hover:bg-exitloop-purple/10"
      onClick={handleCreateNewTemplate}
    >
      <CardContent className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-exitloop-purple/20 rounded-full flex items-center justify-center mb-4">
          <Plus size={32} className="text-exitloop-purple" />
        </div>
        <h4 className="text-lg font-semibold text-exitloop-purple mb-2">
          Crea un nuovo Template
        </h4>
        <p className="text-gray-600 text-sm">
          Aggiungi un nuovo template per i tuoi handover
        </p>
      </CardContent>
    </Card>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card per creare nuovo template */}
        <CreateTemplateCard />
        
        {/* Template esistenti */}
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <FileText size={14} />
                      {template.sections.length} sezioni
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      {getTotalQuestions(template)} domande
                    </div>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCreateHandover(template)}>
                      <UserPlus size={14} className="mr-2" />
                      Crea Handover
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEditTemplate(template)}>
                      <Edit size={14} className="mr-2" />
                      Modifica
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(template)}>
                      <Copy size={14} className="mr-2" />
                      Duplica
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(template.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={14} className="mr-2" />
                      Elimina
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Utilizzi:</span>
                  <Badge variant="outline">
                    {template.usageCount || 0} volte
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Creato:</span>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(template.createdAt)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Autore:</span>
                  <span className="font-medium">{template.createdBy}</span>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <Button 
                    className="w-full gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                    onClick={() => handleCreateHandover(template)}
                  >
                    <Plus size={14} />
                    Crea Nuovo Handover
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={() => handleEditTemplate(template)}
                  >
                    <Edit size={14} />
                    Modifica Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal per creare handover */}
      <CreateHandoverModal
        isOpen={isCreateHandoverOpen}
        onClose={() => {
          setIsCreateHandoverOpen(false);
          setSelectedTemplate(null);
        }}
        template={selectedTemplate}
        onHandoverCreated={handleHandoverCreated}
      />

      {/* Modal per creare/modificare template */}
      <CreateTemplateModal
        isOpen={isCreateTemplateOpen}
        onClose={() => {
          setIsCreateTemplateOpen(false);
          setEditingTemplate(null);
        }}
        template={editingTemplate}
        onSave={editingTemplate ? handleTemplateUpdated : handleTemplateCreated}
      />
    </>
  );
};