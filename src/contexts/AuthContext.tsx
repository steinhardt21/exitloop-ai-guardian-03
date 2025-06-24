import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carica il profilo utente dal database
  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      console.log('Loading profile for user:', supabaseUser.email);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        console.error('Error loading user profile:', error);
        return null;
      }

      console.log('Profile loaded successfully:', profile.email);
      
      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        role: profile.role,
        organization_id: profile.organization_id,
        department: profile.department,
        position: profile.position
      };
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      return null;
    }
  };

  // Inizializza l'autenticazione
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      console.log('Initializing auth...');
      
      try {
        // Controlla se c'è già una sessione attiva
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        if (session?.user && mounted) {
          console.log('Found existing session for:', session.user.email);
          const profile = await loadUserProfile(session.user);
          if (mounted) {
            setUser(profile);
          }
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          console.log('Auth initialization complete, setting loading to false');
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (!mounted) return;

        try {
          if (event === 'SIGNED_OUT' || !session?.user) {
            console.log('User signed out');
            setUser(null);
            return;
          }

          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            if (session?.user) {
              console.log('User signed in, loading profile...');
              const profile = await loadUserProfile(session.user);
              if (mounted) {
                setUser(profile);
              }
            }
          }
        } catch (error) {
          console.error('Error in auth state change handler:', error);
          if (mounted) {
            setUser(null);
          }
        } finally {
          if (mounted) {
            console.log('Auth state change complete, setting loading to false');
            setIsLoading(false);
          }
        }
      }
    );

    return () => {
      console.log('Cleaning up auth context');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('Starting login for:', email);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful, waiting for auth state change...');
      // Non impostare manualmente l'utente qui, lascia che lo faccia onAuthStateChange
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false); // Reset loading solo in caso di errore
      throw new Error(error instanceof Error ? error.message : 'Errore durante il login');
    }
    // Non resettare isLoading qui, lo farà onAuthStateChange
  };

  const register = async (name: string, email: string, password: string) => {
    console.log('Starting registration for:', email);
    setIsLoading(true);
    
    try {
      // Prima crea un'organizzazione di default se non esiste
      let organizationId: string;
      
      const { data: existingOrg, error: orgCheckError } = await supabase
        .from('organizations')
        .select('id')
        .eq('domain', email.split('@')[1])
        .single();

      if (orgCheckError && orgCheckError.code !== 'PGRST116') {
        throw orgCheckError;
      }

      if (existingOrg) {
        organizationId = existingOrg.id;
      } else {
        // Crea una nuova organizzazione
        const { data: newOrg, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: email.split('@')[1].split('.')[0] + ' Organization',
            domain: email.split('@')[1]
          })
          .select('id')
          .single();

        if (orgError) throw orgError;
        organizationId = newOrg.id;
      }

      // Registra l'utente in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        // Crea il profilo nel database
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            full_name: name,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
            role: 'admin',
            organization_id: organizationId
          });

        if (profileError) throw profileError;

        console.log('Registration successful, waiting for auth state change...');
        // Non impostare manualmente l'utente qui, lascia che lo faccia onAuthStateChange
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setIsLoading(false); // Reset loading solo in caso di errore
      throw new Error(error instanceof Error ? error.message : 'Errore durante la registrazione');
    }
    // Non resettare isLoading qui, lo farà onAuthStateChange
  };

  const logout = async () => {
    console.log('Starting logout...');
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      console.log('Logout successful');
      // Non impostare manualmente setUser(null), lo farà onAuthStateChange
    } catch (error) {
      console.error('Error during logout:', error);
      // Forza il logout locale anche se c'è un errore
      setUser(null);
      setIsLoading(false);
    }
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};