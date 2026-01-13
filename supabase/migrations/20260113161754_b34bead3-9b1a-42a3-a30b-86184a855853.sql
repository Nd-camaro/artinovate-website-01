-- Create enum for post status
CREATE TYPE public.post_status AS ENUM ('draft', 'published', 'archived');

-- Create the insight_posts table
CREATE TABLE public.insight_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  target_keyword TEXT,
  secondary_keywords JSONB DEFAULT '[]'::jsonb,
  schema_type TEXT,
  faq_json_ld JSONB,
  status post_status NOT NULL DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  featured_image_url TEXT,
  alt_texts JSONB DEFAULT '[]'::jsonb,
  internal_links JSONB DEFAULT '[]'::jsonb,
  external_links JSONB DEFAULT '[]'::jsonb,
  word_count INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 0,
  social_shares INTEGER DEFAULT 0,
  backlinks_count INTEGER DEFAULT 0,
  conversion_goal TEXT,
  cta_config JSONB
);

-- Create indexes for performance
CREATE INDEX idx_insight_posts_slug ON public.insight_posts(slug);
CREATE INDEX idx_insight_posts_status ON public.insight_posts(status);
CREATE INDEX idx_insight_posts_published_at ON public.insight_posts(published_at);
CREATE INDEX idx_insight_posts_target_keyword ON public.insight_posts(target_keyword);

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_insight_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER trigger_update_insight_posts_updated_at
  BEFORE UPDATE ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_posts_updated_at();

-- Create function to calculate word_count and reading_time
CREATE OR REPLACE FUNCTION public.calculate_insight_post_metrics()
RETURNS TRIGGER AS $$
DECLARE
  words INTEGER;
BEGIN
  -- Calculate word count from content (split by whitespace)
  words := array_length(regexp_split_to_array(COALESCE(NEW.content, ''), '\s+'), 1);
  NEW.word_count := COALESCE(words, 0);
  
  -- Calculate reading time (average 200 words per minute, minimum 1 minute)
  NEW.reading_time := GREATEST(1, CEIL(NEW.word_count::NUMERIC / 200));
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-calculate metrics on insert/update
CREATE TRIGGER trigger_calculate_insight_post_metrics
  BEFORE INSERT OR UPDATE OF content ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_insight_post_metrics();

-- Create validation trigger to enforce published_at only when status is 'published'
CREATE OR REPLACE FUNCTION public.validate_insight_post_published_at()
RETURNS TRIGGER AS $$
BEGIN
  -- If status is not 'published', clear published_at
  IF NEW.status != 'published' THEN
    NEW.published_at := NULL;
  -- If status is 'published' and published_at is null, set it to now
  ELSIF NEW.status = 'published' AND NEW.published_at IS NULL THEN
    NEW.published_at := now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for published_at validation
CREATE TRIGGER trigger_validate_insight_post_published_at
  BEFORE INSERT OR UPDATE ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_insight_post_published_at();

-- Enable Row Level Security
ALTER TABLE public.insight_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read published posts
CREATE POLICY "Anyone can view published posts"
  ON public.insight_posts
  FOR SELECT
  USING (status = 'published');

-- Policy: Authenticated users can manage their own posts
CREATE POLICY "Authors can manage their own posts"
  ON public.insight_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Add comment for documentation
COMMENT ON TABLE public.insight_posts IS 'Stores blog/insight posts with SEO metadata and analytics tracking';