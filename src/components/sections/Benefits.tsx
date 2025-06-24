import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export const Benefits = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <section id="benefits" className="py-20 bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">
              Perché <span className="gradient-text">Exitloop</span> è diverso
            </h2>
            <p className="section-subtitle">
              Non una semplice checklist o knowledge base, ma un sistema intelligente che preserva tutto il valore aziendale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {differentiators.map((diff, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-exitloop-soft-purple text-exitloop-purple flex items-center justify-center mb-4">
                    {diff.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{diff.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{diff.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-exitloop-blue to-exitloop-blue/90 rounded-2xl overflow-hidden shadow-xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Chi ha Exitloop non teme il turnover
                </h3>
                <ul className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center text-white">
                      <svg className="h-6 w-6 text-exitloop-light-purple mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-exitloop-purple hover:bg-exitloop-purple/90"
                    onClick={() => setIsAuthModalOpen(true)}
                  >
                    Accedi
                  </Button>
                </div>
              </div>
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-radial from-exitloop-light-purple/20 to-transparent blur-2xl"></div>
                <blockquote className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 italic text-gray-100">
                  <svg className="absolute top-3 left-3 h-8 w-8 text-white/20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-xl relative z-10">
                    "Grazie a Exitloop, la partenza del nostro CTO dopo 8 anni è stata gestita senza intoppi. Tutto il know-how è rimasto in azienda e il nuovo responsabile è diventato operativo in tempi record."
                  </p>
                  <footer className="mt-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Laura Ferrari</p>
                      <p className="text-sm text-gray-300">HR Director, TechFuture SPA</p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

const differentiators = [
  {
    title: "Guidato da intelligenza artificiale",
    description: "Non chiede semplicemente 'hai fatto tutto?', ma estrae in modo intelligente ciò che serve davvero sapere.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: "Adattivo",
    description: "Si adatta in modo dinamico al ruolo, al contesto e ai progetti specifici di ogni collaboratore.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Conversazionale",
    description: "Crea un clone digitale della mente operativa in uscita, consultabile come un vero collaboratore.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: "Antifragile",
    description: "Funziona anche se la sostituzione è in ritardo o il passaggio non è stato fatto in tempo.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Proattivo per HR",
    description: "Invia alert intelligenti se mancano informazioni chiave. Nessuna perdita nascosta.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  {
    title: "Integrato con i tuoi sistemi",
    description: "Si connette con i sistemi aziendali esistenti per una gestione fluida di tutte le informazioni.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
      </svg>
    ),
  },
];

const benefits = [
  "HR più serena e team più resiliente",
  "Manager più efficaci nella gestione del turnover",
  "Onboarding più rapido e produttivo",
  "Continuità operativa garantita",
  "Riduzione significativa dei costi di sostituzione"
];