/*
  # Fix RLS Policies for Profiles Table

  1. Changes
    - Enable RLS on profiles table
    - Drop all existing policies
    - Re-grant basic privileges
    - Create new policies for:
      - INSERT: Only allow users to insert their own profile
      - SELECT: Allow reading public profiles or own profile
      - UPDATE: Only allow updating own profile
      - DELETE: Only allow deleting own profile

  2. Security
    - Ensures proper access control
    - Prevents unauthorized access
    - Maintains data integrity
*/

-- 1) Turn on Row-Level Security
ALTER TABLE public.profiles
  ENABLE ROW LEVEL SECURITY;

-- 2) Remove any stray policies
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles;', pol.policyname);
  END LOOP;
END
$$;

-- 3) Re-grant basic privileges
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;

-- 4) INSERT: only allow an authenticated user to insert their own row
CREATE POLICY insert_own_profile
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK ( auth.uid() = user_id );

-- 5) SELECT: allow reading public profiles or your own
CREATE POLICY select_public_or_self
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING ( is_public OR auth.uid() = user_id );

-- 6) UPDATE: only allow updating your own row
CREATE POLICY update_own_profile
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ( auth.uid() = user_id )
  WITH CHECK ( auth.uid() = user_id );

-- 7) DELETE: only allow deleting your own row
CREATE POLICY delete_own_profile
  ON public.profiles
  FOR DELETE
  TO authenticated
  USING ( auth.uid() = user_id );