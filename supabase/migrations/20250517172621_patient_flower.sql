/*
  # Fix RLS policies for profiles table
  
  1. Security Changes
    - Drop existing policies
    - Enable RLS on profiles table
    - Add policies for CRUD operations:
      - INSERT: Only authenticated users can create their own profile
      - SELECT: Users can view public profiles or their own
      - UPDATE: Users can only update their own profile
      - DELETE: Users can only delete their own profile
*/

-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Users can create own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON public.profiles;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create new policies with correct conditions
CREATE POLICY "Enable insert for authenticated users only"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable read access for public profiles"
ON public.profiles
FOR SELECT
USING (is_public OR auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);