import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  Copy, 
  ThumbsUp, 
  ThumbsDown,
  Bookmark,
  ExternalLink
} from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
  suggestions?: string[];
}

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  handover: any;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  handover
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Domande suggerite basate sul tipo di handover
  const getSuggestedQuestions = () => {
    if (!handover) return [];
    
    if (handover.role.includes('Sales')) {
      return [
        "Quali sono i clienti più importanti?",
        "Ci sono contratti in scadenza?",
        "Come funziona il processo di vendita?",
        "Quali sono i deal più caldi in pipeline?",
        "Chi sono i contatti chiave per le vendite?"
      ];
    } else if (handover.role.includes('Product')) {
      return [
        "Qual è la roadmap del prodotto?",
        "Quali sono le metriche chiave da monitorare?",
        "Chi sono gli stakeholder principali?",
        "Ci sono feature in sviluppo urgenti?",
        "Come funziona il processo di release?"
      ];
    } else {
      return [
        "Quali sono le responsabilità principali?",
        "Chi sono i contatti più importanti?",
        "Ci sono task urgenti da completare?",
        "Quali tool devo imparare per primi?",
        "Ci sono rischi o criticità da conoscere?"
      ];
    }
  };

  // Simula risposta AI basata sulla domanda
  const generateAIResponse = (question: string): Message => {
    const responses: Record<string, any> = {
      "clienti": {
        content: "I clienti più importanti sono **TechCorp** (€500k/anno), **InnovateLab** (€300k/anno) e **StartupHub** (€200k/anno). \n\n⚠️ **Urgente**: TechCorp ha un contratto in scadenza a marzo che va rinnovato prioritariamente. Il contatto principale è Mario Bianchi (mario@techcorp.it).",
        sources: ["Clienti Principali", "Contratti e Scadenze"],
        suggestions: ["Come posso contattare TechCorp?", "Quali sono i termini del contratto TechCorp?", "Chi gestiva la relazione con InnovateLab?"]
      },
      "contratti": {
        content: "Ci sono **3 contratti in scadenza** nei prossimi 60 giorni:\n\n1. **TechCorp** - Scadenza: 15 marzo (€500k/anno)\n2. **DataFlow** - Scadenza: 30 marzo (€200k/anno)\n3. **CloudSys** - Scadenza: 10 aprile (€150k/anno)\n\n📋 Tutti i documenti sono in Salesforce sotto 'Contract Renewals'.",
        sources: ["Contratti e Scadenze", "Pipeline Vendite"],
        suggestions: ["Come accedo a Salesforce?", "Chi può aiutarmi con i rinnovi?", "Qual è la strategia per TechCorp?"]
      },
      "processo": {
        content: "Il processo di vendita segue questi step:\n\n1. **Lead Generation** (Marketing/Referral)\n2. **Qualifica** (BANT framework)\n3. **Demo** (Personalizzata per use case)\n4. **Proposta** (Template in HubSpot)\n5. **Negoziazione** (Coinvolgere Sales Director se >€100k)\n6. **Chiusura** (DocuSign per contratti)\n\n⏱️ Ciclo medio: 45-60 giorni per deal enterprise.",
        sources: ["Tool e Processi", "Best Practices"],
        suggestions: ["Dove trovo i template delle proposte?", "Chi è il Sales Director?", "Come funziona la demo?"]
      },
      "pipeline": {
        content: "Abbiamo **12 deal attivi** per un valore totale di **€2.1M**:\n\n🔥 **Deal caldi**:\n• DataFlow - €400k (chiusura prevista febbraio)\n• CloudSys - €300k (in negoziazione)\n• AutoTech - €250k (demo schedulata 5 feb)\n\n📊 Tutti i dettagli sono in Salesforce dashboard 'Active Pipeline'.",
        sources: ["Pipeline Vendite", "Opportunità Attive"],
        suggestions: ["Come preparo la demo per AutoTech?", "Chi è il decision maker di DataFlow?", "Qual è lo stato della negoziazione CloudSys?"]
      },
      "roadmap": {
        content: "La roadmap prodotto per il 2024:\n\n**Q1 2024** (In corso):\n• Lancio AI Assistant\n• Miglioramenti UX dashboard\n• Integrazione Slack\n\n**Q2 2024**:\n• Mobile app iOS/Android\n• API pubbliche v2\n• Analytics avanzati\n\n**Q3-Q4**: Da definire con stakeholder.\n\n📋 Dettagli completi in Notion workspace 'Product Roadmap'.",
        sources: ["Product Roadmap", "Priorità Q1"],
        suggestions: ["Chi decide le priorità della roadmap?", "Come accedo a Notion?", "Qual è lo stato dell'AI Assistant?"]
      },
      "metriche": {
        content: "Le metriche chiave da monitorare:\n\n📈 **Crescita**:\n• MAU: 15,000 (+12% MoM)\n• New signups: 450/settimana\n• Conversion rate: 3.2%\n\n🎯 **Engagement**:\n• Retention D7: 68%\n• Session duration: 12 min\n• Feature adoption: 45%\n\n💰 **Business**:\n• MRR: €85k (+8% MoM)\n• Churn rate: 3.2%\n• NPS: 42\n\n🎯 **Obiettivi Q1**: 18,000 MAU, NPS 50+",
        sources: ["Metriche Chiave", "Dashboard Analytics"],
        suggestions: ["Dove vedo le metriche in tempo reale?", "Come si calcola il retention?", "Chi gestisce l'NPS survey?"]
      }
    };

    // Trova la risposta più appropriata
    const questionLower = question.toLowerCase();
    let responseKey = 'default';
    
    if (questionLower.includes('client') || questionLower.includes('important')) responseKey = 'clienti';
    else if (questionLower.includes('contratt') || questionLower.includes('scadenz')) responseKey = 'contratti';
    else if (questionLower.includes('processo') || questionLower.includes('vendita')) responseKey = 'processo';
    else if (questionLower.includes('pipeline') || questionLower.includes('deal')) responseKey = 'pipeline';
    else if (questionLower.includes('roadmap') || questionLower.includes('prodotto')) responseKey = 'roadmap';
    else if (questionLower.includes('metric') || questionLower.includes('kpi')) responseKey = 'metriche';

    const response = responses[responseKey] || {
      content: `Basandomi sull'handover di ${handover?.previousEmployee}, posso aiutarti con informazioni specifiche su:\n\n• Responsabilità e processi chiave\n• Contatti e stakeholder\n• Tool e accessi necessari\n• Task urgenti e priorità\n\nPotresti essere più specifico nella tua domanda?`,
      sources: ["Informazioni Generali"],
      suggestions: getSuggestedQuestions().slice(0, 3)
    };

    return {
      id: Date.now().toString(),
      type: 'assistant',
      content: response.content,
      timestamp: new Date(),
      sources: response.sources,
      suggestions: response.suggestions
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Aggiungi messaggio utente
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simula risposta AI con delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Messaggio copiato negli appunti');
  };

  const handleBookmarkMessage = (message: Message) => {
    toast.success('Risposta salvata nei bookmark');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Messaggio di benvenuto
  useEffect(() => {
    if (isOpen && handover && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        type: 'assistant',
        content: `Ciao! Sono l'AI Assistant specializzato sull'handover di **${handover.previousEmployee}** per il ruolo di **${handover.role}**.\n\nPosso aiutarti a trovare rapidamente le informazioni che ti servono per iniziare nel tuo nuovo ruolo. Cosa vorresti sapere?`,
        timestamp: new Date(),
        suggestions: getSuggestedQuestions().slice(0, 4)
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, handover]);

  if (!handover) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Bot size={20} className="text-exitloop-purple" />
            AI Assistant - {handover.role}
            <Badge variant="outline" className="ml-auto">
              {handover.previousEmployee}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type === 'assistant' && (
                  <Avatar className="w-8 h-8 bg-exitloop-purple">
                    <AvatarFallback>
                      <Bot size={16} className="text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <Card className={message.type === 'user' ? 'bg-exitloop-purple text-white' : 'bg-white'}>
                    <CardContent className="p-3">
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      
                      {message.sources && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-600 mb-2">Fonti:</div>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                <ExternalLink size={10} className="mr-1" />
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {message.suggestions && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="text-xs text-gray-600 mb-2">Domande correlate:</div>
                          <div className="space-y-1">
                            {message.suggestions.map((suggestion, index) => (
                              <button
                                key={index}
                                onClick={() => handleSuggestedQuestion(suggestion)}
                                className="block text-xs text-blue-600 hover:text-blue-800 text-left"
                              >
                                • {suggestion}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  {message.type === 'assistant' && (
                    <div className="flex items-center gap-1 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyMessage(message.content)}
                        className="h-6 px-2 text-xs"
                      >
                        <Copy size={12} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmarkMessage(message)}
                        className="h-6 px-2 text-xs"
                      >
                        <Bookmark size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsUp size={12} />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        <ThumbsDown size={12} />
                      </Button>
                    </div>
                  )}
                </div>

                {message.type === 'user' && (
                  <Avatar className="w-8 h-8 bg-gray-600">
                    <AvatarFallback>
                      <User size={16} className="text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 bg-exitloop-purple">
                  <AvatarFallback>
                    <Bot size={16} className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-white">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-yellow-600" />
                <span className="text-sm font-medium">Domande suggerite:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {getSuggestedQuestions().slice(0, 4).map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-left justify-start h-auto py-2 px-3 whitespace-normal"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Fai una domanda sull'handover..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-exitloop-purple hover:bg-exitloop-purple/90"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};