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
  supabaseConnected: boolean;
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
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  // Check if Supabase is properly configured
  const checkSupabaseConnection = async () => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      // Check if environment variables are set to placeholder values
      if (!supabaseUrl || !supabaseKey || 
          supabaseUrl === 'https://your-project.supabase.co' || 
          supabaseKey === 'your-anon-key') {
        console.warn('Supabase not configured. Using mock user data.');
        return false;
      }

      // Test the connection with a simple query
      const { error } = await supabase.from('organizations').select('id').limit(1);
      if (error) {
        console.warn('Supabase connection failed:', error.message);
        return false;
      }
      
      return true;
    } catch (error) {
      console.warn('Supabase connection test failed:', error);
      return false;
    }
  };

  // Create a mock user when Supabase is not available
  const createMockUser = (clerkUserId: string, email: string): User => {
    const emailLower = email.toLowerCase();
    
    // Determine role based on email patterns
    let role: 'admin' | 'outgoing' | 'incoming' = 'admin';
    let position = 'Administrator';
    let department = 'Management';
    
    const outgoingKeywords = ['outgoing', 'uscente', 'leaving', 'departing', 'exit'];
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

    return {
      id: clerkUserId,
      email,
      full_name: clerkUser?.fullName || email.split('@')[0].replace('.', ' '),
      avatar_url: clerkUser?.imageUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role,
      organization_id: 'mock-org-id',
      department,
      position
    };
  };

  // Load user profile from database when Clerk user is available
  const loadUserProfile = async (clerkUserId: string, email: string) => {
    try {
      // Check if Supabase is connected
      const isConnected = await checkSupabaseConnection();
      setSupabaseConnected(isConnected);
      
      if (!isConnected) {
        // Return mock user if Supabase is not connected
        return createMockUser(clerkUserId, email);
      }

      // First check if profile already exists
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

      // If doesn't exist, create new profile
      // Check if there's an invitation token in URL
      const invitationToken = searchParams.get('token');
      let role: 'admin' | 'outgoing' | 'incoming' = 'admin'; // DEFAULT ADMIN
      let position = 'Administrator';
      let department = 'Management';
      
      if (invitationToken) {
        // Verify invitation and determine role
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
          // Check if invitation is still valid
          const expiresAt = new Date(invitation.expires_at);
          const now = new Date();
          
          if (now <= expiresAt) {
            // Determine role based on handover
            // If handover already has outgoing_user_id, this user is incoming
            // Otherwise is outgoing
            if (invitation.handover.outgoing_user_id) {
              role = 'incoming';
              position = 'New Employee';
              department = 'Various';
            } else {
              role = 'outgoing';
              position = 'Departing Employee';
              department = 'Various';
            }

            // Update invitation status
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
        // Improved logic to determine role based on email
        const emailLower = email.toLowerCase();
        
        // Keywords for outgoing role
        const outgoingKeywords = ['outgoing', 'uscente', 'leaving', 'departing', 'exit'];
        // Keywords for incoming role
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
        // Otherwise remains admin (default)
      }

      // Create new organization if doesn't exist
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

      // Create new profile
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
        // Fallback to mock user if database creation fails
        return createMockUser(clerkUserId, email);
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
      // Fallback to mock user on any error
      return createMockUser(clerkUserId, email);
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
          console.log('Loading profile for email:', email);
          const profile = await loadUserProfile(clerkUser.id, email);
          console.log('Loaded profile:', profile);
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
    logout,
    supabaseConnected
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};