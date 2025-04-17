
export const Problem = () => {
  return (
    <section id="problem" className="py-20 bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-title">
            <span className="gradient-text">Il problema</span> è reale. E sta peggiorando.
          </h2>
          <p className="section-subtitle">
            Ogni volta che un collaboratore se ne va, preziose conoscenze aziendali rischiano di andare perdute per sempre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problemPoints.map((point, index) => (
            <div 
              key={index} 
              className="feature-card bg-white dark:bg-gray-800 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="h-12 w-12 bg-exitloop-soft-purple text-exitloop-purple rounded-lg mb-4 flex items-center justify-center">
                {point.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{point.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Il preavviso di 40 giorni sembra tanto.<br />
                <span className="text-exitloop-purple">Ma non lo è.</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Tra colloqui, selezione e onboarding, il tempo non è mai abbastanza. L'azienda perde conoscenze critiche, contatti strategici e competenze operative. E chi entra... riparte da zero.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-radial from-exitloop-soft-purple to-transparent opacity-20 rounded-full blur-2xl"></div>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80" 
                  alt="La sfida del turnover" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const problemPoints = [
  {
    title: "Tempi di passaggio insufficienti",
    description: "Il tempo per fare il passaggio di consegne non basta mai, lasciando lacune critiche nella conoscenza aziendale.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Ritardi nella sostituzione",
    description: "La persona giusta per rimpiazzare chi va via raramente arriva in tempo, creando vuoti operativi.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    title: "Perdita di know-how",
    description: "Conoscenze cruciali, processi informali e contatti strategici si dissolvono quando il collaboratore esce.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
];
