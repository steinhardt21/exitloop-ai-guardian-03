-- Inserimento organizzazione di esempio (solo se non esiste)
INSERT INTO organizations (id, name, domain, logo_url, settings) 
SELECT 
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'TechCorp Italia',
  'techcorp.it',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
  '{"timezone": "Europe/Rome", "language": "it", "features": ["ai_analysis", "advanced_templates"]}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM organizations WHERE id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
);

-- Inserimento profili utenti (solo se non esistono)
INSERT INTO profiles (id, organization_id, email, full_name, avatar_url, role, department, position, phone, is_active)
SELECT * FROM (VALUES
  -- Admin
  (
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@techcorp.it',
    'Alessandro Rossi',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=alessandro',
    'admin'::user_role,
    'HR',
    'HR Director',
    '+39 02 1234567',
    true
  ),
  -- Utenti uscenti
  (
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'marco.bianchi@techcorp.it',
    'Marco Bianchi',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
    'outgoing'::user_role,
    'Technology',
    'CTO',
    '+39 02 1234568',
    true
  ),
  (
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'laura.verdi@techcorp.it',
    'Laura Verdi',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=laura',
    'outgoing'::user_role,
    'Marketing',
    'Marketing Manager',
    '+39 02 1234569',
    true
  ),
  (
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'andrea.neri@techcorp.it',
    'Andrea Neri',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=andrea',
    'outgoing'::user_role,
    'Technology',
    'Senior Frontend Developer',
    '+39 02 1234570',
    true
  ),
  -- Utenti entranti
  (
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'sofia.ferrari@techcorp.it',
    'Sofia Ferrari',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    'incoming'::user_role,
    'Technology',
    'New CTO',
    '+39 02 1234571',
    true
  ),
  (
    'g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'giulia.colombo@techcorp.it',
    'Giulia Colombo',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=giulia',
    'incoming'::user_role,
    'Marketing',
    'New Marketing Manager',
    '+39 02 1234572',
    true
  )
) AS new_profiles(id, organization_id, email, full_name, avatar_url, role, department, position, phone, is_active)
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = new_profiles.id
);

-- Inserimento template (solo se non esistono)
INSERT INTO templates (id, organization_id, name, description, role_type, usage_count, created_by)
SELECT * FROM (VALUES
  (
    'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'CTO Handover',
    'Template completo per il passaggio di consegne del Chief Technology Officer',
    'CTO',
    5,
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Marketing Manager',
    'Template per il passaggio di consegne del Marketing Manager',
    'Marketing Manager',
    3,
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Developer Senior',
    'Template per sviluppatori senior che lasciano l''azienda',
    'Senior Developer',
    8,
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'k0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Sales Manager',
    'Template per responsabili vendite',
    'Sales Manager',
    2,
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  )
) AS new_templates(id, organization_id, name, description, role_type, usage_count, created_by)
WHERE NOT EXISTS (
  SELECT 1 FROM templates WHERE id = new_templates.id
);

-- Inserimento sezioni template CTO (solo se non esistono)
INSERT INTO template_sections (id, template_id, title, description, order_index)
SELECT * FROM (VALUES
  ('l1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Responsabilità Tecniche', 'Panoramica delle responsabilità tecniche principali', 1),
  ('m2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Progetti in Corso', 'Stato dei progetti attualmente in sviluppo', 2),
  ('n3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Accessi e Credenziali', 'Sistemi critici e accessi da trasferire', 3),
  ('o4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Team e Contatti', 'Informazioni sul team e contatti chiave', 4)
) AS new_sections(id, template_id, title, description, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM template_sections WHERE id = new_sections.id
);

-- Inserimento sezioni template Marketing Manager (solo se non esistono)
INSERT INTO template_sections (id, template_id, title, description, order_index)
SELECT * FROM (VALUES
  ('p5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Campagne Attive', 'Campagne marketing attualmente in corso', 1),
  ('q6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Tool e Processi', 'Strumenti e processi utilizzati quotidianamente', 2),
  ('r7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Budget e Fornitori', 'Gestione budget e rapporti con fornitori', 3)
) AS new_sections(id, template_id, title, description, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM template_sections WHERE id = new_sections.id
);

