/*
  # Popolamento Database Exitloop con Dati di Esempio

  1. Nuove Tabelle
    - Organizzazione di esempio (TechCorp Italia)
    - Template completi per diversi ruoli
    - Handover con stati realistici
    - Risposte dettagliate agli handover
    - Analisi AI complete

  2. Sicurezza
    - Tutti i dati rispettano i vincoli RLS esistenti
    - Foreign key mantenute dove appropriate
    - Nessuna violazione di vincoli di integrità
*/

-- Inserimento organizzazione di esempio
INSERT INTO organizations (id, name, domain, logo_url, settings) VALUES 
(
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'TechCorp Italia',
  'techcorp.it',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=center',
  '{"timezone": "Europe/Rome", "language": "it", "features": ["ai_analysis", "advanced_templates"]}'::jsonb
);

-- Inserimento template
INSERT INTO templates (id, organization_id, name, description, role_type, usage_count, created_by) VALUES 
(
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'CTO Handover',
  'Template completo per il passaggio di consegne del Chief Technology Officer',
  'CTO',
  0,
  null
),
(
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Marketing Manager',
  'Template per il passaggio di consegne del Marketing Manager',
  'Marketing Manager',
  0,
  null
),
(
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Developer Senior',
  'Template per sviluppatori senior che lasciano l''azienda',
  'Senior Developer',
  0,
  null
),
(
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'Sales Manager',
  'Template per responsabili vendite',
  'Sales Manager',
  0,
  null
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

-- Inserimento sezioni template Sales Manager
INSERT INTO template_sections (id, template_id, title, description, order_index) VALUES 
('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b', 'Pipeline e Clienti', 'Gestione pipeline vendite e clienti chiave', 1),
('e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b', 'Processi Vendita', 'Metodologie e processi di vendita', 2),
('f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b', 'Target e Obiettivi', 'Obiettivi di vendita e strategie', 3);

-- Inserimento domande template CTO
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Responsabilità Tecniche
('a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Quali sono le principali responsabilità tecniche del tuo ruolo?', 'textarea', true, 1),
('b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a2a', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Chi sono i referenti tecnici chiave interni ed esterni?', 'textarea', true, 2),
('c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a2b', 'f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a1c', 'Quali decisioni tecniche strategiche sono in sospeso?', 'textarea', true, 3),

-- Progetti in Corso
('d7eebc99-9c0b-4ef8-bb6d-6bb9bd380a2c', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Quali progetti sono attualmente in sviluppo?', 'textarea', true, 1),
('e8eebc99-9c0b-4ef8-bb6d-6bb9bd380a2d', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Qual è lo stato di avanzamento di ciascun progetto?', 'textarea', true, 2),
('f9eebc99-9c0b-4ef8-bb6d-6bb9bd380a2e', 'a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a1d', 'Ci sono blocchi o rischi critici da segnalare?', 'textarea', true, 3),

-- Accessi e Credenziali
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a2f', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a1e', 'Quali sono gli accessi critici da trasferire?', 'textarea', true, 1),
('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a30', 'b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a1e', 'Dove sono conservate le credenziali di sistema?', 'textarea', true, 2),

-- Team e Contatti
('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a31', 'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a1f', 'Chi sono i membri chiave del team tecnico?', 'textarea', true, 1),
('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a32', 'c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a1f', 'Quali sono i contatti di emergenza per i sistemi critici?', 'textarea', true, 2);

-- Inserimento domande template Marketing Manager
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Campagne Attive
('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Quali campagne sono attualmente attive?', 'textarea', true, 1),
('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a34', 'd5eebc99-9c0b-4ef8-bb6d-6bb9bd380a20', 'Quali sono i KPI principali da monitorare?', 'textarea', true, 2),

-- Tool e Processi
('a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a35', 'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Quali tool utilizzi quotidianamente?', 'textarea', true, 1),
('b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36', 'e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a21', 'Qual è il processo di approvazione per le campagne?', 'textarea', true, 2),

-- Budget e Fornitori
('c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37', 'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Qual è il budget annuale e come viene gestito?', 'textarea', true, 1),
('d9eebc99-9c0b-4ef8-bb6d-6bb9bd380a38', 'f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Chi sono i fornitori principali e i loro contatti?', 'textarea', true, 2);

-- Inserimento domande template Developer Senior
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Codice e Repository
('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a39', 'a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Quali sono i repository principali di cui sei responsabile?', 'textarea', true, 1),
('f1eebc99-9c0b-4ef8-bb6d-6bb9bd380a3a', 'a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a23', 'Dove si trova la documentazione tecnica del codice?', 'textarea', true, 2),

-- Deployment e CI/CD
('a2eebc99-9c0b-4ef8-bb6d-6bb9bd380a3b', 'b9eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'Come funziona il processo di deploy?', 'textarea', true, 1),
('b3eebc99-9c0b-4ef8-bb6d-6bb9bd380a3c', 'b9eebc99-9c0b-4ef8-bb6d-6bb9bd380a24', 'Quali sono le pipeline CI/CD attive?', 'textarea', true, 2),

-- Documentazione Tecnica
('c4eebc99-9c0b-4ef8-bb6d-6bb9bd380a3d', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'Dove è conservata la documentazione tecnica?', 'textarea', true, 1),
('d5eebc99-9c0b-4ef8-bb6d-6bb9bd380a3e', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a25', 'Quali sono le best practices del team?', 'textarea', true, 2);

-- Inserimento domande template Sales Manager
INSERT INTO template_questions (id, section_id, question_text, question_type, is_required, order_index) VALUES 
-- Pipeline e Clienti
('e6eebc99-9c0b-4ef8-bb6d-6bb9bd380a3f', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Qual è lo stato attuale della pipeline vendite?', 'textarea', true, 1),
('f7eebc99-9c0b-4ef8-bb6d-6bb9bd380a40', 'd1eebc99-9c0b-4ef8-bb6d-6bb9bd380a26', 'Chi sono i clienti chiave e i loro contatti?', 'textarea', true, 2),

-- Processi Vendita
('a8eebc99-9c0b-4ef8-bb6d-6bb9bd380a41', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Qual è il processo di vendita standard?', 'textarea', true, 1),
('b9eebc99-9c0b-4ef8-bb6d-6bb9bd380a42', 'e2eebc99-9c0b-4ef8-bb6d-6bb9bd380a27', 'Quali tool CRM utilizzi?', 'textarea', true, 2),

-- Target e Obiettivi
('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a43', 'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Quali sono gli obiettivi di vendita per quest''anno?', 'textarea', true, 1),
('d1eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'f3eebc99-9c0b-4ef8-bb6d-6bb9bd380a28', 'Quali strategie di vendita stai utilizzando?', 'textarea', true, 2);

-- Inserimento handover di esempio (senza riferimenti a utenti specifici)
INSERT INTO handovers (id, organization_id, template_id, title, outgoing_user_id, incoming_user_id, status, due_date, completion_percentage, started_at, created_by) VALUES 
(
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
  'Passaggio CTO - Marco Bianchi',
  null,
  null,
  'in_progress',
  '2024-02-15T23:59:59Z',
  75,
  '2024-01-15T10:00:00Z',
  null
),
(
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
  'Handover Marketing Manager - Laura Verdi',
  null,
  null,
  'completed',
  '2024-01-30T23:59:59Z',
  100,
  '2024-01-10T14:30:00Z',
  null
),
(
  'a9eebc99-9c0b-4ef8-bb6d-6bb9bd380a47',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a',
  'Sviluppatore Senior Frontend - Andrea Neri',
  null,
  null,
  'pending',
  '2024-02-20T23:59:59Z',
  45,
  '2024-01-20T09:15:00Z',
  null
),
(
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a48',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1b',
  'Responsabile Vendite Nord - Giulia Neri',
  null,
  null,
  'in_progress',
  '2024-02-10T23:59:59Z',
  60,
  '2024-01-18T11:20:00Z',
  null
),
(
  'c1eebc99-9c0b-4ef8-bb6d-6bb9bd380a49',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
  'Project Manager Digital - Luca Ferrari',
  null,
  null,
  'completed',
  '2024-01-25T23:59:59Z',
  100,
  '2024-01-05T16:45:00Z',
  null
);

-- Inserimento risposte handover per l'handover CTO in corso
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at) VALUES 
-- Responsabilità Tecniche
(
  'd2eebc99-9c0b-4ef8-bb6d-6bb9bd380a4a',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'a4eebc99-9c0b-4ef8-bb6d-6bb9bd380a29',
  'Gestisco l''infrastruttura cloud su AWS, supervisiono il team di sviluppo di 8 persone, e sono responsabile dell''architettura tecnica di tutti i progetti. Mi occupo anche delle decisioni strategiche tecnologiche e della roadmap di sviluppo.',
  true,
  '2024-01-20T10:30:00Z'
),
(
  'e3eebc99-9c0b-4ef8-bb6d-6bb9bd380a4b',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'b5eebc99-9c0b-4ef8-bb6d-6bb9bd380a2a',
  'Marco Bianchi (Lead Developer), Sara Rossi (DevOps Engineer), Luca Verdi (Senior Frontend). Per emergenze: numero verde interno 1234. Fornitori esterni: AWS Support (contratto Enterprise), MongoDB Atlas (supporto dedicato).',
  true,
  '2024-01-20T10:35:00Z'
),
(
  'f4eebc99-9c0b-4ef8-bb6d-6bb9bd380a4c',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'c6eebc99-9c0b-4ef8-bb6d-6bb9bd380a2b',
  'Migrazione da MongoDB a PostgreSQL (decisione entro fine mese), scelta del nuovo framework frontend (React vs Vue), implementazione microservizi per il modulo pagamenti.',
  true,
  '2024-01-20T10:40:00Z'
),

-- Progetti in Corso
(
  'a5eebc99-9c0b-4ef8-bb6d-6bb9bd380a4d',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'd7eebc99-9c0b-4ef8-bb6d-6bb9bd380a2c',
  'Progetto Alpha (rilascio previsto marzo), migrazione database (in corso), nuovo sistema di autenticazione (fase di testing), app mobile (sviluppo iniziale).',
  true,
  '2024-01-20T11:00:00Z'
),
(
  'b6eebc99-9c0b-4ef8-bb6d-6bb9bd380a4e',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'e8eebc99-9c0b-4ef8-bb6d-6bb9bd380a2d',
  'Alpha: 80% completato, in fase di testing. Migrazione DB: 60%, problemi di performance da risolvere. Auth: 90%, manca solo documentazione. Mobile: 20%, appena iniziato.',
  true,
  '2024-01-20T11:05:00Z'
),
(
  'c7eebc99-9c0b-4ef8-bb6d-6bb9bd380a4f',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'f9eebc99-9c0b-4ef8-bb6d-6bb9bd380a2e',
  'Migrazione DB: performance queries lente, potrebbe slittare di 2 settimane. Alpha: dipendenza da API esterna instabile. Mobile: manca ancora il designer UX.',
  true,
  '2024-01-20T11:10:00Z'
),

-- Accessi e Credenziali
(
  'd8eebc99-9c0b-4ef8-bb6d-6bb9bd380a50',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a2f',
  'AWS Console (credenziali root), GitHub Organization (owner), server di produzione via SSH, MongoDB Atlas (admin), Stripe (account principale), Google Workspace (super admin).',
  true,
  '2024-01-20T11:15:00Z'
);

-- Inserimento risposte complete per l'handover Marketing completato
INSERT INTO handover_responses (id, handover_id, question_id, response_text, is_complete, responded_at) VALUES 
(
  'e9eebc99-9c0b-4ef8-bb6d-6bb9bd380a51',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a33',
  'Campagna Q1 2024 (budget 50k), campagna social media (ongoing), email marketing automation (setup completato), partnership con influencer tech (3 contratti attivi).',
  true,
  '2024-01-25T14:00:00Z'
),
(
  'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a52',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a34',
  'CTR email: >3%, conversion rate: >2.5%, CAC: <150€, ROI campagne: >300%, engagement social: >5%.',
  true,
  '2024-01-25T14:05:00Z'
),
(
  'a1eebc99-9c0b-4ef8-bb6d-6bb9bd380a53',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a35',
  'HubSpot (CRM e automation), Google Analytics, Facebook Ads Manager, Canva Pro, Hootsuite, Mailchimp, Slack per comunicazione team.',
  true,
  '2024-01-25T14:10:00Z'
),
(
  'b2eebc99-9c0b-4ef8-bb6d-6bb9bd380a54',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'b7eebc99-9c0b-4ef8-bb6d-6bb9bd380a36',
  'Proposta → Review CMO → Approvazione budget CFO → Implementazione. Per campagne <5k: approvazione diretta. Per >20k: board approval necessaria.',
  true,
  '2024-01-25T14:15:00Z'
),
(
  'c3eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'c8eebc99-9c0b-4ef8-bb6d-6bb9bd380a37',
  'Budget annuale: 200k€. Q1: 60k (già allocato), Q2: 50k, Q3: 45k, Q4: 45k. Tracking su Excel condiviso + HubSpot reporting.',
  true,
  '2024-01-25T14:20:00Z'
),
(
  'd4eebc99-9c0b-4ef8-bb6d-6bb9bd380a56',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'd9eebc99-9c0b-4ef8-bb6d-6bb9bd380a38',
  'Agenzia creativa: CreativeStudio (Marco Rossi, +39 02 123456), Google Ads: account manager dedicato (Sara Bianchi), Influencer agency: SocialBoost (Luca Verdi).',
  true,
  '2024-01-25T14:25:00Z'
);

-- Inserimento inviti handover
INSERT INTO handover_invitations (id, handover_id, email, full_name, invitation_token, status, expires_at, sent_at, accepted_at, created_by) VALUES 
(
  'e5eebc99-9c0b-4ef8-bb6d-6bb9bd380a57',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
  'sofia.ferrari@techcorp.it',
  'Sofia Ferrari',
  'inv_cto_sofia_2024_01_15',
  'accepted',
  '2024-02-15T23:59:59Z',
  '2024-01-15T10:00:00Z',
  '2024-01-15T15:30:00Z',
  null
),
(
  'f6eebc99-9c0b-4ef8-bb6d-6bb9bd380a58',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
  'giulia.colombo@techcorp.it',
  'Giulia Colombo',
  'inv_mkt_giulia_2024_01_10',
  'accepted',
  '2024-01-30T23:59:59Z',
  '2024-01-10T14:30:00Z',
  '2024-01-10T16:00:00Z',
  null
),
(
  'a7eebc99-9c0b-4ef8-bb6d-6bb9bd380a59',
  'a9eebc99-9c0b-4ef8-bb6d-6bb9bd380a47',
  'nuovo.dev@techcorp.it',
  'Nuovo Sviluppatore',
  'inv_dev_nuovo_2024_01_20',
  'pending',
  '2024-02-20T23:59:59Z',
  '2024-01-20T09:15:00Z',
  null,
  null
);

-- Inserimento analisi AI
INSERT INTO ai_analyses (id, handover_id, overall_score, completeness_score, clarity_score, usefulness_score, strengths, weaknesses, critical_gaps, suggestions, analyzed_by) VALUES 
(
  'b8eebc99-9c0b-4ef8-bb6d-6bb9bd380a5a',
  'e7eebc99-9c0b-4ef8-bb6d-6bb9bd380a45',
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
  null
),
(
  'c9eebc99-9c0b-4ef8-bb6d-6bb9bd380a5b',
  'f8eebc99-9c0b-4ef8-bb6d-6bb9bd380a46',
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
  null
);

-- Aggiornamento contatori usage per i template
UPDATE templates SET usage_count = (
  SELECT COUNT(*) FROM handovers WHERE template_id = templates.id
);