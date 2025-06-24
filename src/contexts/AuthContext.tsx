import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(false);

  // Controlla se c'è un utente salvato nel localStorage all'avvio
  useEffect(() => {
    const savedUser = localStorage.getItem('exitloop_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        localStorage.removeItem('exitloop_user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simula un delay per il login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Per demo, crea un utente basato sull'email
      let role: 'admin' | 'outgoing' | 'incoming' = 'admin';
      let position = 'Administrator';
      
      if (email.includes('outgoing') || email.includes('uscente')) {
        role = 'outgoing';
        position = 'CTO';
      } else if (email.includes('incoming') || email.includes('entrante')) {
        role = 'incoming';
        position = 'New CTO';
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        full_name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        role,
        organization_id: 'org-1',
        department: role === 'admin' ? 'HR' : 'Technology',
        position
      };

      // Salva l'utente nel localStorage
      localStorage.setItem('exitloop_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
    } catch (error) {
      throw new Error('Credenziali non valide');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('exitloop_user');
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};