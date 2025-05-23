/*
  # Fix Profile Table Defaults and Constraints

  1. Changes
    - Add default values for required columns
    - Enable pgcrypto extension for UUID generation
    - Update theme default to include required fields
    - Set proper defaults for timestamps and boolean fields

  2. Security
    - Maintain existing RLS policies
    - Ensure data integrity with proper defaults
*/

-- Enable pgcrypto if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Update default values for profiles table
ALTER TABLE public.profiles
  -- Set UUID default if not already set
  ALTER COLUMN id SET DEFAULT gen_random_uuid(),
  -- Set timestamp defaults
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now(),
  -- Set theme default with required fields
  ALTER COLUMN theme SET DEFAULT '{"layout": "minimal", "primaryColor": "#3b5cff", "buttonStyle": "filled"}'::jsonb,
  -- Set boolean defaults
  ALTER COLUMN is_public SET DEFAULT true;

-- Set defaults for multimedia arrays if they don't exist
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'cloud_storage'
  ) THEN
    ALTER TABLE public.profiles
      ALTER COLUMN cloud_storage SET DEFAULT '[]'::jsonb,
      ALTER COLUMN youtube_videos SET DEFAULT '[]'::jsonb,
      ALTER COLUMN spotify_tracks SET DEFAULT '[]'::jsonb,
      ALTER COLUMN apple_music_tracks SET DEFAULT '[]'::jsonb;
  END IF;
END $$;