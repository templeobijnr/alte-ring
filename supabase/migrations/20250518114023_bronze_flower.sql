/*
  # Fix Authentication and RLS Policies

  1. Changes
    - Drops all existing policies on profiles table
    - Re-enables RLS
    - Creates new policies for CRUD operations
    - Adds username length constraint
    
  2. Security
    - Enables RLS on profiles table
    - Adds policies for authenticated users
    - Grants necessary privileges
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;

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

-- Add username length constraint if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_constraint 
    WHERE conname = 'username_length'
  ) THEN
    ALTER TABLE public.profiles
    ADD CONSTRAINT username_length CHECK (char_length(username) >= 3);
  END IF;
END$$;