/*
  # Popolamento Database con Dati di Esempio

  1. Organizzazione
    - TechCorp Italia con configurazioni complete
  
  2. Utenti
    - 1 Admin, 3 Outgoing, 2 Incoming users
    
  3. Template
    - 4 template completi con sezioni e domande
    
  4. Handover
    - 3 handover con stati diversi e risposte
    
  5. Analisi AI
    - 2 analisi complete con punteggi e feedback
*/

-- Inserimento organizzazione di esempio
INSERT INTO organizations (id, name, domain, logo_url, settings) VALUES 
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'TechCorp Italia',
  'techcorp.it',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
  '{"timezone": "Europe/Rome", "language": "it", "features": ["ai_analysis", "advanced_templates"]}'
);

-- Inserimento profili utenti
INSERT INTO profiles (id, organization_id, email, full_name, avatar_url, role, department, position, phone, is_active) VALUES 
-- Admin
(
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'admin@techcorp.it',
  'Alessandro Rossi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=alessandro',
  'admin',
  'HR',
  'HR Director',
  '+39 02 1234567',
  true
),
-- Utenti uscenti
(
  'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'marco.bianchi@techcorp.it',
  'Marco Bianchi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
  'outgoing',
  'Technology',
  'CTO',
  '+39 02 1234568',
  true
),
(
  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'laura.verdi@techcorp.it',
  'Laura Verdi',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=laura',
  'outgoing',
  'Marketing',
  'Marketing Manager',
  '+39 02 1234569',
  true
),
(
  'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'andrea.neri@techcorp.it',
  'Andrea Neri',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=andrea',
  'outgoing',
  'Technology',
  'Senior Frontend Developer',
  '+39 02 1234570',
  true
),
-- Utenti entranti
(
  'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'sofia.ferrari@techcorp.it',
  'Sofia Ferrari',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
  'incoming',
  'Technology',
  'New CTO',
  '+39 02 1234571',
  true
),
(
  'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'giulia.colombo@techcorp.it',
  'Giulia Colombo',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=giulia',
  'incoming',
  'Marketing',
  'New Marketing Manager',
  '+39 02 1234572',
  true
);

-- Inserimento template
INSERT INTO templates (id, organization_id, name, description, role_type, usage_count, created_by) VALUES 
(
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'CTO Handover',
  'Template completo per il passaggio di consegne del Chief Technology Officer',
  'CTO',
  5,
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Marketing Manager',
  'Template per il passaggio di consegne del Marketing Manager',
  'Marketing Manager',
  3,
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Developer Senior',
  'Template per sviluppatori senior che lasciano l''azienda',
  'Senior Developer',
  8,
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Sales Manager',
  'Template per responsabili vendite',
  'Sales Manager',
  2,
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
);

-- Inserimento sezioni template CTO
INSERT INTO template_sections (id, template_id, title, description, order_index) VALUES 
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Responsabilità Tecniche', 'Panoramica delle responsabilità tecniche principali', 1),
('a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Progetti in Corso', 'Stato dei progetti attualmente in sviluppo', 2),
('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a1e', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Accessi e Credenziali', 'Sistemi critici e accessi da trasferire', 3),
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a1f', 'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'Team e Contatti', 'Informazioni sul team e contatti chiave', 4);

