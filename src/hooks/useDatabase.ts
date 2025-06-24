import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

// Hook per gestire i template
export const useTemplates = () => {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('templates')
        .select(`
          *,
          template_sections (
            *,
            template_questions (*)
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Trasforma i dati nel formato atteso dal frontend
      const formattedTemplates = data?.map(template => ({
        id: template.id,
        name: template.name,
        description: template.description,
        role_type: template.role_type,
        usage_count: template.usage_count,
        created_at: template.created_at,
        created_by: template.created_by,
        sections: template.template_sections?.map((section: any) => ({
          id: section.id,
          title: section.title,
          description: section.description,
          order_index: section.order_index,
          questions: section.template_questions?.map((question: any) => ({
            id: question.id,
            text: question.question_text,
            type: question.question_type,
            required: question.is_required,
            order_index: question.order_index
          })) || []
        })) || []
      })) || [];

      setTemplates(formattedTemplates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento template');
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (templateData: any) => {
    try {
      // Crea il template
      const { data: template, error: templateError } = await supabase
        .from('templates')
        .insert({
          name: templateData.name,
          description: templateData.description,
          role_type: templateData.name,
          organization_id: user?.organization_id,
          created_by: user?.id
        })
        .select()
        .single();

      if (templateError) throw templateError;

      // Crea le sezioni e domande
      for (const section of templateData.sections) {
        const { data: sectionData, error: sectionError } = await supabase
          .from('template_sections')
          .insert({
            template_id: template.id,
            title: section.title,
            description: section.description,
            order_index: section.order_index || 1
          })
          .select()
          .single();

        if (sectionError) throw sectionError;

        // Crea le domande per questa sezione
        if (section.questions && section.questions.length > 0) {
          const questions = section.questions.map((question: any, index: number) => ({
            section_id: sectionData.id,
            question_text: question.text,
            question_type: question.type || 'textarea',
            is_required: question.required !== false,
            order_index: index + 1
          }));

          const { error: questionsError } = await supabase
            .from('template_questions')
            .insert(questions);

          if (questionsError) throw questionsError;
        }
      }

      await fetchTemplates();
      return template;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Errore nella creazione del template');
    }
  };

  const updateTemplate = async (templateId: string, templateData: any) => {
    try {
      // Aggiorna il template
      const { error: templateError } = await supabase
        .from('templates')
        .update({
          name: templateData.name,
          description: templateData.description,
          role_type: templateData.name
        })
        .eq('id', templateId);

      if (templateError) throw templateError;

      // Elimina sezioni e domande esistenti
      const { error: deleteError } = await supabase
        .from('template_sections')
        .delete()
        .eq('template_id', templateId);

      if (deleteError) throw deleteError;

      // Ricrea sezioni e domande
      for (const section of templateData.sections) {
        const { data: sectionData, error: sectionError } = await supabase
          .from('template_sections')
          .insert({
            template_id: templateId,
            title: section.title,
            description: section.description,
            order_index: section.order_index || 1
          })
          .select()
          .single();

        if (sectionError) throw sectionError;

        if (section.questions && section.questions.length > 0) {
          const questions = section.questions.map((question: any, index: number) => ({
            section_id: sectionData.id,
            question_text: question.text,
            question_type: question.type || 'textarea',
            is_required: question.required !== false,
            order_index: index + 1
          }));

          const { error: questionsError } = await supabase
            .from('template_questions')
            .insert(questions);

          if (questionsError) throw questionsError;
        }
      }

      await fetchTemplates();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Errore nell\'aggiornamento del template');
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .update({ is_active: false })
        .eq('id', templateId);

      if (error) throw error;
      await fetchTemplates();
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Errore nell\'eliminazione del template');
    }
  };

  useEffect(() => {
    if (user) {
      fetchTemplates();
    }
  }, [user]);

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    refetch: fetchTemplates
  };
};

// Hook per gestire gli handover
export const useHandovers = () => {
  const [handovers, setHandovers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchHandovers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('handovers')
        .select(`
          *,
          templates (name),
          outgoing_user:profiles!handovers_outgoing_user_id_fkey (full_name, email, avatar_url),
          incoming_user:profiles!handovers_incoming_user_id_fkey (full_name, email, avatar_url),
          handover_responses (
            *,
            template_questions (*)
          ),
          ai_analyses (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedHandovers = data?.map(handover => ({
        id: handover.id,
        title: handover.title,
        employee: handover.outgoing_user?.full_name || 'N/A',
        email: handover.outgoing_user?.email || 'N/A',
        status: handover.status,
        completion: handover.completion_percentage,
        dueDate: handover.due_date,
        createdAt: handover.created_at,
        templateName: handover.templates?.name || 'N/A',
        avatar: handover.outgoing_user?.avatar_url,
        responses: handover.handover_responses || [],
        aiAnalysis: handover.ai_analyses?.[0] || null
      })) || [];

      setHandovers(formattedHandovers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore nel caricamento handover');
    } finally {
      setLoading(false);
    }
  };

  const createHandover = async (handoverData: any) => {
    try {
      const { data: handover, error: handoverError } = await supabase
        .from('handovers')
        .insert({
          title: handoverData.title,
          template_id: handoverData.templateId,
          organization_id: user?.organization_id,
          due_date: handoverData.dueDate,
          status: 'pending',
          created_by: user?.id
        })
        .select()
        .single();

      if (handoverError) throw handoverError;

      // Crea l'invito
      const { error: inviteError } = await supabase
        .from('handover_invitations')
        .insert({
          handover_id: handover.id,
          email: handoverData.email,
          full_name: handoverData.personName,
          invitation_token: `inv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          expires_at: handoverData.dueDate,
          created_by: user?.id
        });

      if (inviteError) throw inviteError;

      await fetchHandovers();
      return handover;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Errore nella creazione dell\'handover');
    }
  };

  const runAIAnalysis = async (handoverId: string) => {
    try {
      // Simula analisi AI (in produzione qui ci sarebbe la chiamata all'AI)
      const mockAnalysis = {
        handover_id: handoverId,
        overall_score: Math.floor(Math.random() * 40) + 60,
        completeness_score: Math.floor(Math.random() * 30) + 70,
        clarity_score: Math.floor(Math.random() * 35) + 65,
        usefulness_score: Math.floor(Math.random() * 25) + 75,
        strengths: [
          "Descrizione chiara delle responsabilità principali",
          "Buona documentazione dei tool utilizzati",
          "Contatti ben organizzati e aggiornati"
        ],
        weaknesses: [
          "Mancano dettagli sui processi di backup",
          "Informazioni incomplete sui progetti in corso"
        ],
        critical_gaps: [
          "Password e credenziali di accesso non documentate",
          "Manca la documentazione del processo di deploy"
        ],
        suggestions: [
          "Aggiungere più dettagli sui processi di escalation",
          "Specificare meglio i contatti di emergenza",
          "Includere esempi pratici per le procedure complesse"
        ],
        analyzed_by: user?.id
      };

      const { error } = await supabase
        .from('ai_analyses')
        .upsert(mockAnalysis);

      if (error) throw error;

      await fetchHandovers();
      return mockAnalysis;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Errore nell\'analisi AI');
    }
  };

  useEffect(() => {
    if (user) {
      fetchHandovers();
    }
  }, [user]);

  return {
    handovers,
    loading,
    error,
    createHandover,
    runAIAnalysis,
    refetch: fetchHandovers
  };
};