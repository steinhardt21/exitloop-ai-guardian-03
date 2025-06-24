/*
  # Schema completo per Exitloop - Sistema di gestione handover

  1. Tabelle Principali
    - `profiles` - Profili utenti estesi
    - `organizations` - Organizzazioni/Aziende
    - `templates` - Template per handover
    - `template_sections` - Sezioni dei template
    - `template_questions` - Domande delle sezioni
    - `handovers` - Handover attivi
    - `handover_responses` - Risposte agli handover
    - `handover_invitations` - Inviti per handover
    - `ai_analyses` - Analisi AI delle risposte

  2. Sicurezza
    - RLS abilitato su tutte le tabelle
    - Politiche per admin, utenti uscenti e entranti
    - Controllo accessi basato su organizzazione

  3. Funzionalità
    - Gestione completa del ciclo di vita handover
    - Sistema di inviti con token
    - Analisi AI delle risposte
    - Audit trail completo
*/

-- Estensioni necessarie
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum per i ruoli utente
CREATE TYPE user_role AS ENUM ('admin', 'outgoing', 'incoming');

-- Enum per gli stati handover
CREATE TYPE handover_status AS ENUM ('draft', 'pending', 'in_progress', 'completed', 'expired');

-- Enum per gli stati invito
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired');

-- Tabella organizzazioni
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  domain text UNIQUE,
  logo_url text,
  settings jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella profili utenti estesi
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  role user_role DEFAULT 'incoming',
  department text,
  position text,
  phone text,
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella template
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  role_type text,
  is_active boolean DEFAULT true,
  usage_count integer DEFAULT 0,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella sezioni template
