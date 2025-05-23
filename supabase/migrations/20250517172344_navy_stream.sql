/*
  # Fix signup RLS policies

  1. Changes
    - Add policy to allow authenticated users to create their own profile
    - Add policy to allow public access to view profiles
    - Fix profile creation during signup

  2. Security
    - Enable RLS on profiles table
    - Add policies for profile management
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can create own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view public profiles" ON public.profiles;

-- Create new policies with correct conditions
CREATE POLICY "Users can create own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view public profiles"
ON public.profiles
FOR SELECT
USING (is_public OR auth.uid() = user_id);

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;