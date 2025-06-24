import React from 'react';
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
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDuplicate,
  onDelete
}) => {
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

  if (templates.length === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-300">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <FileText size={48} className="text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-600 mb-2">
            Nessun template disponibile
          </h4>
          <p className="text-gray-500">
            I template creati appariranno qui
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <DropdownMenuItem onClick={() => onEdit(template)}>
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

              <div className="pt-3 border-t">
                <Button 
                  variant="outline" 
                  className="w-full gap-2"
                  onClick={() => onEdit(template)}
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
  );
};