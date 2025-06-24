import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  MessageSquare,
  FileText,
  Search,
  Bookmark,
  Clock,
  Users,
  Wrench,
  AlertTriangle,
  ChevronRight,
  Bot,
  Eye,
  Download,
  Star
} from 'lucide-react';
import { AIAssistantModal } from '@/components/incoming/AIAssistantModal';
import { HandoverViewModal } from '@/components/incoming/HandoverViewModal';
import { toast } from '@/components/ui/sonner';

export const IncomingDashboard: React.FC = () => {
  const [selectedHandover, setSelectedHandover] = useState<any>(null);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Mock data per handover ricevuti
  const receivedHandovers = [
    {
      id: '1',
      title: 'Sales Manager Handover',
      previousEmployee: 'Marco Rossi',
      role: 'Sales Manager',
      completedAt: '2024-01-28T16:45:00Z',
      status: 'available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
      keyInsights: {
        projects: 8,
        contacts: 24,
        tools: 6,
        urgentTasks: 3
      },
      lastAccessed: '2024-01-30T10:15:00Z',
      sections: [
        {
          id: 'clients',
          title: 'Clienti Principali',
          content: 'I clienti più importanti sono TechCorp (€500k/anno), InnovateLab (€300k/anno) e StartupHub (€200k/anno). TechCorp ha un contratto in scadenza a marzo che va rinnovato urgentemente.'
        },
        {
          id: 'pipeline',
          title: 'Pipeline Vendite',
          content: 'Abbiamo 12 deal attivi per un valore totale di €2.1M. I più caldi sono: DataFlow (€400k, chiusura prevista febbraio), CloudSys (€300k, in negoziazione), AutoTech (€250k, demo schedulata).'
        },
        {
          id: 'tools',
          title: 'Tool e Processi',
          content: 'Utilizziamo Salesforce per CRM, HubSpot per marketing automation, Zoom per demo, DocuSign per contratti. Il processo di vendita prevede: Lead → Qualifica → Demo → Proposta → Negoziazione → Chiusura.'
        }
      ]
    },
    {
      id: '2',
      title: 'Product Manager Handover',
      previousEmployee: 'Sofia Colombo',
      role: 'Product Manager',
      completedAt: '2024-01-25T14:30:00Z',
      status: 'available',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
      keyInsights: {
        projects: 5,
        contacts: 18,
        tools: 8,
        urgentTasks: 2
      },
      lastAccessed: '2024-01-29T15:20:00Z',
      sections: [
        {
          id: 'roadmap',
          title: 'Product Roadmap',
          content: 'Q1 2024: Lancio feature AI Assistant, miglioramenti UX dashboard. Q2: Integrazione Slack, mobile app. Q3: Analytics avanzati, API pubbliche.'
        },
        {
          id: 'metrics',
          title: 'Metriche Chiave',
          content: 'MAU: 15,000 (+12% MoM), Retention D7: 68%, Churn rate: 3.2%, NPS: 42. Obiettivo Q1: raggiungere 18,000 MAU e NPS 50+.'
        },
        {
          id: 'team',
          title: 'Team e Stakeholder',
          content: 'Team: 3 developers, 1 designer, 1 QA. Stakeholder chiave: CEO (vision), CTO (tech feasibility), Sales (customer feedback). Weekly sync ogni martedì.'
        }
      ]
    },
    {
      id: '3',
      title: 'Operations Lead Handover',
      previousEmployee: 'Luca Verdi',
      role: 'Operations Lead',
      completedAt: '2024-01-20T11:00:00Z',
      status: 'processing',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=luca',
      keyInsights: {
        projects: 12,
        contacts: 35,
        tools: 10,
        urgentTasks: 5
      },
      lastAccessed: null,
      sections: []
    }
  ];

  // Mock data per accessi recenti
  const recentChats = [
    {
      id: '1',
      handoverTitle: 'Sales Manager Handover',
      lastQuestion: 'Quali sono i clienti con contratti in scadenza?',
      timestamp: '2024-01-30T10:15:00Z'
    },
    {
      id: '2',
      handoverTitle: 'Product Manager Handover',
      lastQuestion: 'Come funziona il processo di release?',
      timestamp: '2024-01-29T15:20:00Z'
    }
  ];

  // Mock data per quick access
  const quickAccess = {
    urgentContacts: [
      { name: 'Marco Rossi', role: 'Ex Sales Manager', phone: '+39 333 1234567', when: 'Per emergenze clienti' },
      { name: 'Anna Bianchi', role: 'CEO', phone: '+39 333 7654321', when: 'Decisioni strategiche' },
      { name: 'Paolo Neri', role: 'CTO', phone: '+39 333 9876543', when: 'Questioni tecniche' }
    ],
    urgentTasks: [
      'Rinnovare contratto TechCorp entro 15 febbraio',
      'Preparare demo per AutoTech (schedulata 5 febbraio)',
      'Review roadmap Q2 con il team',
      'Setup accessi Salesforce e HubSpot'
    ],
    criticalTools: [
      { name: 'Salesforce', url: 'https://salesforce.com', priority: 'Alta' },
      { name: 'HubSpot', url: 'https://hubspot.com', priority: 'Alta' },
      { name: 'Slack', url: 'https://slack.com', priority: 'Media' },
      { name: 'Jira', url: 'https://jira.com', priority: 'Media' }
    ]
  };

  const handleOpenAIAssistant = (handover: any) => {
    if (handover.status === 'processing') {
      toast.info('Handover in elaborazione', {
        description: 'Questo handover è ancora in fase di elaborazione. Sarà disponibile a breve.'
      });
      return;
    }
    setSelectedHandover(handover);
    setIsAIModalOpen(true);
  };

  const handleViewHandover = (handover: any) => {
    if (handover.status === 'processing') {
      toast.info('Handover in elaborazione', {
        description: 'Questo handover è ancora in fase di elaborazione. Sarà disponibile a breve.'
      });
      return;
    }
    setSelectedHandover(handover);
    setIsViewModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Meno di un\'ora fa';
    if (diffInHours < 24) return `${diffInHours} ore fa`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} giorni fa`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Disponibile</Badge>;
      case 'processing':
        return <Badge variant="outline" className="border-orange-200 text-orange-800">In elaborazione</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Benvenuto nel tuo nuovo ruolo! 👋
          </h1>
          <p className="text-gray-600">
            Esplora gli handover ricevuti e inizia il tuo percorso di onboarding con l'AI Assistant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Handover Ricevuti */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">I Tuoi Handover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {receivedHandovers.map((handover) => (
                    <Card key={handover.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={handover.avatar} />
                              <AvatarFallback>{handover.previousEmployee.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-gray-900">{handover.role}</h3>
                              <p className="text-sm text-gray-600">da {handover.previousEmployee}</p>
                            </div>
                          </div>
                          {getStatusBadge(handover.status)}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Key Insights */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <FileText size={14} className="text-blue-600" />
                            <span>{handover.keyInsights.projects} progetti</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users size={14} className="text-green-600" />
                            <span>{handover.keyInsights.contacts} contatti</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Wrench size={14} className="text-purple-600" />
                            <span>{handover.keyInsights.tools} tool</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle size={14} className="text-orange-600" />
                            <span>{handover.keyInsights.urgentTasks} urgenti</span>
                          </div>
                        </div>

                        {/* Informazioni */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Completato:</span>
                            <span className="font-medium">{formatDate(handover.completedAt)}</span>
                          </div>
                          {handover.lastAccessed && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ultimo accesso:</span>
                              <span className="font-medium">{formatTimeAgo(handover.lastAccessed)}</span>
                            </div>
                          )}
                        </div>

                        {/* Azioni */}
                        <div className="flex gap-2 pt-2">
                          <Button 
                            className="flex-1 gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                            onClick={() => handleOpenAIAssistant(handover)}
                            disabled={handover.status === 'processing'}
                          >
                            <Bot size={16} />
                            Chat AI
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 gap-2"
                            onClick={() => handleViewHandover(handover)}
                            disabled={handover.status === 'processing'}
                          >
                            <Eye size={16} />
                            Visualizza
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Accessi Recenti */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock size={20} />
                  Accessi Recenti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentChats.map((chat) => (
                    <div key={chat.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <MessageSquare size={16} className="text-exitloop-purple" />
                        <div>
                          <div className="font-medium text-sm">{chat.handoverTitle}</div>
                          <div className="text-sm text-gray-600">"{chat.lastQuestion}"</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{formatTimeAgo(chat.timestamp)}</span>
                        <ChevronRight size={16} className="text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Panel */}
          <div className="space-y-6">
            {/* Contatti Urgenti */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} className="text-red-600" />
                  Contatti Urgenti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickAccess.urgentContacts.map((contact, index) => (
                  <div key={index} className="space-y-1">
                    <div className="font-medium text-sm">{contact.name}</div>
                    <div className="text-xs text-gray-600">{contact.role}</div>
                    <div className="text-xs text-blue-600">{contact.phone}</div>
                    <div className="text-xs text-gray-500 italic">{contact.when}</div>
                    {index < quickAccess.urgentContacts.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Task Urgenti */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle size={18} className="text-orange-600" />
                  Task Urgenti
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {quickAccess.urgentTasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tool Critici */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Wrench size={18} className="text-purple-600" />
                  Tool da Configurare
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickAccess.criticalTools.map((tool, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{tool.name}</div>
                      <div className={`text-xs ${tool.priority === 'Alta' ? 'text-red-600' : 'text-yellow-600'}`}>
                        Priorità {tool.priority}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Setup
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modals */}
        <AIAssistantModal
          isOpen={isAIModalOpen}
          onClose={() => setIsAIModalOpen(false)}
          handover={selectedHandover}
        />

        <HandoverViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          handover={selectedHandover}
        />
      </div>
    </div>
  );
};