CREATE TABLE IF NOT EXISTS template_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES templates(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tabella domande template
CREATE TABLE IF NOT EXISTS template_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid REFERENCES template_sections(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  question_type text DEFAULT 'text',
  is_required boolean DEFAULT true,
  order_index integer NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Tabella handover
CREATE TABLE IF NOT EXISTS handovers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  template_id uuid REFERENCES templates(id),
  title text NOT NULL,
  outgoing_user_id uuid REFERENCES profiles(id),
  incoming_user_id uuid REFERENCES profiles(id),
  status handover_status DEFAULT 'draft',
  due_date timestamptz,
  completion_percentage integer DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_by uuid REFERENCES profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella risposte handover
CREATE TABLE IF NOT EXISTS handover_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handover_id uuid REFERENCES handovers(id) ON DELETE CASCADE,
  question_id uuid REFERENCES template_questions(id),
  response_text text,
  response_data jsonb,
  is_complete boolean DEFAULT false,
  responded_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabella inviti handover
CREATE TABLE IF NOT EXISTS handover_invitations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handover_id uuid REFERENCES handovers(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL,
  invitation_token text UNIQUE NOT NULL,
  status invitation_status DEFAULT 'pending',
  expires_at timestamptz NOT NULL,
  sent_at timestamptz DEFAULT now(),
  accepted_at timestamptz,
  created_by uuid REFERENCES profiles(id)
);

-- Tabella analisi AI
CREATE TABLE IF NOT EXISTS ai_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handover_id uuid REFERENCES handovers(id) ON DELETE CASCADE,
  overall_score integer CHECK (overall_score >= 0 AND overall_score <= 100),
  completeness_score integer CHECK (completeness_score >= 0 AND completeness_score <= 100),
  clarity_score integer CHECK (clarity_score >= 0 AND clarity_score <= 100),
  usefulness_score integer CHECK (usefulness_score >= 0 AND usefulness_score <= 100),
  strengths text[],
  weaknesses text[],
  critical_gaps text[],
  suggestions text[],
  analysis_data jsonb DEFAULT '{}',
  analyzed_at timestamptz DEFAULT now(),
  analyzed_by uuid REFERENCES profiles(id)
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_profiles_organization ON profiles(organization_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_templates_organization ON templates(organization_id);
CREATE INDEX IF NOT EXISTS idx_handovers_organization ON handovers(organization_id);
CREATE INDEX IF NOT EXISTS idx_handovers_outgoing_user ON handovers(outgoing_user_id);
CREATE INDEX IF NOT EXISTS idx_handovers_status ON handovers(status);
CREATE INDEX IF NOT EXISTS idx_handover_responses_handover ON handover_responses(handover_id);
CREATE INDEX IF NOT EXISTS idx_invitations_token ON handover_invitations(invitation_token);
CREATE INDEX IF NOT EXISTS idx_invitations_email ON handover_invitations(email);

-- Trigger per aggiornare updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_handovers_updated_at BEFORE UPDATE ON handovers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_responses_updated_at BEFORE UPDATE ON handover_responses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Funzione per calcolare percentuale completamento
CREATE OR REPLACE FUNCTION calculate_handover_completion(handover_uuid uuid)
RETURNS integer AS $$
DECLARE
  total_questions integer;
  completed_responses integer;
  completion_percentage integer;
BEGIN
  -- Conta il totale delle domande per questo handover
  SELECT COUNT(tq.id) INTO total_questions
  FROM template_questions tq
  JOIN template_sections ts ON tq.section_id = ts.id
  JOIN handovers h ON ts.template_id = h.template_id
  WHERE h.id = handover_uuid;
  
  -- Conta le risposte complete
  SELECT COUNT(hr.id) INTO completed_responses
  FROM handover_responses hr
  WHERE hr.handover_id = handover_uuid 
  AND hr.is_complete = true;
  
  -- Calcola la percentuale
  IF total_questions > 0 THEN
    completion_percentage := ROUND((completed_responses::float / total_questions::float) * 100);
  ELSE
    completion_percentage := 0;
  END IF;
  
  -- Aggiorna l'handover
  UPDATE handovers 
  SET completion_percentage = completion_percentage
  WHERE id = handover_uuid;
  
  RETURN completion_percentage;
END;
$$ LANGUAGE plpgsql;

-- Trigger per aggiornare automaticamente la percentuale di completamento
CREATE OR REPLACE FUNCTION update_handover_completion()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM calculate_handover_completion(NEW.handover_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_completion 
  AFTER INSERT OR UPDATE ON handover_responses 
  FOR EACH ROW EXECUTE FUNCTION update_handover_completion();

-- Abilitazione RLS
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE template_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE handovers ENABLE ROW LEVEL SECURITY;
ALTER TABLE handover_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE handover_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses ENABLE ROW LEVEL SECURITY;

-- Politiche RLS per organizations
CREATE POLICY "Users can view their organization" ON organizations
  FOR SELECT TO authenticated
  USING (id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can manage their organization" ON organizations
  FOR ALL TO authenticated
  USING (id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Politiche RLS per profiles
CREATE POLICY "Users can view profiles in their organization" ON profiles
  FOR SELECT TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can manage profiles in their organization" ON profiles
  FOR ALL TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Politiche RLS per templates
CREATE POLICY "Users can view templates in their organization" ON templates
  FOR SELECT TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can manage templates in their organization" ON templates
  FOR ALL TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Politiche RLS per template_sections
CREATE POLICY "Users can view template sections" ON template_sections
  FOR SELECT TO authenticated
  USING (template_id IN (
    SELECT t.id FROM templates t 
    JOIN profiles p ON t.organization_id = p.organization_id 
    WHERE p.id = auth.uid()
  ));

CREATE POLICY "Admins can manage template sections" ON template_sections
  FOR ALL TO authenticated
  USING (template_id IN (
    SELECT t.id FROM templates t 
    JOIN profiles p ON t.organization_id = p.organization_id 
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ));

-- Politiche RLS per template_questions
CREATE POLICY "Users can view template questions" ON template_questions
  FOR SELECT TO authenticated
  USING (section_id IN (
    SELECT ts.id FROM template_sections ts
    JOIN templates t ON ts.template_id = t.id
    JOIN profiles p ON t.organization_id = p.organization_id 
    WHERE p.id = auth.uid()
  ));

CREATE POLICY "Admins can manage template questions" ON template_questions
  FOR ALL TO authenticated
  USING (section_id IN (
    SELECT ts.id FROM template_sections ts
    JOIN templates t ON ts.template_id = t.id
    JOIN profiles p ON t.organization_id = p.organization_id 
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ));

-- Politiche RLS per handovers
CREATE POLICY "Users can view handovers in their organization" ON handovers
  FOR SELECT TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid()));

CREATE POLICY "Users can view their own handovers" ON handovers
  FOR SELECT TO authenticated
  USING (outgoing_user_id = auth.uid() OR incoming_user_id = auth.uid());

CREATE POLICY "Admins can manage handovers in their organization" ON handovers
  FOR ALL TO authenticated
  USING (organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Outgoing users can update their handovers" ON handovers
  FOR UPDATE TO authenticated
  USING (outgoing_user_id = auth.uid());

-- Politiche RLS per handover_responses
CREATE POLICY "Users can view responses for their handovers" ON handover_responses
  FOR SELECT TO authenticated
  USING (handover_id IN (
    SELECT h.id FROM handovers h 
    WHERE h.outgoing_user_id = auth.uid() 
    OR h.incoming_user_id = auth.uid()
    OR h.organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin')
  ));

CREATE POLICY "Outgoing users can manage their responses" ON handover_responses
  FOR ALL TO authenticated
  USING (handover_id IN (SELECT id FROM handovers WHERE outgoing_user_id = auth.uid()));

-- Politiche RLS per handover_invitations
CREATE POLICY "Admins can manage invitations in their organization" ON handover_invitations
  FOR ALL TO authenticated
  USING (handover_id IN (
    SELECT h.id FROM handovers h
    JOIN profiles p ON h.organization_id = p.organization_id
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ));

CREATE POLICY "Users can view invitations sent to them" ON handover_invitations
  FOR SELECT TO authenticated
  USING (email IN (SELECT email FROM profiles WHERE id = auth.uid()));

-- Politiche RLS per ai_analyses
CREATE POLICY "Users can view AI analyses for their handovers" ON ai_analyses
  FOR SELECT TO authenticated
  USING (handover_id IN (
    SELECT h.id FROM handovers h 
    WHERE h.outgoing_user_id = auth.uid() 
    OR h.incoming_user_id = auth.uid()
    OR h.organization_id IN (SELECT organization_id FROM profiles WHERE id = auth.uid() AND role = 'admin')
  ));

CREATE POLICY "Admins can manage AI analyses in their organization" ON ai_analyses
  FOR ALL TO authenticated
  USING (handover_id IN (
    SELECT h.id FROM handovers h
    JOIN profiles p ON h.organization_id = p.organization_id
    WHERE p.id = auth.uid() AND p.role = 'admin'
  ));