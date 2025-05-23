/*
  # Rename link_order column to sort_order
  
  1. Changes
    - Rename link_order column to sort_order in links table
    - Set default value for sort_order column
    
  2. Notes
    - Using link_order instead of "order" since that's the actual column name
    - Ensuring default value is set correctly
*/

-- Rename the column
ALTER TABLE public.links RENAME COLUMN link_order TO sort_order;

-- Update column default
ALTER TABLE public.links ALTER COLUMN sort_order SET DEFAULT 0;