import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  ChevronRight, 
  ChevronDown as ChevronDownIcon,
  Save,
  X,
  FileText,
  HelpCircle
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/sonner';

interface Question {
  id: string;
  text: string;
}

interface Section {
  id: string;
  title: string;
  questions: Question[];
  isOpen: boolean;
}

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: any) => void;
}

export const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [templateName, setTemplateName] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addSection = () => {
    const newSection: Section = {
      id: generateId(),
      title: '',
      questions: [{ id: generateId(), text: '' }],
      isOpen: true
    };
    setSections([...sections, newSection]);
  };

  const updateSectionTitle = (sectionId: string, title: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, title } : section
    ));
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const moveSectionUp = (sectionId: string) => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index > 0) {
      const newSections = [...sections];
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
      setSections(newSections);
    }
  };

  const moveSectionDown = (sectionId: string) => {
    const index = sections.findIndex(s => s.id === sectionId);
    if (index < sections.length - 1) {
      const newSections = [...sections];
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
      setSections(newSections);
    }
  };

  const addQuestion = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { 
            ...section, 
            questions: [...section.questions, { id: generateId(), text: '' }]
          }
        : section
    ));
  };

  const updateQuestion = (sectionId: string, questionId: string, text: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            questions: section.questions.map(question =>
              question.id === questionId ? { ...question, text } : question
            )
          }
        : section
    ));
  };

  const removeQuestion = (sectionId: string, questionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            questions: section.questions.filter(question => question.id !== questionId)
          }
        : section
    ));
  };

  const validateTemplate = () => {
    if (!templateName.trim()) {
      toast.error('Il nome del template è obbligatorio');
      return false;
    }

    if (sections.length === 0) {
      toast.error('Aggiungi almeno una sezione al template');
      return false;
    }

    const hasValidSection = sections.some(section => 
      section.title.trim() && section.questions.some(q => q.text.trim())
    );

    if (!hasValidSection) {
      toast.error('Ogni sezione deve avere un titolo e almeno una domanda');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateTemplate()) return;

    setIsLoading(true);
    
    try {
      // Simula salvataggio
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const template = {
        id: generateId(),
        name: templateName,
        sections: sections.filter(section => 
          section.title.trim() && section.questions.some(q => q.text.trim())
        ).map(section => ({
          ...section,
          questions: section.questions.filter(q => q.text.trim())
        })),
        createdAt: new Date().toISOString(),
        createdBy: 'Admin'
      };

      onSave(template);
      toast.success('Template creato con successo!');
      handleClose();
    } catch (error) {
      toast.error('Errore durante il salvataggio del template');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTemplateName('');
    setSections([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={20} className="text-exitloop-purple" />
            Crea Nuovo Template
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Nome Template */}
          <div className="space-y-2">
            <Label htmlFor="templateName">Nome del Template / Ruolo *</Label>
            <Input
              id="templateName"
              placeholder="es. Responsabile Marketing, CTO, Developer Senior..."
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="text-lg"
            />
            <p className="text-sm text-muted-foreground">
              Inserisci il nome del ruolo o una descrizione del template
            </p>
          </div>

          {/* Sezioni */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Sezioni del Template</h3>
              <Button onClick={addSection} className="gap-2">
                <Plus size={16} />
                Aggiungi Sezione
              </Button>
            </div>

            {sections.length === 0 ? (
              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <HelpCircle size={48} className="text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-600 mb-2">
                    Nessuna sezione aggiunta
                  </h4>
                  <p className="text-gray-500 mb-4">
                    Inizia creando la prima sezione del tuo template
                  </p>
                  <Button onClick={addSection} className="gap-2">
                    <Plus size={16} />
                    Crea Prima Sezione
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sections.map((section, index) => (
                  <Card key={section.id} className="border-l-4 border-l-exitloop-purple">
                    <Collapsible open={section.isOpen} onOpenChange={() => toggleSection(section.id)}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-1">
                                {section.isOpen ? (
                                  <ChevronDownIcon size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            
                            <div className="flex-1">
                              <Input
                                placeholder="Titolo della sezione (es. Tool & Processi, Responsabilità, Contatti...)"
                                value={section.title}
                                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                                className="font-medium"
                              />
                            </div>

                            <Badge variant="outline" className="ml-2">
                              {section.questions.filter(q => q.text.trim()).length} domande
                            </Badge>
                          </div>

                          <div className="flex items-center gap-1 ml-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSectionUp(section.id)}
                              disabled={index === 0}
                              className="p-1"
                            >
                              <ChevronUp size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => moveSectionDown(section.id)}
                              disabled={index === sections.length - 1}
                              className="p-1"
                            >
                              <ChevronDown size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSection(section.id)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-sm font-medium">Domande</Label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => addQuestion(section.id)}
                                className="gap-1"
                              >
                                <Plus size={14} />
                                Aggiungi Domanda
                              </Button>
                            </div>

                            {section.questions.map((question, qIndex) => (
                              <div key={question.id} className="flex gap-2">
                                <div className="flex-1">
                                  <Textarea
                                    placeholder={`Domanda ${qIndex + 1} (es. Quali sono i tool principali che utilizzi?)`}
                                    value={question.text}
                                    onChange={(e) => updateQuestion(section.id, question.id, e.target.value)}
                                    className="min-h-[80px]"
                                  />
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQuestion(section.id, question.id)}
                                  disabled={section.questions.length === 1}
                                  className="p-2 text-red-600 hover:text-red-700 self-start mt-1"
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            ))}

                            {section.questions.length === 0 && (
                              <div className="text-center py-4 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                                Nessuna domanda aggiunta
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {sections.length > 0 && (
              <>
                {sections.length} sezioni • {' '}
                {sections.reduce((total, section) => 
                  total + section.questions.filter(q => q.text.trim()).length, 0
                )} domande totali
              </>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose}>
              Annulla
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="bg-exitloop-purple hover:bg-exitloop-purple/90 gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Salva Template
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};