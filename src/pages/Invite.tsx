import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SignUp } from '@clerk/clerk-react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface InvitationData {
  id: string;
  handover_id: string;
  email: string;
  full_name: string;
  status: 'pending' | 'accepted' | 'expired';
  expires_at: string;
  handover: {
    title: string;
    status: string;
  };
}

const Invite: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [invitation, setInvitation] = useState<InvitationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get('token');

  useEffect(() => {
    const validateInvitation = async () => {
      if (!token) {
        setError('Token di invito mancante');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('handover_invitations')
          .select(`
            *,
            handover:handovers (
              title,
              status
            )
          `)
          .eq('invitation_token', token)
          .eq('status', 'pending')
          .single();

        if (error || !data) {
          setError('Invito non valido o scaduto');
          setLoading(false);
          return;
        }

        // Controlla se l'invito è scaduto
        const expiresAt = new Date(data.expires_at);
        const now = new Date();
        
        if (now > expiresAt) {
          setError('Questo invito è scaduto');
          setLoading(false);
          return;
        }

        setInvitation(data);
      } catch (err) {
        console.error('Error validating invitation:', err);
        setError('Errore durante la validazione dell\'invito');
      } finally {
        setLoading(false);
      }
    };

    validateInvitation();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-exitloop-purple mb-4" />
            <p className="text-gray-600">Validazione invito in corso...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Invito non valido</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="text-exitloop-purple hover:text-exitloop-purple/80 font-medium"
            >
              Torna alla home
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!invitation) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header con informazioni invito */}
        <Card>
          <CardHeader>
            <div className="text-center">
              <span className="text-2xl font-bold font-display bg-clip-text text-transparent bg-purple-gradient">
                Exitloop
              </span>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Sei stato invitato!
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>{invitation.full_name}</strong>, sei stato invitato a partecipare all'handover:
              </p>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="font-medium text-exitloop-purple">
                  {invitation.handover.title}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="outline">
                Email: {invitation.email}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Form di registrazione */}
        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Crea il tuo account
              </h3>
              <p className="text-sm text-gray-600">
                Registrati per accedere al tuo handover e iniziare il processo di onboarding.
              </p>
            </div>

            <SignUp
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
              signInUrl="/"
              initialValues={{
                emailAddress: invitation.email,
                firstName: invitation.full_name.split(' ')[0],
                lastName: invitation.full_name.split(' ').slice(1).join(' ')
              }}
            />
          </CardContent>
        </Card>

        {/* Informazioni aggiuntive */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center text-sm text-gray-600">
              <p className="mb-2">
                Questo invito scade il{' '}
                <strong>
                  {new Date(invitation.expires_at).toLocaleDateString('it-IT', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </strong>
              </p>
              <p>
                Registrandoti accetti i nostri{' '}
                <a href="#" className="text-exitloop-purple hover:underline">
                  Termini di Servizio
                </a>{' '}
                e la{' '}
                <a href="#" className="text-exitloop-purple hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Invite;