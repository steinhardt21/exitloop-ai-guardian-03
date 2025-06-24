import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  FileText, 
  Bookmark, 
  Download, 
  ChevronRight,
  ChevronDown,
  StickyNote,
  Tag,
  Eye,
  Edit
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from '@/components/ui/sonner';

interface HandoverViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  handover: any;
}

export const HandoverViewModal: React.FC<HandoverViewModalProps> = ({
  isOpen,
  onClose,
  handover
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [tags, setTags] = useState<Record<string, string[]>>({});

  if (!handover) return null;

  // Mock data per sezioni complete dell'handover
  const fullSections = [
    {
      id: 'overview',
      title: 'Panoramica del Ruolo',
      content: `Come ${handover.role}, le tue responsabilità principali includono la gestione del team vendite, lo sviluppo di strategie commerciali e il raggiungimento degli obiettivi di fatturato. Il ruolo richiede una stretta collaborazione con marketing, product e customer success.

**Obiettivi principali:**
• Raggiungere €3M di fatturato annuale
• Mantenere un tasso di conversione >15%
• Gestire un team di 5 sales representative
• Sviluppare nuovi canali di acquisizione`
    },
    {
      id: 'clients',
      title: 'Clienti Principali',
      content: `**TechCorp** (€500k/anno)
Contatto: Mario Bianchi (mario@techcorp.it, +39 333 1234567)
Contratto in scadenza: 15 marzo 2024
Note: Cliente storico, molto soddisfatto del servizio. Possibile upselling su modulo analytics.

**InnovateLab** (€300k/anno)
Contatto: Sara Rossi (sara@innovatelab.com, +39 333 2345678)
Rinnovo: Automatico annuale
Note: Utilizzano principalmente il piano Enterprise. Interessati alle nuove API.

**StartupHub** (€200k/anno)
Contatto: Luca Verde (luca@startuphub.it, +39 333 3456789)
Stato: Negoziazione per upgrade
Note: Crescita rapida, potrebbero diventare il nostro cliente più grande.`
    },
    {
      id: 'pipeline',
      title: 'Pipeline e Opportunità',
      content: `**Deal Attivi (€2.1M totale):**

🔥 **DataFlow** - €400k
Fase: Proposta inviata
Decision maker: Anna Bianchi (CEO)
Prossimo step: Call di follow-up 5 febbraio
Note: Molto interessati, budget confermato

🔥 **CloudSys** - €300k  
Fase: Negoziazione contratto
Decision maker: Paolo Rossi (CTO)
Prossimo step: Revisione termini legali
Note: Vogliono sconto volume, max 10%

🔥 **AutoTech** - €250k
Fase: Demo schedulata
Decision maker: Maria Verdi (COO)
Demo: 5 febbraio ore 15:00
Note: Caso d'uso specifico per automotive`
    },
    {
      id: 'tools',
      title: 'Tool e Processi',
      content: `**CRM: Salesforce**
URL: https://techcorp.salesforce.com
Login: Usa SSO aziendale
Dashboard principale: "Sales Overview"
Report settimanali: Ogni lunedì mattina

**Marketing Automation: HubSpot**
URL: https://app.hubspot.com
Accesso: Richiedi a IT
Utilizzo: Lead scoring, email campaigns, landing pages

**Contratti: DocuSign**
URL: https://docusign.com
Template: Cartella "Sales Templates"
Processo: Draft → Legal Review → Firma

**Demo: Zoom + Demo Environment**
Account: sales@techcorp.it
Demo env: https://demo.techcorp.it
Credenziali: Vedi 1Password`
    },
    {
      id: 'team',
      title: 'Team e Stakeholder',
      content: `**Team Sales (Report diretti):**
• Marco Neri - Senior Sales Rep (marco.neri@techcorp.it)
• Sofia Blu - Sales Rep (sofia.blu@techcorp.it)  
• Luca Giallo - Junior Sales Rep (luca.giallo@techcorp.it)
• Anna Verde - Sales Development Rep (anna.verde@techcorp.it)
• Paolo Rosso - Sales Operations (paolo.rosso@techcorp.it)

**Stakeholder Chiave:**
• CEO - Anna Bianchi (strategia, deal >€200k)
• CMO - Marco Viola (lead generation, eventi)
• CTO - Sofia Arancio (demo tecniche, feasibility)
• CFO - Luca Azzurro (pricing, contratti)

**Meeting Ricorrenti:**
• Sales Team Standup: Lunedì 9:00
• Pipeline Review: Mercoledì 14:00  
• Executive Review: Venerdì 16:00`
    },
    {
      id: 'processes',
      title: 'Processi e Best Practices',
      content: `**Processo di Vendita:**
1. **Lead Qualification** (BANT framework)
   - Budget: >€50k annuale
   - Authority: Decision maker identificato
   - Need: Pain point chiaro
   - Timeline: Implementazione <6 mesi

2. **Discovery Call** (45 min)
   - Comprensione business
   - Identificazione stakeholder
   - Mapping processo attuale
   - ROI calculation

3. **Demo Personalizzata** (60 min)
   - Scenario specifico cliente
   - Live data quando possibile
   - Q&A tecnico con CTO
   - Next steps chiari

4. **Proposta** (entro 48h)
   - Template HubSpot
   - Pricing personalizzato
   - Implementation timeline
   - Success metrics

5. **Negoziazione e Chiusura**
   - Legal review se >€100k
   - Approval CEO se >€200k
   - DocuSign per firma
   - Handoff a Customer Success`
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleAddNote = (sectionId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [sectionId]: note
    }));
    toast.success('Nota salvata');
  };

  const handleBookmark = (sectionId: string) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(sectionId);
      const newBookmarks = isBookmarked 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId];
      
      toast.success(isBookmarked ? 'Bookmark rimosso' : 'Sezione aggiunta ai bookmark');
      return newBookmarks;
    });
  };

  const handleExportPDF = () => {
    toast.success('Export PDF avviato', {
      description: 'Il documento sarà scaricato a breve'
    });
  };

  const filteredSections = fullSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <FileText size={20} className="text-exitloop-purple" />
            {handover.title}
            <Badge variant="outline" className="ml-auto">
              {handover.previousEmployee}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="document" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="document">Documento</TabsTrigger>
              <TabsTrigger value="notes">Le Mie Note</TabsTrigger>
              <TabsTrigger value="bookmarks">Bookmark</TabsTrigger>
            </TabsList>

            <TabsContent value="document" className="flex-1 overflow-hidden flex flex-col">
              {/* Search and Actions */}
              <div className="flex items-center gap-3 p-4 border-b">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Cerca nell'handover..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" onClick={handleExportPDF} className="gap-2">
                  <Download size={16} />
                  Export PDF
                </Button>
              </div>

              {/* Document Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
                  {/* Table of Contents */}
                  <div className="lg:col-span-1">
                    <Card className="sticky top-0">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Indice</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {fullSections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => {
                              document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="flex items-center justify-between w-full text-left p-2 rounded hover:bg-gray-100 text-sm"
                          >
                            <span>{section.title}</span>
                            {bookmarks.includes(section.id) && (
                              <Bookmark size={12} className="text-yellow-600 fill-current" />
                            )}
                          </button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Main Content */}
                  <div className="lg:col-span-3 space-y-6">
                    {filteredSections.map((section) => (
                      <Card key={section.id} id={section.id}>
                        <Collapsible 
                          open={openSections[section.id] !== false} 
                          onOpenChange={() => toggleSection(section.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CollapsibleTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2 p-0 h-auto">
                                  {openSections[section.id] !== false ? (
                                    <ChevronDown size={16} />
                                  ) : (
                                    <ChevronRight size={16} />
                                  )}
                                  <CardTitle className="text-xl">{section.title}</CardTitle>
                                </Button>
                              </CollapsibleTrigger>
                              
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleBookmark(section.id)}
                                  className={bookmarks.includes(section.id) ? 'text-yellow-600' : ''}
                                >
                                  <Bookmark size={16} className={bookmarks.includes(section.id) ? 'fill-current' : ''} />
                                </Button>
                              </div>
                            </div>
                          </CardHeader>
                          
                          <CollapsibleContent>
                            <CardContent>
                              <div className="prose prose-sm max-w-none">
                                <div className="whitespace-pre-wrap">{section.content}</div>
                              </div>
                              
                              {/* Note Section */}
                              <div className="mt-6 pt-4 border-t">
                                <div className="flex items-center gap-2 mb-3">
                                  <StickyNote size={16} className="text-blue-600" />
                                  <span className="text-sm font-medium">Le mie note:</span>
                                </div>
                                <Textarea
                                  placeholder="Aggiungi una nota personale per questa sezione..."
                                  value={notes[section.id] || ''}
                                  onChange={(e) => handleAddNote(section.id, e.target.value)}
                                  className="min-h-[80px]"
                                />
                              </div>
                            </CardContent>
                          </CollapsibleContent>
                        </Collapsible>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Le Mie Note</h3>
                  <Badge variant="outline">
                    {Object.keys(notes).filter(key => notes[key]).length} note salvate
                  </Badge>
                </div>
                
                {Object.entries(notes).filter(([_, note]) => note).length === 0 ? (
                  <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <StickyNote size={48} className="text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-600 mb-2">
                        Nessuna nota salvata
                      </h4>
                      <p className="text-gray-500">
                        Aggiungi note personali alle sezioni dell'handover per organizzare le tue informazioni
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {Object.entries(notes).filter(([_, note]) => note).map(([sectionId, note]) => {
                      const section = fullSections.find(s => s.id === sectionId);
                      return (
                        <Card key={sectionId}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">{section?.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="whitespace-pre-wrap text-sm">{note}</div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bookmarks" className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Sezioni Bookmark</h3>
                  <Badge variant="outline">
                    {bookmarks.length} bookmark
                  </Badge>
                </div>
                
                {bookmarks.length === 0 ? (
                  <Card className="border-dashed border-2">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <Bookmark size={48} className="text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-gray-600 mb-2">
                        Nessun bookmark salvato
                      </h4>
                      <p className="text-gray-500">
                        Aggiungi sezioni ai bookmark per accedervi rapidamente
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {bookmarks.map((sectionId) => {
                      const section = fullSections.find(s => s.id === sectionId);
                      return (
                        <Card key={sectionId} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Bookmark size={16} className="text-yellow-600 fill-current" />
                                <div>
                                  <h4 className="font-medium">{section?.title}</h4>
                                  <p className="text-sm text-gray-600 line-clamp-2">
                                    {section?.content.substring(0, 100)}...
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                              >
                                <Eye size={14} className="mr-1" />
                                Visualizza
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};