import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-r from-exitloop-blue to-exitloop-blue/90 text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-text">Exitloop:</span> Il sapere rimane anche quando le persone se ne vanno
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              Il primo sistema intelligente per non perdere il know-how quando i collaboratori lasciano l'azienda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-exitloop-purple hover:bg-exitloop-purple/90">
                Registrati alla waiting list
              </Button>
            </div>
          </div>
          <div className="relative lg:pl-10 animate-fade-in">
            <div className="relative w-full h-full min-h-[320px] rounded-xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-exitloop-purple/20 rounded-full blur-3xl"></div>
              <div className="absolute -left-12 -bottom-12 w-72 h-72 bg-exitloop-light-purple/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-exitloop-purple/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-exitloop-light-purple" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.021A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Passaggio di consegne di</div>
                    <div className="font-medium">Mario Rossi - CTO</div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="text-sm mb-2">Accessi critici</div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      AWS Console (credenziali root)
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Repository privati GitHub
                    </li>
                    <li className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Documentazione progetti in corso
                    </li>
                  </ul>
                </div>
                <div className="mt-auto flex justify-between items-center">
                  <div className="text-sm">
                    <div className="text-gray-300">Completamento</div>
                    <div className="font-medium">92%</div>
                  </div>
                  <div className="bg-exitloop-purple px-3 py-1 rounded-full text-xs font-medium">
                    Verificato da AI
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};