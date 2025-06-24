import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'admin' | 'outgoing' | 'incoming';
  organization_id?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carica il profilo utente dal database quando l'utente Clerk è disponibile
  const loadUserProfile = async (clerkUserId: string, email: string) => {
    try {
      console.log('Loading profile for email:', email);
      
      // Prima controlla se esiste già un profilo
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clerkUserId)
        .maybeSingle();

      if (existingProfile && !fetchError) {
        console.log('Found existing profile:', existingProfile);
        return {
          id: existingProfile.id,
          email: existingProfile.email,
          full_name: existingProfile.full_name,
          avatar_url: existingProfile.avatar_url,
          role: existingProfile.role,
          organization_id: existingProfile.organization_id,
          department: existingProfile.department,
          position: existingProfile.position
        };
      }

      console.log('Creating new profile for:', email);

      // Se non esiste, crea un nuovo profilo
      // Controlla se c'è un invitation token nell'URL
      const invitationToken = searchParams.get('token');
      let role: 'admin' | 'outgoing' | 'incoming' = 'admin'; // DEFAULT SEMPRE ADMIN
      let position = 'Administrator';
      let department = 'Management';
      
      if (invitationToken) {
        console.log('Found invitation token, checking invitation...');
        // Verifica l'invito e determina il ruolo
        const { data: invitation, error: inviteError } = await supabase
          .from('handover_invitations')
          .select(`
            *,
            handover:handovers (
              outgoing_user_id,
              incoming_user_id
            )
          `)
          .eq('invitation_token', invitationToken)
          .eq('email', email)
          .eq('status', 'pending')
          .single();

        if (!inviteError && invitation) {
          // Controlla se l'invito è ancora valido
          const expiresAt = new Date(invitation.expires_at);
          const now = new Date();
          
          if (now <= expiresAt) {
            // Determina il ruolo basato sull'handover
            // Se l'handover ha già un outgoing_user_id, questo utente è incoming
            // Altrimenti è outgoing
            if (invitation.handover.outgoing_user_id) {
              role = 'incoming';
              position = 'New Employee';
              department = 'Various';
            } else {
              role = 'outgoing';
              position = 'Departing Employee';
              department = 'Various';
            }

            // Aggiorna lo stato dell'invito
            await supabase
              .from('handover_invitations')
              .update({ 
                status: 'accepted',
                accepted_at: new Date().toISOString()
              })
              .eq('id', invitation.id);
          }
        }
      } else {
        // SOLO per testing: determina il ruolo basato sull'email
        const emailLower = email.toLowerCase();
        
        // Parole chiave per ruolo outgoing
        const outgoingKeywords = ['outgoing', 'uscente', 'leaving', 'departing', 'exit'];
        // Parole chiave per ruolo incoming  
        const incomingKeywords = ['incoming', 'entrante', 'new', 'nuovo', 'onboarding'];
        
        const isOutgoing = outgoingKeywords.some(keyword => emailLower.includes(keyword));
        const isIncoming = incomingKeywords.some(keyword => emailLower.includes(keyword));
        
        if (isOutgoing) {
          role = 'outgoing';
          position = 'CTO';
          department = 'Technology';
        } else if (isIncoming) {
          role = 'incoming';
          position = 'New CTO';
          department = 'Technology';
        }
        // Altrimenti rimane admin (default)
      }

      // Crea una nuova organizzazione se non esiste
      let organizationId = 'default-org-id';
      const { data: org } = await supabase
        .from('organizations')
        .select('id')
        .eq('name', 'TechCorp')
        .maybeSingle();

      if (!org) {
        const { data: newOrg, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: 'TechCorp',
            domain: 'techcorp.it'
          })
          .select('id')
          .single();

        if (!orgError && newOrg) {
          organizationId = newOrg.id;
        }
      } else {
        organizationId = org.id;
      }

      // Crea il nuovo profilo
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          id: clerkUserId,
          email,
          full_name: clerkUser?.fullName || email.split('@')[0].replace('.', ' '),
          avatar_url: clerkUser?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          role,
          organization_id: organizationId,
          department,
          position
        })
        .select()
        .single();

      if (createError) {
        console.error('Error creating profile:', createError);
        return null;
      }

      console.log('Created new profile with role:', role, 'for email:', email);

      return {
        id: newProfile.id,
        email: newProfile.email,
        full_name: newProfile.full_name,
        avatar_url: newProfile.avatar_url,
        role: newProfile.role,
        organization_id: newProfile.organization_id,
        department: newProfile.department,
        position: newProfile.position
      };
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      if (!isLoaded) {
        return;
      }

      if (clerkUser) {
        const email = clerkUser.primaryEmailAddress?.emailAddress;
        if (email) {
          const profile = await loadUserProfile(clerkUser.id, email);
          console.log('Final loaded profile:', profile);
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    initializeUser();
  }, [clerkUser, isLoaded, searchParams]);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const value = {
    user,
    isLoading: isLoading || !isLoaded,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};