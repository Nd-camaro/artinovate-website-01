-- Add CTA fields to insight_posts table
ALTER TABLE public.insight_posts
ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS cta_url TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS cta_enabled BOOLEAN DEFAULT false;

-- Add comments for clarity
COMMENT ON COLUMN public.insight_posts.cta_text IS 'CTA button text, e.g. "Book a strategy call"';
COMMENT ON COLUMN public.insight_posts.cta_url IS 'CTA destination URL or internal route';
COMMENT ON COLUMN public.insight_posts.cta_enabled IS 'Whether to display the CTA on this post';