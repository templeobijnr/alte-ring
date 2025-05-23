/*
  # Initial Schema Setup

  1. New Tables
    - `profiles`: Stores user profile information
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `avatar_url` (text)
      - `bio` (text)
      - `location` (text)
      - `theme` (jsonb)
      - `is_public` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `links`: Stores profile links
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `platform` (text)
      - `label` (text)
      - `url` (text)
      - `link_order` (integer)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `profile_views`: Tracks profile views
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `ip_address` (text)
      - `user_agent` (text)
      - `location` (text)
      - `created_at` (timestamptz)

    - `link_clicks`: Tracks link clicks
      - `id` (uuid, primary key)
      - `link_id` (uuid, references links)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Profile viewing and management
      - Link viewing and management
      - Profile view tracking
      - Link click tracking

  3. Functions & Triggers
    - Add triggers for updating timestamps
*/

-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  theme jsonb DEFAULT '{"layout": "minimal", "primaryColor": "#3b5cff", "buttonStyle": "filled"}'::jsonb,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Create links table
CREATE TABLE public.links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles ON DELETE CASCADE,
  platform text NOT NULL,
  label text NOT NULL,
  url text NOT NULL,
  link_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create profile_views table
CREATE TABLE public.profile_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles ON DELETE CASCADE,
  ip_address text NOT NULL,
  user_agent text,
  location text,
  created_at timestamptz DEFAULT now()
);

-- Create link_clicks table
CREATE TABLE public.link_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES public.links ON DELETE CASCADE,
  ip_address text NOT NULL,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view public profiles"
  ON public.profiles
  FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own profile"
  ON public.profiles
  FOR DELETE
  USING (auth.uid() = user_id);

-- Links policies
CREATE POLICY "Users can view public links"
  ON public.links
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = links.profile_id
      AND (profiles.is_public = true OR profiles.user_id = auth.uid())
    )
  );

CREATE POLICY "Users can manage own links"
  ON public.links
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = links.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Profile views policies
CREATE POLICY "Anyone can create profile views"
  ON public.profile_views
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own profile views"
  ON public.profile_views
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = profile_views.profile_id
      AND profiles.user_id = auth.uid()
    )
  );

-- Link clicks policies
CREATE POLICY "Anyone can create link clicks"
  ON public.link_clicks
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view own link clicks"
  ON public.link_clicks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      JOIN public.links l ON l.profile_id = p.id
      WHERE l.id = link_clicks.link_id
      AND p.user_id = auth.uid()
    )
  );

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION handle_profile_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create function to handle link updates
CREATE OR REPLACE FUNCTION handle_link_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_profile_updated();

CREATE TRIGGER link_updated
  BEFORE UPDATE ON public.links
  FOR EACH ROW
  EXECUTE FUNCTION handle_link_updated();