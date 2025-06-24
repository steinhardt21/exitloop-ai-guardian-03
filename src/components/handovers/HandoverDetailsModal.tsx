import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Bot,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  MessageSquare,
  Star,
  AlertTriangle,
  ThumbsUp,
  ThumbsDown,
  RefreshCw
} from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { toast } from '@/components/ui/sonner';

interface HandoverResponse {
  questionId: string;
  question: string;
  answer: string;
  completedAt: string;
}

interface HandoverSection {
  id: string;
  title: string;
  responses: HandoverResponse[];
  completion: number;
}

interface AIAnalysis {
  overallScore: number;
  completeness: number;
  clarity: number;
  usefulness: number;
  suggestions: string[];
  strengths: string[];
  weaknesses: string[];
  criticalGaps: string[];
  lastAnalyzed: string;
}

interface Handover {
  id: string;
  title: string;
  employee: string;
  email: string;
  status: string;
  completion: number;
  dueDate: string;
  createdAt: string;
  avatar: string;
  templateName: string;
  sections: HandoverSection[];
  aiAnalysis?: AIAnalysis;
}

interface HandoverDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  handover: Handover | null;
}

export const HandoverDetailsModal: React.FC<HandoverDetailsModalProps> = ({
  isOpen,
  onClose,
  handover
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(handover?.aiAnalysis || null);

  if (!handover) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Badge variant="outline" className="border-orange-200 text-orange-800">In corso</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completato</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-red-200 text-red-800">Da iniziare</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="text-green-600" size={16} />;
    if (score >= 60) return <Minus className="text-yellow-600" size={16} />;
    return <TrendingDown className="text-red-600" size={16} />;
  };

  const runAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Simula analisi AI
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock AI analysis results
      const mockAnalysis: AIAnalysis = {
        overallScore: Math.floor(Math.random() * 40) + 60, // 60-100
        completeness: Math.floor(Math.random() * 30) + 70,
        clarity: Math.floor(Math.random() * 35) + 65,
        usefulness: Math.floor(Math.random() * 25) + 75,
        suggestions: [
          "Aggiungere più dettagli sui processi di escalation",
          "Specificare meglio i contatti di emergenza",
          "Includere esempi pratici per le procedure complesse",
          "Documentare meglio gli accessi ai sistemi critici"
        ],
        strengths: [
          "Descrizione chiara delle responsabilità principali",
          "Buona documentazione dei tool utilizzati",
          "Contatti ben organizzati e aggiornati",
          "Procedure operative descritte in modo comprensibile"
        ],
        weaknesses: [
          "Mancano dettagli sui processi di backup",
          "Informazioni incomplete sui progetti in corso",
          "Procedure di emergenza poco dettagliate"
        ],
        criticalGaps: [
          "Password e credenziali di accesso non documentate",
          "Manca la documentazione del processo di deploy"
        ],
        lastAnalyzed: new Date().toISOString()
      };
      
      setAiAnalysis(mockAnalysis);
      toast.success('Analisi AI completata con successo!');
      
    } catch (error) {
      toast.error('Errore durante l\'analisi AI');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Mock data per le risposte
  const mockSections: HandoverSection[] = [
    {
      id: 'sec1',
      title: 'Responsabilità Tecniche',
      completion: 100,
      responses: [
        {
          questionId: 'q1',
          question: 'Quali sono le principali responsabilità tecniche?',
          answer: 'Gestisco l\'infrastruttura cloud su AWS, supervisiono il team di sviluppo di 8 persone, e sono responsabile dell\'architettura tecnica di tutti i progetti. Mi occupo anche delle decisioni strategiche tecnologiche e della roadmap di sviluppo.',
          completedAt: '2024-01-20T10:30:00Z'
        },
        {
          questionId: 'q2',
          question: 'Chi sono i referenti tecnici chiave?',
          answer: 'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend). Per emergenze: numero verde interno 1234.',
          completedAt: '2024-01-20T10:35:00Z'
        }
      ]
    },
    {
      id: 'sec2',
      title: 'Progetti in Corso',
      completion: 75,
      responses: [
        {
          questionId: 'q3',
          question: 'Quali progetti sono attualmente in sviluppo?',
          answer: 'Progetto Alpha (rilascio previsto marzo), migrazione database (in corso), nuovo sistema di autenticazione (fase di testing).',
          completedAt: '2024-01-20T11:00:00Z'
        }
      ]
    },
    {
      id: 'sec3',
      title: 'Accessi e Credenziali',
      completion: 50,
      responses: [
        {
          questionId: 'q4',
          question: 'Quali sono gli accessi critici da trasferire?',
          answer: 'AWS Console (root access), GitHub Organization, server di produzione via SSH.',
          completedAt: '2024-01-20T11:15:00Z'
        }
      ]
    }
  ];

  const totalResponses = mockSections.reduce((total, section) => total + section.responses.length, 0);
  const totalQuestions = mockSections.reduce((total, section) => total + section.responses.length + (section.completion < 100 ? 1 : 0), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Eye size={20} className="text-exitloop-purple" />
            Dettagli Handover
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Panoramica</TabsTrigger>
              <TabsTrigger value="responses">Risposte</TabsTrigger>
              <TabsTrigger value="ai-analysis" className="gap-2">
                <Bot size={16} />
                Analisi AI
              </TabsTrigger>
            </TabsList>

            {/* Tab Panoramica */}
            <TabsContent value="overview" className="space-y-6">
              {/* Header Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={handover.avatar} />
                        <AvatarFallback className="text-lg">{handover.employee.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{handover.title}</h3>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <User size={16} />
                          {handover.employee}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2">
                          <Mail size={16} />
                          {handover.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(handover.status)}
                      <p className="text-sm text-gray-500 mt-2">
                        Template: {handover.templateName}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        Data di scadenza
                      </div>
                      <p className="font-medium">
                        {format(new Date(handover.dueDate), "PPP", { locale: it })}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock size={16} />
                        Creato il
                      </div>
                      <p className="font-medium">
                        {format(new Date(handover.createdAt), "PPP", { locale: it })}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FileText size={16} />
                        Completamento
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={handover.completion} className="flex-1" />
                        <span className="font-medium">{handover.completion}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiche Sezioni */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mockSections.map((section) => (
                  <Card key={section.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Completamento</span>
                          <span className="font-medium">{section.completion}%</span>
                        </div>
                        <Progress value={section.completion} />
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Risposte</span>
                          <span className="font-medium">{section.responses.length}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Statistiche Generali */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistiche Generali</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-exitloop-purple">{totalResponses}</div>
                      <div className="text-sm text-gray-600">Risposte Fornite</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-exitloop-purple">{totalQuestions}</div>
                      <div className="text-sm text-gray-600">Domande Totali</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-exitloop-purple">{mockSections.length}</div>
                      <div className="text-sm text-gray-600">Sezioni</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-exitloop-purple">
                        {Math.round((totalResponses / totalQuestions) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600">Completamento</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Risposte */}
            <TabsContent value="responses" className="space-y-6">
              {mockSections.map((section) => (
                <Card key={section.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText size={20} />
                        {section.title}
                      </CardTitle>
                      <Badge variant="outline">
                        {section.responses.length} risposte
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {section.responses.map((response) => (
                      <div key={response.questionId} className="border-l-4 border-l-exitloop-purple pl-4 py-2">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{response.question}</h4>
                          <span className="text-xs text-gray-500">
                            {format(new Date(response.completedAt), "dd/MM/yyyy HH:mm")}
                          </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-gray-800">{response.answer}</p>
                        </div>
                      </div>
                    ))}
                    
                    {section.completion < 100 && (
                      <div className="border-l-4 border-l-gray-300 pl-4 py-2">
                        <div className="flex items-center gap-2 text-gray-500">
                          <AlertCircle size={16} />
                          <span className="text-sm">Alcune domande sono ancora in attesa di risposta</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            {/* Tab Analisi AI */}
            <TabsContent value="ai-analysis" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Analisi AI delle Risposte</h3>
                  <p className="text-gray-600">Valutazione automatica della qualità e completezza delle risposte</p>
                </div>
                <Button 
                  onClick={runAIAnalysis}
                  disabled={isAnalyzing}
                  className="gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Analizzando...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      {aiAnalysis ? 'Rianalizza' : 'Avvia Analisi AI'}
                    </>
                  )}
                </Button>
              </div>

              {isAnalyzing && (
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Bot size={24} className="text-exitloop-purple animate-pulse" />
                      <div>
                        <h4 className="font-medium text-gray-900">Analisi in corso...</h4>
                        <p className="text-sm text-gray-600">L'AI sta valutando la qualità delle risposte</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={66} className="w-full" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {aiAnalysis && !isAnalyzing && (
                <>
                  {/* Punteggi Generali */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getScoreIcon(aiAnalysis.overallScore)}
                          <span className={`text-2xl font-bold ${getScoreColor(aiAnalysis.overallScore)}`}>
                            {aiAnalysis.overallScore}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Punteggio Generale</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getScoreIcon(aiAnalysis.completeness)}
                          <span className={`text-2xl font-bold ${getScoreColor(aiAnalysis.completeness)}`}>
                            {aiAnalysis.completeness}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Completezza</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getScoreIcon(aiAnalysis.clarity)}
                          <span className={`text-2xl font-bold ${getScoreColor(aiAnalysis.clarity)}`}>
                            {aiAnalysis.clarity}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Chiarezza</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {getScoreIcon(aiAnalysis.usefulness)}
                          <span className={`text-2xl font-bold ${getScoreColor(aiAnalysis.usefulness)}`}>
                            {aiAnalysis.usefulness}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">Utilità</div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Analisi Dettagliata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Punti di Forza */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700">
                          <ThumbsUp size={20} />
                          Punti di Forza
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {aiAnalysis.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Aree di Miglioramento */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-yellow-700">
                          <ThumbsDown size={20} />
                          Aree di Miglioramento
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {aiAnalysis.weaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertCircle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gap Critici */}
                  {aiAnalysis.criticalGaps.length > 0 && (
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-700">
                          <AlertTriangle size={20} />
                          Gap Critici da Risolvere
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {aiAnalysis.criticalGaps.map((gap, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <AlertTriangle size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm font-medium">{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {/* Suggerimenti */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles size={20} className="text-exitloop-purple" />
                        Suggerimenti per Migliorare
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {aiAnalysis.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-exitloop-purple/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-medium text-exitloop-purple">{index + 1}</span>
                            </div>
                            <span className="text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Info Analisi */}
                  <div className="text-center text-sm text-gray-500">
                    Ultima analisi: {format(new Date(aiAnalysis.lastAnalyzed), "PPP 'alle' HH:mm", { locale: it })}
                  </div>
                </>
              )}

              {!aiAnalysis && !isAnalyzing && (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Bot size={48} className="text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 mb-2">
                      Nessuna Analisi Disponibile
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Avvia l'analisi AI per valutare la qualità delle risposte dell'handover
                    </p>
                    <Button 
                      onClick={runAIAnalysis}
                      className="gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                    >
                      <Sparkles size={16} />
                      Avvia Analisi AI
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Handover ID: {handover.id} • Creato il {format(new Date(handover.createdAt), "dd/MM/yyyy")}
          </div>
          <Button variant="outline" onClick={onClose}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};