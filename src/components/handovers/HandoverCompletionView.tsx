import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { 
  Mic, 
  MicOff, 
  Save, 
  CheckCircle, 
  Clock, 
  Bot,
  ArrowRight,
  ArrowLeft,
  FileText,
  Award,
  Star,
  Home
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface HandoverCompletionViewProps {
  handoverId: string;
  onNavigate?: (page: string) => void;
}

export const HandoverCompletionView: React.FC<HandoverCompletionViewProps> = ({
  handoverId,
  onNavigate
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
      
      // Mostra achievement
      toast.success('🎉 Valutazione AI completata!', {
        description: `Punteggio ottenuto: ${mockEvaluation.overallScore}/100 - Hai guadagnato 50 punti!`
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

  const currentSectionData = templateSections[currentSection];
  const progress = calculateProgress();
  const isCompleted = progress === 100;

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate?.('dashboard')}
                className="gap-2"
              >
                <Home size={16} />
                Dashboard
              </Button>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">CTO Handover - Marco Bianchi</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Compilazione Handover
            </h1>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-exitloop-purple">{progress}%</div>
            <div className="text-sm text-gray-600">completato</div>
          </div>
        </div>

        {/* Progresso Generale */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Progresso Generale</h3>
                <p className="text-sm text-gray-600">
                  Sezione {currentSection + 1} di {templateSections.length}
                </p>
              </div>
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
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Sezione corrente */}
        <Card className="mb-8">
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
                  />
                  
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

        {/* Risultati Valutazione AI */}
        {aiEvaluation && (
          <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Bot size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">🎉 Valutazione AI Completata!</h3>
                    <p className="text-sm text-gray-600">Hai guadagnato 50 punti</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{aiEvaluation.overallScore}</div>
                  <div className="text-sm text-gray-600">/ 100</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Punti di Forza */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                    <Award size={16} />
                    Punti di Forza
                  </h4>
                  <ul className="space-y-2">
                    {aiEvaluation.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggerimenti */}
                <div>
                  <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <Star size={16} />
                    Suggerimenti per Migliorare
                  </h4>
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
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};