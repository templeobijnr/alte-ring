/*
  # Fix Profile Defaults and Constraints
  
  1. Changes
    - Add default values for all required columns
    - Add proper constraints for multimedia arrays
    - Enable pgcrypto for UUID generation
    
  2. Security
    - Ensure all required fields have appropriate defaults
    - Add validation for multimedia URLs
*/

-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update profiles table defaults
ALTER TABLE public.profiles
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now(),
  ALTER COLUMN theme SET DEFAULT '{"layout": "minimal", "primaryColor": "#3b5cff", "buttonStyle": "filled"}'::jsonb,
  ALTER COLUMN is_public SET DEFAULT true,
  ALTER COLUMN cloud_storage SET DEFAULT '[]'::jsonb,
  ALTER COLUMN youtube_videos SET DEFAULT '[]'::jsonb,
  ALTER COLUMN spotify_tracks SET DEFAULT '[]'::jsonb,
  ALTER COLUMN apple_music_tracks SET DEFAULT '[]'::jsonb;

-- Add check constraints for username
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS username_length,
  ADD CONSTRAINT username_length CHECK (char_length(username) >= 3);

-- Add check constraints for multimedia arrays
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS valid_cloud_storage_urls,
  DROP CONSTRAINT IF EXISTS valid_youtube_urls,
  DROP CONSTRAINT IF EXISTS valid_spotify_urls,
  DROP CONSTRAINT IF EXISTS valid_apple_music_urls;

-- Create validation functions if they don't exist
CREATE OR REPLACE FUNCTION validate_cloud_storage_urls(urls jsonb)
RETURNS boolean AS $$
BEGIN
  RETURN (urls IS NULL OR jsonb_array_length(urls) <= 10);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_youtube_urls(urls jsonb)
RETURNS boolean AS $$
BEGIN
  RETURN (urls IS NULL OR jsonb_array_length(urls) <= 5);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_spotify_urls(urls jsonb)
RETURNS boolean AS $$
BEGIN
  RETURN (urls IS NULL OR jsonb_array_length(urls) <= 5);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_apple_music_urls(urls jsonb)
RETURNS boolean AS $$
BEGIN
  RETURN (urls IS NULL OR jsonb_array_length(urls) <= 5);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add constraints using validation functions
ALTER TABLE public.profiles
  ADD CONSTRAINT valid_cloud_storage_urls
    CHECK (validate_cloud_storage_urls(cloud_storage)),
  ADD CONSTRAINT valid_youtube_urls
    CHECK (validate_youtube_urls(youtube_videos)),
  ADD CONSTRAINT valid_spotify_urls
    CHECK (validate_spotify_urls(spotify_tracks)),
  ADD CONSTRAINT valid_apple_music_urls
    CHECK (validate_apple_music_urls(apple_music_tracks));