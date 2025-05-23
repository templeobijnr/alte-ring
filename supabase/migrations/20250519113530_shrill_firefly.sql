/*
  # Fix SELECT policy on profiles table
  
  1. Changes
    - Drop existing SELECT policy
    - Create new SELECT policy with correct conditions
    - Ensure authenticated users can read their own profile and public profiles
    
  2. Security
    - Maintain RLS enabled
    - Keep existing policies for INSERT, UPDATE, and DELETE
*/

-- Drop the existing SELECT policy
DROP POLICY IF EXISTS select_public_or_self ON public.profiles;

-- Create new SELECT policy with correct conditions
CREATE POLICY select_public_or_self
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR is_public
  );