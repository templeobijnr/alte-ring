/*
  # Add Multimedia Support
  
  1. Changes
    - Add JSONB columns for storing multimedia URLs
    - Add validation functions for URL formats
    - Add check constraints for array length and URL format
    
  2. Security
    - Validate URLs match supported platforms
    - Limit number of items per media type
    - Ensure valid URL formats
*/

-- Add multimedia columns to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS cloud_storage jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS youtube_videos jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS spotify_tracks jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS apple_music_tracks jsonb DEFAULT '[]'::jsonb;

-- Create validation functions
CREATE OR REPLACE FUNCTION is_valid_cloud_storage_url(url text)
RETURNS boolean AS $$
BEGIN
  RETURN url ~* '^https?:\/\/(drive\.google\.com|www\.dropbox\.com|onedrive\.live\.com).*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION is_valid_youtube_url(url text)
RETURNS boolean AS $$
BEGIN
  RETURN url ~* '^https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11}).*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION is_valid_spotify_url(url text)
RETURNS boolean AS $$
BEGIN
  RETURN url ~* '^https?:\/\/open\.spotify\.com\/(track|album|playlist)\/[a-zA-Z0-9]+.*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION is_valid_apple_music_url(url text)
RETURNS boolean AS $$
BEGIN
  RETURN url ~* '^https?:\/\/music\.apple\.com\/.*$';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create array validation functions
CREATE OR REPLACE FUNCTION validate_cloud_storage_urls(urls jsonb)
RETURNS boolean AS $$
DECLARE
  url text;
BEGIN
  IF urls IS NULL OR jsonb_array_length(urls) > 10 THEN
    RETURN false;
  END IF;
  
  FOR url IN SELECT jsonb_array_elements_text(urls) LOOP
    IF NOT is_valid_cloud_storage_url(url) THEN
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_youtube_urls(urls jsonb)
RETURNS boolean AS $$
DECLARE
  url text;
BEGIN
  IF urls IS NULL OR jsonb_array_length(urls) > 5 THEN
    RETURN false;
  END IF;
  
  FOR url IN SELECT jsonb_array_elements_text(urls) LOOP
    IF NOT is_valid_youtube_url(url) THEN
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_spotify_urls(urls jsonb)
RETURNS boolean AS $$
DECLARE
  url text;
BEGIN
  IF urls IS NULL OR jsonb_array_length(urls) > 5 THEN
    RETURN false;
  END IF;
  
  FOR url IN SELECT jsonb_array_elements_text(urls) LOOP
    IF NOT is_valid_spotify_url(url) THEN
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE OR REPLACE FUNCTION validate_apple_music_urls(urls jsonb)
RETURNS boolean AS $$
DECLARE
  url text;
BEGIN
  IF urls IS NULL OR jsonb_array_length(urls) > 5 THEN
    RETURN false;
  END IF;
  
  FOR url IN SELECT jsonb_array_elements_text(urls) LOOP
    IF NOT is_valid_apple_music_url(url) THEN
      RETURN false;
    END IF;
  END LOOP;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Add check constraints using the validation functions
ALTER TABLE public.profiles
ADD CONSTRAINT valid_cloud_storage_urls
CHECK (cloud_storage IS NULL OR validate_cloud_storage_urls(cloud_storage));

ALTER TABLE public.profiles
ADD CONSTRAINT valid_youtube_urls
CHECK (youtube_videos IS NULL OR validate_youtube_urls(youtube_videos));

ALTER TABLE public.profiles
ADD CONSTRAINT valid_spotify_urls
CHECK (spotify_tracks IS NULL OR validate_spotify_urls(spotify_tracks));

ALTER TABLE public.profiles
ADD CONSTRAINT valid_apple_music_urls
CHECK (apple_music_tracks IS NULL OR validate_apple_music_urls(apple_music_tracks));