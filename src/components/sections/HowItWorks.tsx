
export const HowItWorks = () => {
  return (
    <section id="solution" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            Come funziona <span className="gradient-text">Exitloop</span>
          </h2>
          <p className="section-subtitle">
            Un'app AI-first che guida, struttura e preserva tutto ciò che serve sapere prima che sia troppo tardi.
            Funziona anche quando le persone sono già andate via.
          </p>
        </div>

        {steps.map((step, index) => (
          <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center mb-24 last:mb-0`}>
            <div className="flex-1 animate-fade-in" style={{ animationDelay: '150ms' }}>
              <div className="inline-block bg-exitloop-purple text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Step {index + 1}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{step.description}</p>
              
              <ul className="space-y-3">
                {step.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="shrink-0 h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1">
                      <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
                <div className="absolute inset-0 bg-gradient-radial from-exitloop-soft-purple to-transparent opacity-10 blur-2xl"></div>
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const steps = [
  {
    title: "Questionari intelligenti su misura",
    description: "L'AI guida ogni uscente con domande personalizzate sul proprio ruolo, assicurando che nessun dettaglio importante venga dimenticato.",
    features: [
      "Nessun dettaglio importante viene dimenticato",
      "Nessuna informazione vaga o dispersiva",
      "Sistemi intelligenti di controllo incrociato verificano la completezza",
      "Alert intelligenti per HR se mancano dati critici"
    ],
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Conversazione con l'AI del predecessore",
    description: "Chi entra può interrogare un assistente AI addestrato sulle informazioni raccolte, come se stesse parlando con chi c'era prima.",
    features: [
      "Interazione naturale tramite chat con l'AI",
      "Risposte immediate anche a mesi dall'uscita del collaboratore",
      "Accesso a conoscenze specifiche e contestuali",
      "Possibilità di approfondire qualsiasi aspetto del ruolo"
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Documentazione automatica e navigabile",
    description: "Tutto viene trasformato in risorse strutturate e facilmente consultabili per garantire un onboarding efficace e una transizione senza intoppi.",
    features: [
      "Wiki di ruolo completa e personalizzata",
      "PDF pronti per l'onboarding",
      "Timeline delle attività aperte",
      "Identificazione dei punti critici da affrontare subito"
    ],
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
  }
];
