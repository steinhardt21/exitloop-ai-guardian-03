import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, FileText, BookTemplate as Template, Plus, Eye, CheckCircle, Bot, Mail, Edit, UserPlus, Search, Filter, Download, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreateTemplateModal } from '@/components/templates/CreateTemplateModal';
import { TemplateList } from '@/components/templates/TemplateList';
import { HandoverDetailsModal } from '@/components/handovers/HandoverDetailsModal';
import { toast } from '@/components/ui/sonner';

export const AdminDashboard: React.FC = () => {
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);
  const [showTemplateList, setShowTemplateList] = useState(false);
  const [selectedHandover, setSelectedHandover] = useState<any>(null);
  const [isHandoverDetailsOpen, setIsHandoverDetailsOpen] = useState(false);
  
  const [templates, setTemplates] = useState([
    {
      id: '1',
      name: 'CTO Handover',
      sections: [
        { title: 'Responsabilità Tecniche', questions: ['Quali sono le principali responsabilità tecniche?', 'Chi sono i referenti tecnici chiave?'] },
        { title: 'Progetti in Corso', questions: ['Quali progetti sono attualmente in sviluppo?'] }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      createdBy: 'Admin',
      usageCount: 5
    },
    {
      id: '2',
      name: 'Marketing Manager',
      sections: [
        { title: 'Campagne Attive', questions: ['Quali campagne sono attualmente attive?'] },
        { title: 'Tool e Processi', questions: ['Quali tool utilizzi quotidianamente?'] }
      ],
      createdAt: '2024-01-10T14:30:00Z',
      createdBy: 'Admin',
      usageCount: 3
    }
  ]);

  const [handovers, setHandovers] = useState([
    {
      id: 1,
      title: "Passaggio CTO - Marco Rossi",
      employee: "Marco Rossi",
      email: "marco.rossi@azienda.com",
      status: "in-progress",
      completion: 75,
      dueDate: "2024-02-15T00:00:00Z",
      createdAt: "2024-01-15T10:00:00Z",
      templateName: "CTO Handover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marco"
    },
    {
      id: 2,
      title: "Handover Marketing Manager",
      employee: "Laura Bianchi",
      email: "laura.bianchi@azienda.com",
      status: "completed",
      completion: 100,
      dueDate: "2024-01-30T00:00:00Z",
      createdAt: "2024-01-10T14:30:00Z",
      templateName: "Marketing Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=laura"
    },
    {
      id: 3,
      title: "Sviluppatore Senior Frontend",
      employee: "Andrea Verdi",
      email: "andrea.verdi@azienda.com",
      status: "pending",
      completion: 45,
      dueDate: "2024-02-20T00:00:00Z",
      createdAt: "2024-01-20T09:15:00Z",
      templateName: "Developer Senior",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=andrea"
    },
    {
      id: 4,
      title: "Responsabile Vendite Nord",
      employee: "Giulia Neri",
      email: "giulia.neri@azienda.com",
      status: "in-progress",
      completion: 60,
      dueDate: "2024-02-10T00:00:00Z",
      createdAt: "2024-01-18T11:20:00Z",
      templateName: "Sales Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=giulia"
    },
    {
      id: 5,
      title: "Project Manager Digital",
      employee: "Luca Ferrari",
      email: "luca.ferrari@azienda.com",
      status: "completed",
      completion: 100,
      dueDate: "2024-01-25T00:00:00Z",
      createdAt: "2024-01-05T16:45:00Z",
      templateName: "Project Manager",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=luca"
    }
  ]);

  // Mock data per la dashboard
  const stats = {
    users: {
      total: 127,
      admin: 3,
      outgoing: 15,
      incoming: 109
    },
    handovers: {
      total: handovers.length,
      inProgress: handovers.filter(h => h.status === 'in-progress').length,
      completed: handovers.filter(h => h.status === 'completed').length,
      pending: handovers.filter(h => h.status === 'pending').length
    },
    templates: templates.length
  };

  const users = [
    {
      id: 1,
      name: "Marco Rossi",
      email: "marco.rossi@azienda.com",
      role: "outgoing",
      inviteStatus: "completed",
      template: "CTO Handover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marco"
    },
    {
      id: 2,
      name: "Sofia Colombo",
      email: "sofia.colombo@azienda.com",
      role: "incoming",
      inviteStatus: "registered",
      template: "Manager Onboarding",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia"
    },
    {
      id: 3,
      name: "Alessandro Bruno",
      email: "alessandro.bruno@azienda.com",
      role: "admin",
      inviteStatus: "completed",
      template: "-",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alessandro"
    },
    {
      id: 4,
      name: "Francesca Ricci",
      email: "francesca.ricci@azienda.com",
      role: "incoming",
      inviteStatus: "invited",
      template: "Developer Onboarding",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=francesca"
    },
    {
      id: 5,
      name: "Matteo Greco",
      email: "matteo.greco@azienda.com",
      role: "outgoing",
      inviteStatus: "registered",
      template: "Sales Handover",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=matteo"
    }
  ];

  const handleCreateTemplate = (template: any) => {
    setTemplates([...templates, template]);
    toast.success(`Template "${template.name}" creato con successo!`);
  };

  const handleEditTemplate = (template: any) => {
    // Per ora mostra solo un messaggio, in futuro aprirà il modal di modifica
    toast.info(`Modifica template: ${template.name}`);
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

  const handleHandoverCreated = (newHandover: any) => {
    setHandovers([newHandover, ...handovers]);
    toast.success(`Invito inviato a ${newHandover.employee}`, {
      description: `L'handover "${newHandover.title}" è stato creato e l'invito è stato inviato via email.`
    });
  };

  const handleViewHandoverDetails = (handover: any) => {
    setSelectedHandover(handover);
    setIsHandoverDetailsOpen(true);
  };

  const handleAIAnalysis = (handover: any) => {
    toast.info(`Avvio analisi AI per: ${handover.title}`, {
      description: "L'analisi AI valuterà la qualità delle risposte fornite."
    });
    // In futuro questo aprirà direttamente il tab di analisi AI
    handleViewHandoverDetails(handover);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="outline" className="border-orange-200 text-orange-800">In corso</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completato</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-red-200 text-red-800">Da approvare</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-exitloop-purple hover:bg-exitloop-purple/90">Admin</Badge>;
      case 'outgoing':
        return <Badge variant="outline" className="border-red-200 text-red-800">Uscente</Badge>;
      case 'incoming':
        return <Badge variant="outline" className="border-green-200 text-green-800">Entrante</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getInviteStatusBadge = (status: string) => {
    switch (status) {
      case 'invited':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">Invitato</Badge>;
      case 'registered':
        return <Badge variant="outline" className="border-yellow-200 text-yellow-800">Registrato</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completato</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (showTemplateList) {
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
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowTemplateList(false)}
              >
                Torna alla Dashboard
              </Button>
              <Button 
                className="bg-exitloop-purple hover:bg-exitloop-purple/90 gap-2"
                onClick={() => setIsCreateTemplateOpen(true)}
              >
                <Plus size={16} />
                Nuovo Template
              </Button>
            </div>
          </div>

          <TemplateList
            templates={templates}
            onEdit={handleEditTemplate}
            onDuplicate={handleDuplicateTemplate}
            onDelete={handleDeleteTemplate}
            onHandoverCreated={handleHandoverCreated}
          />

          <CreateTemplateModal
            isOpen={isCreateTemplateOpen}
            onClose={() => setIsCreateTemplateOpen(false)}
            onSave={handleCreateTemplate}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Amministratore
            </h1>
            <p className="text-gray-600">
              Gestisci utenti, handover e template della piattaforma
            </p>
          </div>
          
          {/* Azioni rapide - MODIFICATO: Rinominato pulsante e rimosso Explore Template */}
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <UserPlus size={16} />
              Invita Utente
            </Button>
            <Button 
              className="bg-exitloop-purple hover:bg-exitloop-purple/90 gap-2"
              onClick={() => setShowTemplateList(true)}
            >
              <Plus size={16} />
              Crea nuovo Handover
            </Button>
          </div>
        </div>

        {/* Indicatori sintetici */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utenti</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users.total}</div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{stats.users.admin} Admin</span>
                <span>{stats.users.outgoing} Uscenti</span>
                <span>{stats.users.incoming} Entranti</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Handover</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.handovers.total}</div>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{stats.handovers.inProgress} In corso</span>
                <span>{stats.handovers.completed} Completati</span>
                <span>{stats.handovers.pending} Da approvare</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Template</CardTitle>
              <Template className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.templates}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Template disponibili
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sezione Handover */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Handover Attivi</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Search size={14} />
                  Cerca
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={14} />
                  Filtra
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download size={14} />
                  Esporta
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Handover</TableHead>
                  <TableHead>Dipendente</TableHead>
                  <TableHead>Stato</TableHead>
                  <TableHead>Completamento</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {handovers.map((handover) => (
                  <TableRow key={handover.id}>
                    <TableCell>
                      <div className="font-medium">{handover.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={handover.avatar} />
                          <AvatarFallback>{handover.employee.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{handover.employee}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(handover.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={handover.completion} className="w-16" />
                        <span className="text-sm text-muted-foreground">
                          {handover.completion}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleViewHandoverDetails(handover)}
                        >
                          <Eye size={14} />
                          Dettagli
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => handleAIAnalysis(handover)}
                        >
                          <Bot size={14} />
                          Analisi AI
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sezione Utenti */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Gestione Utenti</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Search size={14} />
                  Cerca
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter size={14} />
                  Filtra
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download size={14} />
                  Esporta
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utente</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ruolo</TableHead>
                  <TableHead>Stato Invito</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead className="text-right">Azioni</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getInviteStatusBadge(user.inviteStatus)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.template}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {user.inviteStatus === 'invited' && (
                          <Button variant="outline" size="sm" className="gap-1">
                            <Mail size={14} />
                            Reinvia
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="gap-1">
                          <Edit size={14} />
                          Modifica
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal size={14} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Visualizza profilo</DropdownMenuItem>
                            <DropdownMenuItem>Cambia ruolo</DropdownMenuItem>
                            <DropdownMenuItem>Assegna template</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              Disattiva utente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <CreateTemplateModal
          isOpen={isCreateTemplateOpen}
          onClose={() => setIsCreateTemplateOpen(false)}
          onSave={handleCreateTemplate}
        />

        <HandoverDetailsModal
          isOpen={isHandoverDetailsOpen}
          onClose={() => setIsHandoverDetailsOpen(false)}
          handover={selectedHandover}
        />
      </div>
    </div>
  );
};