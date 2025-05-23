/*
  # Update links table sort order

  1. Changes
    - Add sort_order column if it doesn't exist
    - Set default value for sort_order
    - Update existing rows to have sequential sort order

  2. Notes
    - Uses safe DDL operations that check for column existence
    - Maintains data integrity during migration
*/

-- Add sort_order column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'links'
    AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE public.links ADD COLUMN sort_order integer DEFAULT 0;
  END IF;
END $$;

-- Update existing rows to have sequential sort order
WITH numbered_links AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY profile_id ORDER BY created_at) - 1 as new_order
  FROM public.links
)
UPDATE public.links
SET sort_order = numbered_links.new_order
FROM numbered_links
WHERE links.id = numbered_links.id;