-- Inserimento sezioni template Developer Senior (solo se non esistono)
INSERT INTO template_sections (id, template_id, title, description, order_index)
SELECT * FROM (VALUES
  ('s8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Codice e Repository', 'Repository e codice di cui sei responsabile', 1),
  ('t9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Deployment e CI/CD', 'Processi di deployment e integrazione continua', 2),
  ('u0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Documentazione Tecnica', 'Documentazione e knowledge base', 3)
) AS new_sections(id, template_id, title, description, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM template_sections WHERE id = new_sections.id
);

-- Inserimento domande template CTO (solo se non esistono)
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index)
SELECT * FROM (VALUES
  -- Responsabilità Tecniche
  ('v1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'l1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali sono le principali responsabilità tecniche del tuo ruolo?', 'textarea', true, 1),
  ('w2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'l1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Chi sono i referenti tecnici chiave interni ed esterni?', 'textarea', true, 2),
  ('x3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'l1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali decisioni tecniche strategiche sono in sospeso?', 'textarea', true, 3),

  -- Progetti in Corso
  ('y4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'm2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali progetti sono attualmente in sviluppo?', 'textarea', true, 1),
  ('z5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'm2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Qual è lo stato di avanzamento di ciascun progetto?', 'textarea', true, 2),
  ('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'm2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Ci sono blocchi o rischi critici da segnalare?', 'textarea', true, 3),

  -- Accessi e Credenziali
  ('b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'n3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali sono gli accessi critici da trasferire?', 'textarea', true, 1),
  ('c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'n3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Dove sono conservate le credenziali di sistema?', 'textarea', true, 2),

  -- Team e Contatti
  ('d9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'o4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Chi sono i membri chiave del team tecnico?', 'textarea', true, 1),
  ('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'o4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali sono i contatti di emergenza per i sistemi critici?', 'textarea', true, 2)
) AS new_questions(id, section_id, question_text, question_type, is_required, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM template_questions WHERE id = new_questions.id
);

-- Inserimento domande template Marketing Manager (solo se non esistono)
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index)
SELECT * FROM (VALUES
  -- Campagne Attive
  ('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'p5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali campagne sono attualmente attive?', 'textarea', true, 1),
  ('g2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'p5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali sono i KPI principali da monitorare?', 'textarea', true, 2),

  -- Tool e Processi
  ('h3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'q6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Quali tool utilizzi quotidianamente?', 'textarea', true, 1),
  ('i4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'q6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Qual è il processo di approvazione per le campagne?', 'textarea', true, 2),

  -- Budget e Fornitori
  ('j5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'r7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Qual è il budget annuale e come viene gestito?', 'textarea', true, 1),
  ('k6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'r7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Chi sono i fornitori principali e i loro contatti?', 'textarea', true, 2)
) AS new_questions(id, section_id, question_text, question_type, is_required, order_index)
WHERE NOT EXISTS (
  SELECT 1 FROM template_questions WHERE id = new_questions.id
);

-- Inserimento handover (solo se non esistono)
INSERT INTO handovers (id, organization_id, template_id, title, outgoing_user_id, incoming_user_id, status, due_date, completion_percentage, started_at, created_by)
SELECT * FROM (VALUES
  (
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'h7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Passaggio CTO - Marco Bianchi',
    'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'in_progress'::handover_status,
    '2024-02-15T23:59:59Z',
    75,
    '2024-01-15T10:00:00Z',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'i8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Handover Marketing Manager - Laura Verdi',
    'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'g6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'completed'::handover_status,
    '2024-01-30T23:59:59Z',
    100,
    '2024-01-10T14:30:00Z',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'n9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'j9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Sviluppatore Senior Frontend - Andrea Neri',
    'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    null,
    'pending'::handover_status,
    '2024-02-20T23:59:59Z',
    45,
    '2024-01-20T09:15:00Z',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  )
) AS new_handovers(id, organization_id, template_id, title, outgoing_user_id, incoming_user_id, status, due_date, completion_percentage, started_at, created_by)
WHERE NOT EXISTS (
  SELECT 1 FROM handovers WHERE id = new_handovers.id
);

-- Inserimento risposte handover (solo se non esistono)
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at)
SELECT * FROM (VALUES
  -- Responsabilità Tecniche
  (
    'o0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'v1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Gestisco l''infrastruttura cloud su AWS, supervisiono il team di sviluppo di 8 persone, e sono responsabile dell''architettura tecnica di tutti i progetti. Mi occupo anche delle decisioni strategiche tecnologiche e della roadmap di sviluppo.',
    true,
    '2024-01-20T10:30:00Z'
  ),
  (
    'p1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'w2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend). Per emergenze: numero verde interno 1234. Fornitori esterni: AWS Support (contratto Enterprise), MongoDB Atlas (supporto dedicato).',
    true,
    '2024-01-20T10:35:00Z'
  ),
  (
    'q2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'x3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Migrazione da MongoDB a PostgreSQL (decisione entro fine mese), scelta del nuovo framework frontend (React vs Vue), implementazione microservizi per il modulo pagamenti.',
    true,
    '2024-01-20T10:40:00Z'
  ),

  -- Progetti in Corso
  (
    'r3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'y4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Progetto Alpha (rilascio previsto marzo), migrazione database (in corso), nuovo sistema di autenticazione (fase di testing), app mobile (sviluppo iniziale).',
    true,
    '2024-01-20T11:00:00Z'
  ),
  (
    's4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'z5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Alpha: 80% completato, in fase di testing. Migrazione DB: 60%, problemi di performance da risolvere. Auth: 90%, manca solo documentazione. Mobile: 20%, appena iniziato.',
    true,
    '2024-01-20T11:05:00Z'
  ),
  (
    't5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Migrazione DB: performance queries lente, potrebbe slittare di 2 settimane. Alpha: dipendenza da API esterna instabile. Mobile: manca ancora il designer UX.',
    true,
    '2024-01-20T11:10:00Z'
  ),

  -- Accessi e Credenziali
  (
    'u6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'AWS Console (credenziali root), GitHub Organization (owner), server di produzione via SSH, MongoDB Atlas (admin), Stripe (account principale), Google Workspace (super admin).',
    true,
    '2024-01-20T11:15:00Z'
  )
) AS new_responses(id, handover_id, question_id, response_text, is_complete, responded_at)
WHERE NOT EXISTS (
  SELECT 1 FROM handover_responses WHERE id = new_responses.id
);

-- Inserimento risposte complete per handover Marketing (solo se non esistono)
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at)
SELECT * FROM (VALUES
  (
    'v7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Campagna Q1 2024 (budget 50k), campagna social media (ongoing), email marketing automation (setup completato), partnership con influencer tech (3 contratti attivi).',
    true,
    '2024-01-25T14:00:00Z'
  ),
  (
    'w8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'g2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'CTR email: >3%, conversion rate: >2.5%, CAC: <150€, ROI campagne: >300%, engagement social: >5%.',
    true,
    '2024-01-25T14:05:00Z'
  ),
  (
    'x9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'h3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'HubSpot (CRM e automation), Google Analytics, Facebook Ads Manager, Canva Pro, Hootsuite, Mailchimp, Slack per comunicazione team.',
    true,
    '2024-01-25T14:10:00Z'
  ),
  (
    'y0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'i4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Proposta → Review CMO → Approvazione budget CFO → Implementazione. Per campagne <5k: approvazione diretta. Per >20k: board approval necessaria.',
    true,
    '2024-01-25T14:15:00Z'
  ),
  (
    'z1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'j5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Budget annuale: 200k€. Q1: 60k (già allocato), Q2: 50k, Q3: 45k, Q4: 45k. Tracking su Excel condiviso + HubSpot reporting.',
    true,
    '2024-01-25T14:20:00Z'
  ),
  (
    'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'k6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Agenzia creativa: CreativeStudio (Marco Rossi, +39 02 123456), Google Ads: account manager dedicato (Sara Bianchi), Influencer agency: SocialBoost (Luca Verdi).',
    true,
    '2024-01-25T14:25:00Z'
  )
) AS new_responses(id, handover_id, question_id, response_text, is_complete, responded_at)
WHERE NOT EXISTS (
  SELECT 1 FROM handover_responses WHERE id = new_responses.id
);

-- Inserimento inviti handover (solo se non esistono)
INSERT INTO handover_invitations (id, handover_id, email, full_name, invitation_token, status, expires_at, sent_at, accepted_at, created_by)
SELECT * FROM (VALUES
  (
    'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'sofia.ferrari@techcorp.it',
    'Sofia Ferrari',
    'inv_cto_sofia_2024_01_15',
    'accepted'::invitation_status,
    '2024-02-15T23:59:59Z',
    '2024-01-15T10:00:00Z',
    '2024-01-15T15:30:00Z',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'giulia.colombo@techcorp.it',
    'Giulia Colombo',
    'inv_mkt_giulia_2024_01_10',
    'accepted'::invitation_status,
    '2024-01-30T23:59:59Z',
    '2024-01-10T14:30:00Z',
    '2024-01-10T16:00:00Z',
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'n9eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'nuovo.dev@techcorp.it',
    'Nuovo Sviluppatore',
    'inv_dev_nuovo_2024_01_20',
    'pending'::invitation_status,
    '2024-02-20T23:59:59Z',
    '2024-01-20T09:15:00Z',
    null,
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  )
) AS new_invitations(id, handover_id, email, full_name, invitation_token, status, expires_at, sent_at, accepted_at, created_by)
WHERE NOT EXISTS (
  SELECT 1 FROM handover_invitations WHERE id = new_invitations.id
);

-- Inserimento analisi AI (solo se non esistono)
INSERT INTO ai_analyses (id, handover_id, overall_score, completeness_score, clarity_score, usefulness_score, strengths, weaknesses, critical_gaps, suggestions, analyzed_by)
SELECT * FROM (VALUES
  (
    'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'l7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    82,
    85,
    88,
    75,
    ARRAY[
      'Descrizione chiara delle responsabilità principali',
      'Buona documentazione dei tool utilizzati',
      'Contatti ben organizzati e aggiornati',
      'Procedure operative descritte in modo comprensibile',
      'Timeline dei progetti ben dettagliata'
    ],
    ARRAY[
      'Mancano dettagli sui processi di backup',
      'Informazioni incomplete sui progetti in corso',
      'Procedure di emergenza poco dettagliate',
      'Documentazione accessi non completa'
    ],
    ARRAY[
      'Password e credenziali di accesso non documentate',
      'Manca la documentazione del processo di deploy',
      'Contatti di emergenza per sistemi critici incompleti'
    ],
    ARRAY[
      'Aggiungere più dettagli sui processi di escalation',
      'Specificare meglio i contatti di emergenza',
      'Includere esempi pratici per le procedure complesse',
      'Documentare meglio gli accessi ai sistemi critici',
      'Aggiungere checklist per il disaster recovery'
    ],
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  ),
  (
    'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'm8eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    92,
    95,
    90,
    90,
    ARRAY[
      'Documentazione completa di tutte le campagne attive',
      'KPI chiaramente definiti e misurabili',
      'Processi di approvazione ben strutturati',
      'Budget dettagliato e ben organizzato',
      'Contatti fornitori completi e aggiornati'
    ],
    ARRAY[
      'Potrebbe includere più dettagli sui risultati storici',
      'Mancano alcune best practices per il team'
    ],
    ARRAY[],
    ARRAY[
      'Aggiungere dashboard di monitoraggio KPI',
      'Includere template per reportistica mensile',
      'Documentare le lesson learned dalle campagne passate'
    ],
    'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
  )
) AS new_analyses(id, handover_id, overall_score, completeness_score, clarity_score, usefulness_score, strengths, weaknesses, critical_gaps, suggestions, analyzed_by)
WHERE NOT EXISTS (
  SELECT 1 FROM ai_analyses WHERE id = new_analyses.id
);

-- Aggiornamento contatori usage per i template (solo se necessario)
UPDATE templates 
SET usage_count = (
  SELECT COUNT(*) FROM handovers WHERE template_id = templates.id
)
WHERE EXISTS (
  SELECT 1 FROM handovers WHERE template_id = templates.id
  GROUP BY template_id
  HAVING COUNT(*) <> templates.usage_count
);