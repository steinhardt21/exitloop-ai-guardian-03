import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CalendarIcon, 
  Mail, 
  User, 
  FileText, 
  Send,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink
} from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';

interface Template {
  id: string;
  name: string;
  sections: any[];
  created_at: string;
  created_by: string;
  usage_count?: number;
}

interface CreateHandoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  onHandoverCreated: (handover: any) => void;
}

export const CreateHandoverModal: React.FC<CreateHandoverModalProps> = ({
  isOpen,
  onClose,
  template,
  onHandoverCreated
}) => {
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [dueDate, setDueDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [inviteUrl, setInviteUrl] = useState('');

  const validateForm = () => {
    if (!personName.trim()) {
      toast.error('Il nome della persona è obbligatorio');
      return false;
    }

    if (!personEmail.trim()) {
      toast.error('L\'email è obbligatoria');
      return false;
    }

    // Validazione email base
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personEmail)) {
      toast.error('Inserisci un indirizzo email valido');
      return false;
    }

    if (!dueDate) {
      toast.error('Seleziona una data di scadenza');
      return false;
    }

    if (dueDate < new Date()) {
      toast.error('La data di scadenza non può essere nel passato');
      return false;
    }

    return true;
  };

  const handleCreateHandover = async () => {
    if (!validateForm() || !template) return;

    setIsLoading(true);

    try {
      // Simula creazione handover e invio email
      await new Promise(resolve => setTimeout(resolve, 2000));

      const invitationToken = `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const baseUrl = window.location.origin;
      const generatedInviteUrl = `${baseUrl}/invite?token=${invitationToken}`;

      const newHandover = {
        id: Math.random().toString(36).substr(2, 9),
        title: `${template.name} - ${personName}`,
        employee: personName,
        email: personEmail,
        templateId: template.id,
        templateName: template.name,
        status: 'pending',
        completion: 0,
        dueDate: dueDate.toISOString(),
        createdAt: new Date().toISOString(),
        inviteToken: invitationToken,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${personEmail}`
      };

      setInviteUrl(generatedInviteUrl);
      onHandoverCreated(newHandover);
      setShowSuccess(true);

      // Mostra successo per 5 secondi poi chiude
      setTimeout(() => {
        handleClose();
      }, 5000);

    } catch (error) {
      toast.error('Errore durante la creazione dell\'handover');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPersonName('');
    setPersonEmail('');
    setDueDate(undefined);
    setIsLoading(false);
    setShowSuccess(false);
    setInviteUrl('');
    onClose();
  };

  const handleCopyInviteUrl = () => {
    navigator.clipboard.writeText(inviteUrl);
    toast.success('Link di invito copiato negli appunti!');
  };

  const handleOpenInviteUrl = () => {
    window.open(inviteUrl, '_blank');
  };

  const getTotalQuestions = (template: Template) => {
    return template?.sections.reduce((total, section) => 
      total + (section.questions?.length || 0), 0
    ) || 0;
  };

  if (showSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Handover Creato!
            </h3>
            <p className="text-gray-600 mb-4">
              L'invito è stato creato con successo per <strong>{personName}</strong>
            </p>
            
            {/* Link di invito */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">Link di Invito</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyInviteUrl}
                    className="gap-1"
                  >
                    <Copy size={14} />
                    Copia
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenInviteUrl}
                    className="gap-1"
                  >
                    <ExternalLink size={14} />
                    Apri
                  </Button>
                </div>
              </div>
              <div className="bg-white p-2 rounded border text-xs font-mono text-gray-700 break-all">
                {inviteUrl}
              </div>
              <p className="text-xs text-blue-700 mt-2">
                💡 In produzione, questo link verrebbe inviato automaticamente via email
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                📧 Email di invito inviata a: <strong>{personEmail}</strong>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText size={20} className="text-exitloop-purple" />
            Crea Nuovo Handover
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Template Info */}
          {template && (
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Template: {template.name}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{template.sections.length} sezioni</span>
                      <span>{getTotalQuestions(template)} domande</span>
                    </div>
                  </div>
                  <Badge className="bg-exitloop-purple hover:bg-exitloop-purple">
                    Template Selezionato
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome Persona */}
            <div className="space-y-2">
              <Label htmlFor="personName" className="flex items-center gap-2">
                <User size={16} />
                Nome della Persona *
              </Label>
              <Input
                id="personName"
                placeholder="es. Marco Rossi"
                value={personName}
                onChange={(e) => setPersonName(e.target.value)}
                className="text-base"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="personEmail" className="flex items-center gap-2">
                <Mail size={16} />
                Email *
              </Label>
              <Input
                id="personEmail"
                type="email"
                placeholder="marco.rossi@azienda.com"
                value={personEmail}
                onChange={(e) => setPersonEmail(e.target.value)}
                className="text-base"
              />
            </div>
          </div>

          {/* Data Scadenza */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock size={16} />
              Data di Scadenza *
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? (
                    format(dueDate, "PPP", { locale: it })
                  ) : (
                    "Seleziona una data"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <p className="text-sm text-muted-foreground">
              Entro quando la persona deve completare l'handover
            </p>
          </div>

          {/* Preview Info */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Cosa succederà dopo la creazione:
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-exitloop-purple rounded-full"></div>
                  L'handover verrà creato e apparirà nella dashboard
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-exitloop-purple rounded-full"></div>
                  Verrà generato un link di invito per {personName || 'la persona'}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-exitloop-purple rounded-full"></div>
                  La persona potrà registrarsi e accedere fino al {dueDate ? format(dueDate, "dd/MM/yyyy") : '[data selezionata]'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {template && (
              <>Template: {template.name} • {getTotalQuestions(template)} domande</>
            )}
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleClose}>
              Annulla
            </Button>
            <Button 
              onClick={handleCreateHandover} 
              disabled={isLoading}
              className="bg-exitloop-purple hover:bg-exitloop-purple/90 gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creazione in corso...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Crea Handover e Genera Invito
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};