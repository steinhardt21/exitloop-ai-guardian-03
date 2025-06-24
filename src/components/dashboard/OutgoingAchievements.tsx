import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Award, 
  Target, 
  Zap,
  CheckCircle,
  Lock,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface OutgoingAchievementsProps {
  onNavigate?: (page: string) => void;
}

export const OutgoingAchievements: React.FC<OutgoingAchievementsProps> = ({ onNavigate }) => {
  // Mock data per achievements e gamification
  const gamificationData = {
    totalPoints: 1250,
    level: 'Intermedio',
    levelProgress: 75,
    nextLevel: 'Avanzato',
    pointsToNextLevel: 250,
    badges: [
      { 
        id: 'first_section', 
        name: 'Prima Sezione', 
        description: 'Completata la prima sezione di un handover', 
        earned: true, 
        icon: '🎯',
        points: 10,
        earnedDate: '2024-01-15T10:00:00Z'
      },
      { 
        id: 'half_complete', 
        name: 'A Metà Strada', 
        description: 'Raggiunto il 50% di completamento', 
        earned: true, 
        icon: '⚡',
        points: 25,
        earnedDate: '2024-01-20T16:15:00Z'
      },
      { 
        id: 'ai_approved', 
        name: 'AI Approved', 
        description: 'Ottenuto punteggio AI superiore a 80', 
        earned: true, 
        icon: '🤖',
        points: 50,
        earnedDate: '2024-01-22T14:30:00Z'
      },
      { 
        id: 'perfectionist', 
        name: 'Perfezionista', 
        description: 'Punteggio AI superiore a 90', 
        earned: true, 
        icon: '💎',
        points: 100,
        earnedDate: '2024-01-28T16:45:00Z'
      },
      { 
        id: 'speed_demon', 
        name: 'Velocista', 
        description: 'Completato un handover in meno di 3 giorni', 
        earned: false, 
        icon: '🚀',
        points: 75,
        requirement: 'Completa un handover entro 3 giorni'
      },
      { 
        id: 'mentor', 
        name: 'Mentore', 
        description: 'Completato 3 handover con punteggio eccellente', 
        earned: false, 
        icon: '👨‍🏫',
        points: 150,
        requirement: 'Completa 3 handover con punteggio > 85'
      },
      { 
        id: 'voice_master', 
        name: 'Voice Master', 
        description: 'Utilizzato 10 volte la registrazione vocale', 
        earned: false, 
        icon: '🎤',
        points: 30,
        requirement: 'Usa la registrazione vocale 10 volte'
      },
      { 
        id: 'early_bird', 
        name: 'Early Bird', 
        description: 'Completato un handover prima della scadenza', 
        earned: false, 
        icon: '🐦',
        points: 40,
        requirement: 'Completa prima della scadenza'
      },
      { 
        id: 'knowledge_keeper', 
        name: 'Knowledge Keeper', 
        description: 'Documentato oltre 1000 parole in un handover', 
        earned: false, 
        icon: '📚',
        points: 60,
        requirement: 'Scrivi più di 1000 parole'
      }
    ],
    stats: {
      handoversCompleted: 2,
      totalWords: 2847,
      averageScore: 90.5,
      voiceRecordings: 7,
      daysActive: 14
    }
  };

  const earnedBadges = gamificationData.badges.filter(badge => badge.earned);
  const unearnedBadges = gamificationData.badges.filter(badge => !badge.earned);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Principiante': return 'text-green-600';
      case 'Intermedio': return 'text-blue-600';
      case 'Avanzato': return 'text-purple-600';
      case 'Master': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            I Tuoi Achievements
          </h1>
          <p className="text-gray-600">
            Traccia i tuoi progressi e sblocca nuovi badge
          </p>
        </div>

        {/* Statistiche Livello */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Livello Attuale */}
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={24} />
                  <span className={`font-semibold ${getLevelColor(gamificationData.level)}`}>
                    Livello {gamificationData.level}
                  </span>
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
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
                  {earnedBadges.length}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  di {gamificationData.badges.length} badge totali
                </div>
                <Progress 
                  value={(earnedBadges.length / gamificationData.badges.length) * 100} 
                  className="mb-2"
                />
                <div className="text-xs text-gray-500">
                  {Math.round((earnedBadges.length / gamificationData.badges.length) * 100)}% completato
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiche */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp size={20} className="text-green-600" />
                Le Tue Statistiche
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Handover completati</span>
                  <span className="font-semibold">{gamificationData.stats.handoversCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Punteggio medio</span>
                  <span className="font-semibold">{gamificationData.stats.averageScore}/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Parole scritte</span>
                  <span className="font-semibold">{gamificationData.stats.totalWords.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Registrazioni vocali</span>
                  <span className="font-semibold">{gamificationData.stats.voiceRecordings}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badge Guadagnati */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              Badge Guadagnati ({earnedBadges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {earnedBadges.map((badge) => (
                <Card key={badge.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1">{badge.name}</div>
                        <div className="text-sm text-gray-600 mb-2">{badge.description}</div>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            +{badge.points} punti
                          </Badge>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(badge.earnedDate!)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Badge da Sbloccare */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target size={20} className="text-blue-600" />
              Badge da Sbloccare ({unearnedBadges.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unearnedBadges.map((badge) => (
                <Card key={badge.id} className="opacity-60 border-dashed border-2">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl grayscale">{badge.icon}</div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                          {badge.name}
                          <Lock size={14} className="text-gray-400" />
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{badge.description}</div>
                        <div className="space-y-2">
                          <Badge variant="outline" className="border-gray-300 text-gray-600">
                            +{badge.points} punti
                          </Badge>
                          <div className="text-xs text-gray-500">
                            <strong>Requisito:</strong> {badge.requirement}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};