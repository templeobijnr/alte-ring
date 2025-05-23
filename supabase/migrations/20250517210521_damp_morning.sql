-- Drop existing policies to clean up
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for public profiles" ON public.profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.profiles;

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