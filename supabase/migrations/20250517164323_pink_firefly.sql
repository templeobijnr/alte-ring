/*
  # Add profiles insert policy
  
  1. Changes
    - Add RLS policy to allow users to create their own profile
    - Policy ensures user can only create a profile with their own user_id
*/

-- Add policy to allow users to create their own profile
CREATE POLICY "Users can create own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);