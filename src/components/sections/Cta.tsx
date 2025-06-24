import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

export const Cta = () => {
  const [email, setEmail] = useState("");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Exitloop</span><br />
              Il sapere non va via. Rimane.
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
              Perché un'azienda non è fatta solo di persone.
              È fatta di ciò che resta quando le persone se ne vanno.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Protezione del know-how</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Preserva conoscenze e competenze critiche per l'azienda
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 flex items-center justify-center">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">Accelera l'onboarding</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Riduce del 70% il tempo necessario per rendere operativi i nuovi collaboratori
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">ROI misurabile</h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  Risparmia fino a 3 volte il costo di sostituzione di un collaboratore chiave
                </p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Sei pronto a non perdere più conoscenza aziendale?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Registrati subito e scopri come Exitloop può trasformare il turnover da problema a opportunità.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <div className="w-full sm:w-auto flex-grow">
                    <Label htmlFor="waitingListEmail" className="sr-only">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                      <Input 
                        id="waitingListEmail"
                        type="email" 
                        placeholder="Inserisci la tua email aziendale" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-exitloop-purple hover:bg-exitloop-purple/90 w-full sm:w-auto"
                  >
                    Registrati
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};