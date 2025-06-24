/*
  # Fix Clerk User ID Integration

  1. Schema Changes
    - Change profiles.id from uuid to text to support Clerk user IDs
    - Update all foreign key references to use text type
    - Fix organization ID to use proper UUID

  2. Data Migration
    - Create default organization with proper UUID
    - Maintain referential integrity

  3. Constraints
    - Recreate all foreign key constraints with correct types
*/

-- First, drop all foreign key constraints that reference profiles.id
ALTER TABLE handovers DROP CONSTRAINT IF EXISTS handovers_outgoing_user_id_fkey;
ALTER TABLE handovers DROP CONSTRAINT IF EXISTS handovers_incoming_user_id_fkey;
ALTER TABLE handovers DROP CONSTRAINT IF EXISTS handovers_created_by_fkey;
ALTER TABLE templates DROP CONSTRAINT IF EXISTS templates_created_by_fkey;
ALTER TABLE handover_invitations DROP CONSTRAINT IF EXISTS handover_invitations_created_by_fkey;
ALTER TABLE ai_analyses DROP CONSTRAINT IF EXISTS ai_analyses_analyzed_by_fkey;

-- Drop the foreign key constraint between profiles and users (auth.users)
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Change the profiles.id column from uuid to text
ALTER TABLE profiles ALTER COLUMN id TYPE text;

-- Update all columns that reference profiles.id to text
ALTER TABLE handovers ALTER COLUMN outgoing_user_id TYPE text;
ALTER TABLE handovers ALTER COLUMN incoming_user_id TYPE text;
ALTER TABLE handovers ALTER COLUMN created_by TYPE text;
ALTER TABLE templates ALTER COLUMN created_by TYPE text;
ALTER TABLE handover_invitations ALTER COLUMN created_by TYPE text;
ALTER TABLE ai_analyses ALTER COLUMN analyzed_by TYPE text;

-- Recreate the foreign key constraints
ALTER TABLE handovers 
  ADD CONSTRAINT handovers_outgoing_user_id_fkey 
  FOREIGN KEY (outgoing_user_id) REFERENCES profiles(id);

ALTER TABLE handovers 
  ADD CONSTRAINT handovers_incoming_user_id_fkey 
  FOREIGN KEY (incoming_user_id) REFERENCES profiles(id);

ALTER TABLE handovers 
  ADD CONSTRAINT handovers_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES profiles(id);

ALTER TABLE templates 
  ADD CONSTRAINT templates_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES profiles(id);

ALTER TABLE handover_invitations 
  ADD CONSTRAINT handover_invitations_created_by_fkey 
  FOREIGN KEY (created_by) REFERENCES profiles(id);

ALTER TABLE ai_analyses 
  ADD CONSTRAINT ai_analyses_analyzed_by_fkey 
  FOREIGN KEY (analyzed_by) REFERENCES profiles(id);

-- Create a default organization with proper UUID if it doesn't exist
INSERT INTO organizations (id, name, domain) 
VALUES (gen_random_uuid(), 'TechCorp', 'techcorp.it')
ON CONFLICT (domain) DO NOTHING;