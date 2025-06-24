import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Trophy,
  Star,
  Target,
  Clock,
  CheckCircle,
  PlayCircle,
  Award,
  Zap,
  TrendingUp,
  Calendar,
  FileText,
  Bot
} from 'lucide-react';
import { HandoverCompletionModal } from '@/components/handovers/HandoverCompletionModal';
import { toast } from '@/components/ui/sonner';

interface OutgoingDashboardProps {
  onNavigate?: (page: string, handoverId?: string) => void;
}

export const OutgoingDashboard: React.FC<OutgoingDashboardProps> = ({ onNavigate }) => {
  const [selectedHandover, setSelectedHandover] = useState<any>(null);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  // Mock data per handover assegnati al dipendente uscente
  const assignedHandovers = [
    {
      id: '1',
      title: 'CTO Handover - Marco Bianchi',
      templateName: 'CTO Handover',
      status: 'in_progress',
      completion: 75,
      dueDate: '2024-02-15T23:59:59Z',
      startedAt: '2024-01-15T10:00:00Z',
      totalSections: 4,
      completedSections: 3,
      totalQuestions: 12,
      answeredQuestions: 9,
      lastActivity: '2024-01-22T14:30:00Z',
      aiScore: 82,
      canRequestEvaluation: false
    },
    {
      id: '2',
      title: 'Passaggio Responsabilità Tech Lead',
      templateName: 'Tech Lead Handover',
      status: 'completed',
      completion: 100,
      dueDate: '2024-01-30T23:59:59Z',
      startedAt: '2024-01-10T09:00:00Z',
      completedAt: '2024-01-28T16:45:00Z',
      totalSections: 5,
      completedSections: 5,
      totalQuestions: 15,
      answeredQuestions: 15,
      lastActivity: '2024-01-28T16:45:00Z',
      aiScore: 94,
      canRequestEvaluation: false
    },
    {
      id: '3',
      title: 'Documentazione Progetti Attivi',
      templateName: 'Project Documentation',
      status: 'pending',
      completion: 25,
      dueDate: '2024-02-20T23:59:59Z',
      startedAt: '2024-01-20T11:00:00Z',
      totalSections: 3,
      completedSections: 0,
      totalQuestions: 8,
      answeredQuestions: 2,
      lastActivity: '2024-01-20T11:30:00Z',
      aiScore: null,
      canRequestEvaluation: false
    }
  ];

  // Sistema di gamification
  const gamificationData = {
    totalPoints: 1250,
    level: 'Intermedio',
    levelProgress: 75, // Progresso verso il livello successivo
    nextLevel: 'Avanzato',
    pointsToNextLevel: 250,
    badges: [
      { id: 'first_section', name: 'Prima Sezione', description: 'Completata la prima sezione', earned: true, icon: '🎯' },
      { id: 'half_complete', name: 'A Metà Strada', description: 'Handover al 50%', earned: true, icon: '⚡' },
      { id: 'ai_approved', name: 'AI Approved', description: 'Valutazione AI superata', earned: true, icon: '🤖' },
      { id: 'speed_demon', name: 'Velocista', description: 'Completato in tempo record', earned: false, icon: '🚀' },
      { id: 'perfectionist', name: 'Perfezionista', description: 'Punteggio AI > 90', earned: true, icon: '💎' },
      { id: 'mentor', name: 'Mentore', description: 'Handover di qualità eccellente', earned: false, icon: '👨‍🏫' }
    ],
    recentAchievements: [
      { name: 'AI Approved', points: 50, timestamp: '2024-01-22T14:30:00Z' },
      { name: 'A Metà Strada', points: 25, timestamp: '2024-01-20T16:15:00Z' }
    ]
  };

  const handleContinueHandover = (handover: any) => {
    if (onNavigate) {
      onNavigate('handover-completion', handover.id);
    }
  };

  const handleViewHandover = (handover: any) => {
    setSelectedHandover(handover);
    setIsCompletionModalOpen(true);
  };

  const handleRequestEvaluation = (handover: any) => {
    toast.info(`Richiesta valutazione AI per: ${handover.title}`, {
      description: "L'AI analizzerà la qualità delle tue risposte"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="outline" className="border-orange-200 text-orange-800">In corso</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completato</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-blue-200 text-blue-800">Da iniziare</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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

  const earnedBadges = gamificationData.badges.filter(badge => badge.earned);
  const unearnedBadges = gamificationData.badges.filter(badge => !badge.earned);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header con benvenuto */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Benvenuto, Marco! 👋
          </h1>
          <p className="text-gray-600">
            Completa i tuoi handover per trasferire la tua preziosa conoscenza
          </p>
        </div>

        {/* Sezione Gamification */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Livello e Punti */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={24} />
                  <span className="font-semibold">Livello {gamificationData.level}</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{gamificationData.totalPoints}</div>
                  <div className="text-sm opacity-90">punti totali</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso verso {gamificationData.nextLevel}</span>
                  <span>{gamificationData.levelProgress}%</span>
                </div>
                <Progress value={gamificationData.levelProgress} className="bg-purple-400" />
                <div className="text-xs opacity-90">
                  {gamificationData.pointsToNextLevel} punti al prossimo livello
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Badge Guadagnati */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Award size={20} className="text-yellow-600" />
                Badge Guadagnati
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-3">
                {earnedBadges.slice(0, 4).map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-1 bg-yellow-50 text-yellow-800 px-2 py-1 rounded-full text-xs"
                    title={badge.description}
                  >
                    <span>{badge.icon}</span>
                    <span className="font-medium">{badge.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                {earnedBadges.length} di {gamificationData.badges.length} badge guadagnati
              </div>
            </CardContent>
          </Card>

          {/* Achievements Recenti */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Zap size={20} className="text-green-600" />
                Achievements Recenti
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {gamificationData.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{achievement.name}</div>
                      <div className="text-xs text-gray-500">
                        {formatTimeAgo(achievement.timestamp)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <span className="text-sm font-bold">+{achievement.points}</span>
                      <Star size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Handover Assegnati */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">I Tuoi Handover</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FileText size={16} />
                {assignedHandovers.length} handover assegnati
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {assignedHandovers.map((handover) => (
                <Card key={handover.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{handover.title}</h3>
                        <p className="text-sm text-gray-600">{handover.templateName}</p>
                      </div>
                      {getStatusBadge(handover.status)}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Progresso */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completamento</span>
                        <span className="font-medium">{handover.completion}%</span>
                      </div>
                      <Progress value={handover.completion} />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{handover.completedSections} di {handover.totalSections} sezioni</span>
                        <span>{handover.answeredQuestions} di {handover.totalQuestions} domande</span>
                      </div>
                    </div>

                    {/* Informazioni */}
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Scadenza:</span>
                        <span className="font-medium">{formatDate(handover.dueDate)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Ultima attività:</span>
                        <span className="font-medium">{formatTimeAgo(handover.lastActivity)}</span>
                      </div>
                      {handover.aiScore && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Punteggio AI:</span>
                          <div className="flex items-center gap-1">
                            <Bot size={14} className="text-purple-600" />
                            <span className="font-medium">{handover.aiScore}/100</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Azioni */}
                    <div className="flex gap-2 pt-2">
                      {handover.status === 'completed' ? (
                        <Button 
                          variant="outline" 
                          className="flex-1 gap-2"
                          onClick={() => handleViewHandover(handover)}
                        >
                          <CheckCircle size={16} />
                          Visualizza
                        </Button>
                      ) : (
                        <Button 
                          className="flex-1 gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                          onClick={() => handleContinueHandover(handover)}
                        >
                          <PlayCircle size={16} />
                          {handover.status === 'pending' ? 'Inizia' : 'Continua'}
                        </Button>
                      )}
                      
                      {handover.completion === 100 && handover.canRequestEvaluation && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRequestEvaluation(handover)}
                          className="gap-1"
                        >
                          <Bot size={14} />
                          Valuta
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sezione Badge da Sbloccare */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} className="text-blue-600" />
              Badge da Sbloccare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unearnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg opacity-60"
                >
                  <div className="text-2xl">{badge.icon}</div>
                  <div>
                    <div className="font-medium text-gray-900">{badge.name}</div>
                    <div className="text-sm text-gray-600">{badge.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modal per visualizzazione handover completati */}
        <HandoverCompletionModal
          isOpen={isCompletionModalOpen}
          onClose={() => setIsCompletionModalOpen(false)}
          handover={selectedHandover}
          mode="view"
        />
      </div>
    </div>
  );
};