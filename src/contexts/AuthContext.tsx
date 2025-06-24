import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carica il profilo utente dal database quando l'utente Clerk è disponibile
  const loadUserProfile = async (clerkUserId: string, email: string) => {
    try {
      // Prima controlla se esiste già un profilo
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clerkUserId)
        .maybeSingle();

      if (existingProfile && !fetchError) {
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

      // Se non esiste, crea un nuovo profilo
      // Determina il ruolo basato sull'email per demo
      let role: 'admin' | 'outgoing' | 'incoming' = 'admin';
      let position = 'Administrator';
      let department = 'HR';
      
      if (email.includes('outgoing') || email.includes('uscente')) {
        role = 'outgoing';
        position = 'CTO';
        department = 'Technology';
      } else if (email.includes('incoming') || email.includes('entrante')) {
        role = 'incoming';
        position = 'New CTO';
        department = 'Technology';
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
          setUser(profile);
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    initializeUser();
  }, [clerkUser, isLoaded]);

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