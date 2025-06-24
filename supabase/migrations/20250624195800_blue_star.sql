/*
  # Clean Database Migration

  1. Clean Data
    - Remove all existing data from tables
    - Reset sequences and counters
    - Keep table structure intact

  2. Security
    - Maintain RLS policies
    - Keep constraints and relationships
*/

-- Clean all data from tables (in correct order due to foreign key constraints)
DELETE FROM ai_analyses;
DELETE FROM handover_responses;
DELETE FROM handover_invitations;
DELETE FROM handovers;
DELETE FROM template_questions;
DELETE FROM template_sections;
DELETE FROM templates;
DELETE FROM profiles;
DELETE FROM organizations;

-- Reset any sequences if they exist
-- Note: UUID primary keys don't use sequences, so this is mainly for future-proofing