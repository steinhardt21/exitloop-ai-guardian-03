import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Mic, 
  MicOff, 
  Save, 
  CheckCircle, 
  Clock, 
  Bot,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
  ArrowRight,
  ArrowLeft,
  FileText,
  Award,
  Star
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface HandoverCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  handover: any;
  mode?: 'edit' | 'view';
}

export const HandoverCompletionModal: React.FC<HandoverCompletionModalProps> = ({
  isOpen,
  onClose,
  handover,
  mode = 'edit'
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isRecording, setIsRecording] = useState<Record<string, boolean>>({});
  const [autoSaveStatus, setAutoSaveStatus] = useState<Record<string, 'saving' | 'saved' | null>>({});
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);
  const [isRequestingEvaluation, setIsRequestingEvaluation] = useState(false);

  // Mock data per le sezioni del template
  const templateSections = [
    {
      id: 'section1',
      title: 'Responsabilità Tecniche',
      description: 'Documenta le tue principali responsabilità e competenze tecniche',
      questions: [
        {
          id: 'q1',
          text: 'Quali sono le principali responsabilità tecniche del tuo ruolo?',
          required: true
        },
        {
          id: 'q2', 
          text: 'Chi sono i referenti tecnici chiave interni ed esterni?',
          required: true
        },
        {
          id: 'q3',
          text: 'Quali decisioni tecniche strategiche sono in sospeso?',
          required: true
        }
      ]
    },
    {
      id: 'section2',
      title: 'Progetti in Corso',
      description: 'Stato e dettagli dei progetti attualmente in sviluppo',
      questions: [
        {
          id: 'q4',
          text: 'Quali progetti sono attualmente in sviluppo?',
          required: true
        },
        {
          id: 'q5',
          text: 'Qual è lo stato di avanzamento di ciascun progetto?',
          required: true
        },
        {
          id: 'q6',
          text: 'Ci sono blocchi o rischi critici da segnalare?',
          required: true
        }
      ]
    },
    {
      id: 'section3',
      title: 'Accessi e Credenziali',
      description: 'Sistemi critici e accessi da trasferire',
      questions: [
        {
          id: 'q7',
          text: 'Quali sono gli accessi critici da trasferire?',
          required: true
        },
        {
          id: 'q8',
          text: 'Dove sono conservate le credenziali di sistema?',
          required: true
        }
      ]
    },
    {
      id: 'section4',
      title: 'Team e Contatti',
      description: 'Informazioni sul team e contatti chiave',
      questions: [
        {
          id: 'q9',
          text: 'Chi sono i membri chiave del team tecnico?',
          required: true
        },
        {
          id: 'q10',
          text: 'Quali sono i contatti di emergenza per i sistemi critici?',
          required: true
        }
      ]
    }
  ];

  // Inizializza le risposte con dati mock se in modalità view
  useEffect(() => {
    if (mode === 'view' && handover?.status === 'completed') {
      const mockResponses = {
        'q1': 'Gestisco l\'infrastruttura cloud su AWS, supervisiono il team di sviluppo di 8 persone, e sono responsabile dell\'architettura tecnica di tutti i progetti. Mi occupo anche delle decisioni strategiche tecnologiche e della roadmap di sviluppo.',
        'q2': 'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend). Per emergenze: numero verde interno 1234. Fornitori esterni: AWS Support (contratto Enterprise), MongoDB Atlas (supporto dedicato).',
        'q3': 'Migrazione da MongoDB a PostgreSQL (decisione entro fine mese), scelta del nuovo framework frontend (React vs Vue), implementazione microservizi per il modulo pagamenti.',
        'q4': 'Progetto Alpha (rilascio previsto marzo), migrazione database (in corso), nuovo sistema di autenticazione (fase di testing), app mobile (sviluppo iniziale).',
        'q5': 'Alpha: 80% completato, in fase di testing. Migrazione DB: 60%, problemi di performance da risolvere. Auth: 90%, manca solo documentazione. Mobile: 20%, appena iniziato.',
        'q6': 'Migrazione DB: performance queries lente, potrebbe slittare di 2 settimane. Alpha: dipendenza da API esterna instabile. Mobile: manca ancora il designer UX.',
        'q7': 'AWS Console (credenziali root), GitHub Organization (owner), server di produzione via SSH, MongoDB Atlas (admin), Stripe (account principale), Google Workspace (super admin).',
        'q8': 'Credenziali conservate in 1Password aziendale (vault "Tech Infrastructure"). Backup fisico in cassaforte ufficio. Documentazione accessi in Confluence.',
        'q9': 'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend), Anna Neri (Backend Developer), Paolo Blu (Mobile Developer).',
        'q10': 'Emergenze infrastruttura: +39 333 1234567 (Marco), +39 333 7654321 (Sara). Escalation: CTO backup +39 333 9876543. Fornitori: AWS Support 24/7, MongoDB Atlas support.'
      };
      setResponses(mockResponses);
    }
  }, [mode, handover]);

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses(prev => ({ ...prev, [questionId]: value }));
    
    // Simula auto-save
    setAutoSaveStatus(prev => ({ ...prev, [questionId]: 'saving' }));
    setTimeout(() => {
      setAutoSaveStatus(prev => ({ ...prev, [questionId]: 'saved' }));
    }, 1000);
  };

  const handleVoiceRecording = (questionId: string) => {
    const isCurrentlyRecording = isRecording[questionId];
    
    if (isCurrentlyRecording) {
      // Stop recording
      setIsRecording(prev => ({ ...prev, [questionId]: false }));
      
      // Simula trascrizione vocale
      setTimeout(() => {
        const mockTranscription = "Questa è una trascrizione di esempio del messaggio vocale registrato. L'AI ha convertito automaticamente la tua voce in testo.";
        const currentResponse = responses[questionId] || '';
        const newResponse = currentResponse ? `${currentResponse}\n\n${mockTranscription}` : mockTranscription;
        handleResponseChange(questionId, newResponse);
        toast.success('Registrazione vocale trascritta con successo!');
      }, 2000);
    } else {
      // Start recording
      setIsRecording(prev => ({ ...prev, [questionId]: true }));
      toast.info('Registrazione in corso... Parla ora');
    }
  };

  const handleNextSection = () => {
    if (currentSection < templateSections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleRequestEvaluation = async () => {
    setIsRequestingEvaluation(true);
    
    // Simula richiesta valutazione AI
    setTimeout(() => {
      const mockEvaluation = {
        overallScore: 87,
        sectionScores: {
          'section1': 9,
          'section2': 8,
          'section3': 7,
          'section4': 9
        },
        feedback: {
          'section1': 'Eccellente descrizione delle responsabilità. Molto chiaro e dettagliato.',
          'section2': 'Buona panoramica dei progetti. Potresti aggiungere più dettagli sui rischi.',
          'section3': 'Informazioni sugli accessi complete ma manca documentazione backup.',
          'section4': 'Team e contatti ben documentati. Ottimo lavoro!'
        },
        suggestions: [
          'Aggiungi più dettagli sui processi di backup per la sezione accessi',
          'Specifica meglio i rischi dei progetti in corso',
          'Includi procedure di escalation per le emergenze'
        ],
        strengths: [
          'Descrizioni chiare e dettagliate',
          'Buona organizzazione delle informazioni',
          'Contatti completi e aggiornati'
        ]
      };
      
      setAiEvaluation(mockEvaluation);
      setIsRequestingEvaluation(false);
      toast.success('Valutazione AI completata!', {
        description: `Punteggio ottenuto: ${mockEvaluation.overallScore}/100`
      });
    }, 3000);
  };

  const calculateProgress = () => {
    const totalQuestions = templateSections.reduce((total, section) => total + section.questions.length, 0);
    const answeredQuestions = Object.keys(responses).filter(key => responses[key]?.trim()).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  };

  const getSectionProgress = (section: any) => {
    const sectionQuestions = section.questions.length;
    const answeredInSection = section.questions.filter((q: any) => responses[q.id]?.trim()).length;
    return Math.round((answeredInSection / sectionQuestions) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <TrendingUp className="text-green-600" size={16} />;
    if (score >= 6) return <Minus className="text-yellow-600" size={16} />;
    return <TrendingDown className="text-red-600" size={16} />;
  };

  if (!handover) return null;

  const currentSectionData = templateSections[currentSection];
  const progress = calculateProgress();
  const isCompleted = progress === 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText size={20} className="text-exitloop-purple" />
            {handover.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <Tabs defaultValue="completion" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="completion">Compilazione</TabsTrigger>
              <TabsTrigger value="evaluation" disabled={!isCompleted && !aiEvaluation}>
                Valutazione AI
              </TabsTrigger>
            </TabsList>

            {/* Tab Compilazione */}
            <TabsContent value="completion" className="space-y-6">
              {/* Header con progresso */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Progresso Generale</h3>
                      <p className="text-sm text-gray-600">
                        Sezione {currentSection + 1} di {templateSections.length}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-exitloop-purple">{progress}%</div>
                      <div className="text-sm text-gray-600">completato</div>
                    </div>
                  </div>
                  <Progress value={progress} className="mt-4" />
                </CardHeader>
              </Card>

              {/* Sezione corrente */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {currentSectionData.title}
                        <Badge variant="outline">
                          {getSectionProgress(currentSectionData)}% completata
                        </Badge>
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{currentSectionData.description}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {currentSectionData.questions.map((question: any, index: number) => (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-start justify-between">
                        <label className="text-sm font-medium text-gray-900 flex-1">
                          {index + 1}. {question.text}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        
                        {/* Indicatore auto-save */}
                        {autoSaveStatus[question.id] && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            {autoSaveStatus[question.id] === 'saving' ? (
                              <>
                                <Clock size={12} className="animate-spin" />
                                Salvando...
                              </>
                            ) : (
                              <>
                                <CheckCircle size={12} className="text-green-600" />
                                Salvato
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Textarea
                          placeholder="Scrivi la tua risposta qui..."
                          value={responses[question.id] || ''}
                          onChange={(e) => handleResponseChange(question.id, e.target.value)}
                          className="min-h-[120px]"
                          disabled={mode === 'view'}
                        />
                        
                        {mode === 'edit' && (
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVoiceRecording(question.id)}
                              className={`gap-2 ${isRecording[question.id] ? 'bg-red-50 border-red-200 text-red-700' : ''}`}
                            >
                              {isRecording[question.id] ? (
                                <>
                                  <MicOff size={14} />
                                  Stop Recording
                                </>
                              ) : (
                                <>
                                  <Mic size={14} />
                                  Registra Vocale
                                </>
                              )}
                            </Button>
                            
                            {isRecording[question.id] && (
                              <div className="flex items-center gap-2 text-sm text-red-600">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                                Registrazione in corso...
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Navigazione sezioni */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevSection}
                  disabled={currentSection === 0}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Sezione Precedente
                </Button>

                <div className="flex items-center gap-2">
                  {templateSections.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index === currentSection 
                          ? 'bg-exitloop-purple' 
                          : index < currentSection 
                            ? 'bg-green-500' 
                            : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {currentSection < templateSections.length - 1 ? (
                  <Button
                    onClick={handleNextSection}
                    className="gap-2 bg-exitloop-purple hover:bg-exitloop-purple/90"
                  >
                    Sezione Successiva
                    <ArrowRight size={16} />
                  </Button>
                ) : (
                  <Button
                    onClick={handleRequestEvaluation}
                    disabled={!isCompleted || isRequestingEvaluation}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isRequestingEvaluation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Valutando...
                      </>
                    ) : (
                      <>
                        <Bot size={16} />
                        Richiedi Valutazione AI
                      </>
                    )}
                  </Button>
                )}
              </div>
            </TabsContent>

            {/* Tab Valutazione AI */}
            <TabsContent value="evaluation" className="space-y-6">
              {aiEvaluation ? (
                <>
                  {/* Punteggio Generale */}
                  <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Bot size={24} className="text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">Valutazione AI Completata</h3>
                            <p className="text-sm text-gray-600">Analisi della qualità delle risposte</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">{aiEvaluation.overallScore}</div>
                          <div className="text-sm text-gray-600">/ 100</div>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Punteggi per Sezione */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles size={20} className="text-yellow-600" />
                        Punteggi per Sezione
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {templateSections.map((section, index) => (
                          <div key={section.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{section.title}</div>
                              <div className="text-sm text-gray-600">{aiEvaluation.feedback[section.id]}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getScoreIcon(aiEvaluation.sectionScores[section.id])}
                              <span className={`text-lg font-bold ${getScoreColor(aiEvaluation.sectionScores[section.id])}`}>
                                {aiEvaluation.sectionScores[section.id]}/10
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Punti di Forza e Suggerimenti */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700">
                          <Award size={20} />
                          Punti di Forza
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {aiEvaluation.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-blue-700">
                          <Star size={20} />
                          Suggerimenti per Migliorare
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {aiEvaluation.suggestions.map((suggestion: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                              </div>
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </>
              ) : (
                <Card className="border-dashed border-2 border-gray-300">
                  <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <Bot size={48} className="text-gray-400 mb-4" />
                    <h4 className="text-lg font-medium text-gray-600 mb-2">
                      Valutazione AI Non Disponibile
                    </h4>
                    <p className="text-gray-500 mb-4">
                      Completa tutte le sezioni per richiedere la valutazione AI
                    </p>
                    <div className="text-sm text-gray-400">
                      Progresso attuale: {progress}%
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            {mode === 'view' ? 'Modalità visualizzazione' : 'Le risposte vengono salvate automaticamente'}
          </div>
          <Button variant="outline" onClick={onClose}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};