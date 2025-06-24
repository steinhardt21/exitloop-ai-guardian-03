import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full bg-white/90 dark:bg-exitloop-blue/90 backdrop-blur-sm z-50 py-4 shadow-sm">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold font-display bg-clip-text text-transparent bg-purple-gradient">
                Exitloop
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#problem" className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors">
                Il Problema
              </a>
              <a href="#solution" className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors">
                Soluzione
              </a>
              <a href="#benefits" className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors">
                Benefici
              </a>
              <Button onClick={() => setIsAuthModalOpen(true)}>Accedi</Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden pt-4 pb-2 flex flex-col space-y-4">
              <a
                href="#problem"
                className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Il Problema
              </a>
              <a
                href="#solution"
                className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Soluzione
              </a>
              <a
                href="#benefits"
                className="text-gray-700 dark:text-gray-300 hover:text-exitloop-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Benefici
              </a>
              <Button size="sm" className="w-full" onClick={() => setIsAuthModalOpen(true)}>
                Accedi
              </Button>
            </nav>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};