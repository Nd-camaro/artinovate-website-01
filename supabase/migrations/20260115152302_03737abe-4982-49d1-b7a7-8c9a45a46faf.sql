-- Update all existing draft/archived insights to published
UPDATE insight_posts
SET status = 'published'
WHERE status = 'draft' OR status = 'archived';

-- Change default value for new rows to 'published'
ALTER TABLE insight_posts 
ALTER COLUMN status SET DEFAULT 'published'::post_status;