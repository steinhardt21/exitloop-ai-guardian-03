import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { SignIn } from '@clerk/clerk-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center">
            <span className="text-2xl font-bold font-display bg-clip-text text-transparent bg-purple-gradient">
              Exitloop
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-0">
          <SignIn 
            appearance={{
              elements: {
                formButtonPrimary: 
                  'bg-exitloop-purple hover:bg-exitloop-purple/90 text-sm normal-case',
                card: 'shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButton: 
                  'border-gray-200 hover:bg-gray-50 text-gray-700',
                formFieldInput: 
                  'border-gray-200 focus:border-exitloop-purple focus:ring-exitloop-purple',
                footerActionLink: 
                  'text-exitloop-purple hover:text-exitloop-purple/80'
              },
              layout: {
                socialButtonsPlacement: 'bottom'
              }
            }}
            redirectUrl="/dashboard"
            signUpUrl="#"
          />
        </div>

        <div className="px-6 pb-6">
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Account Demo:</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <div>Puoi registrarti con qualsiasi email per testare l'applicazione</div>
              <div className="mt-2">
                <strong>Ruoli automatici basati sull'email:</strong>
              </div>
              <div>• Email con "outgoing": Dipendente Uscente</div>
              <div>• Email con "incoming": Dipendente Entrante</div>
              <div>• Altre email: Amministratore</div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 text-center text-sm text-gray-600">
          Accedendo accetti i nostri{' '}
          <a href="#" className="text-exitloop-purple hover:underline">
            Termini di Servizio
          </a>{' '}
          e la{' '}
          <a href="#" className="text-exitloop-purple hover:underline">
            Privacy Policy
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};