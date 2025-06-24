import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         supabaseUrl !== 'https://your-project.supabase.co' && 
         supabaseAnonKey !== 'your-anon-key' &&
         !supabaseUrl.includes('your-project');
};

// Create a mock client for when Supabase is not configured
const createMockClient = () => {
  const mockResponse = { data: null, error: new Error('Supabase not configured') };
  
  return {
    from: () => ({
      select: () => ({ 
        eq: () => ({ 
          maybeSingle: () => Promise.resolve(mockResponse),
          single: () => Promise.resolve(mockResponse),
          limit: () => Promise.resolve(mockResponse)
        }),
        limit: () => Promise.resolve(mockResponse)
      }),
      insert: () => ({ 
        select: () => ({ 
          single: () => Promise.resolve(mockResponse) 
        })
      }),
      update: () => ({ 
        eq: () => Promise.resolve(mockResponse) 
      }),
      upsert: () => Promise.resolve(mockResponse)
    }),
    auth: {
      getUser: () => Promise.resolve(mockResponse),
      signOut: () => Promise.resolve(mockResponse)
    }
  };
};

// Export either real Supabase client or mock client
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient();

// Export configuration status
export const isSupabaseReady = isSupabaseConfigured();

// Types for the database (unchanged)
export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string;
          name: string;
          domain: string | null;
          logo_url: string | null;
          settings: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          domain?: string | null;
          logo_url?: string | null;
          settings?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          domain?: string | null;
          logo_url?: string | null;
          settings?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          organization_id: string | null;
          email: string;
          full_name: string;
          avatar_url: string | null;
          role: 'admin' | 'outgoing' | 'incoming';
          department: string | null;
          position: string | null;
          phone: string | null;
          is_active: boolean;
          last_login: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          organization_id?: string | null;
          email: string;
          full_name: string;
          avatar_url?: string | null;
          role?: 'admin' | 'outgoing' | 'incoming';
          department?: string | null;
          position?: string | null;
          phone?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string | null;
          email?: string;
          full_name?: string;
          avatar_url?: string | null;
          role?: 'admin' | 'outgoing' | 'incoming';
          department?: string | null;
          position?: string | null;
          phone?: string | null;
          is_active?: boolean;
          last_login?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      templates: {
        Row: {
          id: string;
          organization_id: string;
          name: string;
          description: string | null;
          role_type: string | null;
          is_active: boolean;
          usage_count: number;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          name: string;
          description?: string | null;
          role_type?: string | null;
          is_active?: boolean;
          usage_count?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          name?: string;
          description?: string | null;
          role_type?: string | null;
          is_active?: boolean;
          usage_count?: number;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      template_sections: {
        Row: {
          id: string;
          template_id: string;
          title: string;
          description: string | null;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          template_id: string;
          title: string;
          description?: string | null;
          order_index: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          template_id?: string;
          title?: string;
          description?: string | null;
          order_index?: number;
          created_at?: string;
        };
      };
      template_questions: {
        Row: {
          id: string;
          section_id: string;
          question_text: string;
          question_type: string;
          is_required: boolean;
          order_index: number;
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          section_id: string;
          question_text: string;
          question_type?: string;
          is_required?: boolean;
          order_index: number;
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          section_id?: string;
          question_text?: string;
          question_type?: string;
          is_required?: boolean;
          order_index?: number;
          metadata?: any;
          created_at?: string;
        };
      };
      handovers: {
        Row: {
          id: string;
          organization_id: string;
          template_id: string | null;
          title: string;
          outgoing_user_id: string | null;
          incoming_user_id: string | null;
          status: 'draft' | 'pending' | 'in_progress' | 'completed' | 'expired';
          due_date: string | null;
          completion_percentage: number;
          started_at: string | null;
          completed_at: string | null;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          organization_id: string;
          template_id?: string | null;
          title: string;
          outgoing_user_id?: string | null;
          incoming_user_id?: string | null;
          status?: 'draft' | 'pending' | 'in_progress' | 'completed' | 'expired';
          due_date?: string | null;
          completion_percentage?: number;
          started_at?: string | null;
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          organization_id?: string;
          template_id?: string | null;
          title?: string;
          outgoing_user_id?: string | null;
          incoming_user_id?: string | null;
          status?: 'draft' | 'pending' | 'in_progress' | 'completed' | 'expired';
          due_date?: string | null;
          completion_percentage?: number;
          started_at?: string | null;
          completed_at?: string | null;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      handover_responses: {
        Row: {
          id: string;
          handover_id: string;
          question_id: string | null;
          response_text: string | null;
          response_data: any | null;
          is_complete: boolean;
          responded_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          handover_id: string;
          question_id?: string | null;
          response_text?: string | null;
          response_data?: any | null;
          is_complete?: boolean;
          responded_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          handover_id?: string;
          question_id?: string | null;
          response_text?: string | null;
          response_data?: any | null;
          is_complete?: boolean;
          responded_at?: string;
          updated_at?: string;
        };
      };
      handover_invitations: {
        Row: {
          id: string;
          handover_id: string;
          email: string;
          full_name: string;
          invitation_token: string;
          status: 'pending' | 'accepted' | 'expired';
          expires_at: string;
          sent_at: string;
          accepted_at: string | null;
          created_by: string | null;
        };
        Insert: {
          id?: string;
          handover_id: string;
          email: string;
          full_name: string;
          invitation_token: string;
          status?: 'pending' | 'accepted' | 'expired';
          expires_at: string;
          sent_at?: string;
          accepted_at?: string | null;
          created_by?: string | null;
        };
        Update: {
          id?: string;
          handover_id?: string;
          email?: string;
          full_name?: string;
          invitation_token?: string;
          status?: 'pending' | 'accepted' | 'expired';
          expires_at?: string;
          sent_at?: string;
          accepted_at?: string | null;
          created_by?: string | null;
        };
      };
      ai_analyses: {
        Row: {
          id: string;
          handover_id: string;
          overall_score: number | null;
          completeness_score: number | null;
          clarity_score: number | null;
          usefulness_score: number | null;
          strengths: string[] | null;
          weaknesses: string[] | null;
          critical_gaps: string[] | null;
          suggestions: string[] | null;
          analysis_data: any;
          analyzed_at: string;
          analyzed_by: string | null;
        };
        Insert: {
          id?: string;
          handover_id: string;
          overall_score?: number | null;
          completeness_score?: number | null;
          clarity_score?: number | null;
          usefulness_score?: number | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          critical_gaps?: string[] | null;
          suggestions?: string[] | null;
          analysis_data?: any;
          analyzed_at?: string;
          analyzed_by?: string | null;
        };
        Update: {
          id?: string;
          handover_id?: string;
          overall_score?: number | null;
          completeness_score?: number | null;
          clarity_score?: number | null;
          usefulness_score?: number | null;
          strengths?: string[] | null;
          weaknesses?: string[] | null;
          critical_gaps?: string[] | null;
          suggestions?: string[] | null;
          analysis_data?: any;
          analyzed_at?: string;
          analyzed_by?: string | null;
        };
      };
    };
  };
}