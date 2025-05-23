/*
  # Fix RLS policies for profiles table

  1. Changes
    - Drop existing policies to start fresh
    - Enable RLS on profiles table
    - Add policy for authenticated users to insert their own profile
    - Add policy for public profile access
    - Add policy for users to update their own profile
    - Add policy for users to delete their own profile

  2. Security
    - Enable RLS on profiles table
    - Add policies with proper conditions for CRUD operations
    - Ensure user_id matches auth.uid() for all write operations
*/

-- Drop existing policies to start fresh
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Grant necessary privileges
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for public profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
ON public.profiles
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);