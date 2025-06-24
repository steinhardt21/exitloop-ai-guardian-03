/*
  # Remove All Row Level Security Policies

  This migration removes all RLS policies from all tables to allow unrestricted access.
  
  ## Changes
  1. Drop all existing RLS policies
  2. Disable RLS on all tables
  
  ## Security Impact
  ⚠️ WARNING: This removes all security restrictions from the database.
  All authenticated users will have full access to all data.
*/

-- Drop all RLS policies for organizations
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;
DROP POLICY IF EXISTS "Admins can manage their organization" ON organizations;

-- Drop all RLS policies for profiles
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage profiles in their organization" ON profiles;

-- Drop all RLS policies for templates
DROP POLICY IF EXISTS "Users can view templates in their organization" ON templates;
DROP POLICY IF EXISTS "Admins can manage templates in their organization" ON templates;

-- Drop all RLS policies for template_sections
DROP POLICY IF EXISTS "Users can view template sections" ON template_sections;
DROP POLICY IF EXISTS "Admins can manage template sections" ON template_sections;

-- Drop all RLS policies for template_questions
DROP POLICY IF EXISTS "Users can view template questions" ON template_questions;
DROP POLICY IF EXISTS "Admins can manage template questions" ON template_questions;

-- Drop all RLS policies for handovers
DROP POLICY IF EXISTS "Users can view handovers in their organization" ON handovers;
DROP POLICY IF EXISTS "Users can view their own handovers" ON handovers;
DROP POLICY IF EXISTS "Admins can manage handovers in their organization" ON handovers;
DROP POLICY IF EXISTS "Outgoing users can update their handovers" ON handovers;

-- Drop all RLS policies for handover_responses
DROP POLICY IF EXISTS "Users can view responses for their handovers" ON handover_responses;
DROP POLICY IF EXISTS "Outgoing users can manage their responses" ON handover_responses;

-- Drop all RLS policies for handover_invitations
DROP POLICY IF EXISTS "Admins can manage invitations in their organization" ON handover_invitations;
DROP POLICY IF EXISTS "Users can view invitations sent to them" ON handover_invitations;

-- Drop all RLS policies for ai_analyses
DROP POLICY IF EXISTS "Users can view AI analyses for their handovers" ON ai_analyses;
DROP POLICY IF EXISTS "Admins can manage AI analyses in their organization" ON ai_analyses;

-- Disable RLS on all tables
ALTER TABLE organizations DISABLE ROW LEVEL SECURITY;
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE template_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE template_questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE handovers DISABLE ROW LEVEL SECURITY;
ALTER TABLE handover_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE handover_invitations DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analyses DISABLE ROW LEVEL SECURITY;