-- Inserimento sezioni template Marketing Manager
INSERT INTO template_sections (id, template_id, title, description, order_index) VALUES 
('d5eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Campagne Attive', 'Campagne marketing attualmente in corso', 1),
('e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Tool e Processi', 'Strumenti e processi utilizzati quotidianamente', 2),
('f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'Budget e Fornitori', 'Gestione budget e rapporti con fornitori', 3);

-- Inserimento sezioni template Developer Senior
INSERT INTO template_sections (id, template_id, title, description, order_index) VALUES 
('a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a', 'Codice e Repository', 'Repository e codice di cui sei responsabile', 1),
('b9eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a', 'Deployment e CI/CD', 'Processi di deployment e integrazione continua', 2),
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a', 'Documentazione Tecnica', 'Documentazione e knowledge base', 3);

-- Inserimento domande template CTO
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Responsabilità Tecniche
('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Quali sono le principali responsabilità tecniche del tuo ruolo?', 'textarea', true, 1),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Chi sono i referenti tecnici chiave interni ed esterni?', 'textarea', true, 2),
('f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Quali decisioni tecniche strategiche sono in sospeso?', 'textarea', true, 3),

-- Progetti in Corso
('a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Quali progetti sono attualmente in sviluppo?', 'textarea', true, 1),
('b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a2a', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Qual è lo stato di avanzamento di ciascun progetto?', 'textarea', true, 2),
('c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a2b', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Ci sono blocchi o rischi critici da segnalare?', 'textarea', true, 3),

-- Accessi e Credenziali
('d7eebc99-9c0b-4ef8-bb6d-6bb9bd380a2c', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a1e', 'Quali sono gli accessi critici da trasferire?', 'textarea', true, 1),
('e8eebc99-9c0b-4ef8-bb6d-6bb9bd380a2d', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a1e', 'Dove sono conservate le credenziali di sistema?', 'textarea', true, 2),

-- Team e Contatti
('f9eebc99-9c0b-4ef8-bb6d-6bb9bd380a2e', 'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a1f', 'Chi sono i membri chiave del team tecnico?', 'textarea', true, 1),
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a2f', 'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a1f', 'Quali sono i contatti di emergenza per i sistemi critici?', 'textarea', true, 2);

-- Inserimento domande template Marketing Manager
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Campagne Attive
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Quali campagne sono attualmente attive?', 'textarea', true, 1),
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Quali sono i KPI principali da monitorare?', 'textarea', true, 2),

-- Tool e Processi
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Quali tool utilizzi quotidianamente?', 'textarea', true, 1),
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Qual è il processo di approvazione per le campagne?', 'textarea', true, 2),

-- Budget e Fornitori
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Qual è il budget annuale e come viene gestito?', 'textarea', true, 1),
('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Chi sono i fornitori principali e i loro contatti?', 'textarea', true, 2);

-- Inserimento handover
INSERT INTO handovers (id, organization_id, template_id, title, outgoing_user_id, incoming_user_id, status, due_date, completion_percentage, started_at, created_by) VALUES 
(
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
  'Passaggio CTO - Marco Bianchi',
  'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
  'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
  'in_progress',
  '2024-02-15T23:59:59Z',
  75,
  '2024-01-15T10:00:00Z',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
  'Handover Marketing Manager - Laura Verdi',
  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
  'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
  'completed',
  '2024-01-30T23:59:59Z',
  100,
  '2024-01-10T14:30:00Z',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a38',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a',
  'Sviluppatore Senior Frontend - Andrea Neri',
  'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
  null,
  'pending',
  '2024-02-20T23:59:59Z',
  45,
  '2024-01-20T09:15:00Z',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
);

-- Inserimento risposte handover (per handover CTO in corso)
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at) VALUES 
-- Responsabilità Tecniche
(
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a39',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26',
  'Gestisco l''infrastruttura cloud su AWS, supervisiono il team di sviluppo di 8 persone, e sono responsabile dell''architettura tecnica di tutti i progetti. Mi occupo anche delle decisioni strategiche tecnologiche e della roadmap di sviluppo.',
  true,
  '2024-01-20T10:30:00Z'
),
(
  'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a3a',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27',
  'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend). Per emergenze: numero verde interno 1234. Fornitori esterni: AWS Support (contratto Enterprise), MongoDB Atlas (supporto dedicato).',
  true,
  '2024-01-20T10:35:00Z'
),
(
  'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a3b',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28',
  'Migrazione da MongoDB a PostgreSQL (decisione entro fine mese), scelta del nuovo framework frontend (React vs Vue), implementazione microservizi per il modulo pagamenti.',
  true,
  '2024-01-20T10:40:00Z'
),

-- Progetti in Corso
(
  'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a3c',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
  'Progetto Alpha (rilascio previsto marzo), migrazione database (in corso), nuovo sistema di autenticazione (fase di testing), app mobile (sviluppo iniziale).',
  true,
  '2024-01-20T11:00:00Z'
),
(
  'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a3d',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a2a',
  'Alpha: 80% completato, in fase di testing. Migrazione DB: 60%, problemi di performance da risolvere. Auth: 90%, manca solo documentazione. Mobile: 20%, appena iniziato.',
  true,
  '2024-01-20T11:05:00Z'
),
(
  'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a3e',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a2b',
  'Migrazione DB: performance queries lente, potrebbe slittare di 2 settimane. Alpha: dipendenza da API esterna instabile. Mobile: manca ancora il designer UX.',
  true,
  '2024-01-20T11:10:00Z'
),

-- Accessi e Credenziali
(
  'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a3f',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'd7eebc99-9c0b-4ef8-bb6d-6bb9bd380a2c',
  'AWS Console (credenziali root), GitHub Organization (owner), server di produzione via SSH, MongoDB Atlas (admin), Stripe (account principale), Google Workspace (super admin).',
  true,
  '2024-01-20T11:15:00Z'
);

-- Inserimento risposte complete per handover Marketing completato
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at) VALUES 
(
  'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a40',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a30',
  'Campagna Q1 2024 (budget 50k), campagna social media (ongoing), email marketing automation (setup completato), partnership con influencer tech (3 contratti attivi).',
  true,
  '2024-01-25T14:00:00Z'
),
(
  'a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a41',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a31',
  'CTR email: >3%, conversion rate: >2.5%, CAC: <150€, ROI campagne: >300%, engagement social: >5%.',
  true,
  '2024-01-25T14:05:00Z'
),
(
  'b9eebc99-9c0b-4ef8-bb6d-6bb9bd380a42',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a32',
  'HubSpot (CRM e automation), Google Analytics, Facebook Ads Manager, Canva Pro, Hootsuite, Mailchimp, Slack per comunicazione team.',
  true,
  '2024-01-25T14:10:00Z'
),
(
  'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a43',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
  'Proposta → Review CMO → Approvazione budget CFO → Implementazione. Per campagne <5k: approvazione diretta. Per >20k: board approval necessaria.',
  true,
  '2024-01-25T14:15:00Z'
),
(
  'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a34',
  'Budget annuale: 200k€. Q1: 60k (già allocato), Q2: 50k, Q3: 45k, Q4: 45k. Tracking su Excel condiviso + HubSpot reporting.',
  true,
  '2024-01-25T14:20:00Z'
),
(
  'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
  'Agenzia creativa: CreativeStudio (Marco Rossi, +39 02 123456), Google Ads: account manager dedicato (Sara Bianchi), Influencer agency: SocialBoost (Luca Verdi).',
  true,
  '2024-01-25T14:25:00Z'
);

-- Inserimento inviti handover
INSERT INTO handover_invitations (id, handover_id, email, full_name, invitation_token, status, expires_at, sent_at, accepted_at, created_by) VALUES 
(
  'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'sofia.ferrari@techcorp.it',
  'Sofia Ferrari',
  'inv_cto_sofia_2024_01_15',
  'accepted',
  '2024-02-15T23:59:59Z',
  '2024-01-15T10:00:00Z',
  '2024-01-15T15:30:00Z',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a47',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'giulia.colombo@techcorp.it',
  'Giulia Colombo',
  'inv_mkt_giulia_2024_01_10',
  'accepted',
  '2024-01-30T23:59:59Z',
  '2024-01-10T14:30:00Z',
  '2024-01-10T16:00:00Z',
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a48',
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a38',
  'nuovo.dev@techcorp.it',
  'Nuovo Sviluppatore',
  'inv_dev_nuovo_2024_01_20',
  'pending',
  '2024-02-20T23:59:59Z',
  '2024-01-20T09:15:00Z',
  null,
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
);

-- Inserimento analisi AI
INSERT INTO ai_analyses (id, handover_id, overall_score, completeness_score, clarity_score, usefulness_score, strengths, weaknesses, critical_gaps, suggestions, analyzed_by) VALUES 
(
  'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a49',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
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
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
),
(
  'd7eebc99-9c0b-4ef8-bb6d-6bb9bd380a4a',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
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
  'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12'
);

-- Aggiornamento contatori usage per i template
UPDATE templates SET usage_count = (
  SELECT COUNT(*) FROM handovers WHERE template_id = templates.id
);