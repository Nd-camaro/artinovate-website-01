-- Create triggers for insight_posts automation

-- Trigger to validate/set published_at based on status
CREATE TRIGGER validate_insight_post_published_at_trigger
  BEFORE INSERT OR UPDATE ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_insight_post_published_at();

-- Trigger to calculate word count and reading time
CREATE TRIGGER calculate_insight_post_metrics_trigger
  BEFORE INSERT OR UPDATE ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_insight_post_metrics();

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_insight_posts_updated_at_trigger
  BEFORE UPDATE ON public.insight_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_insight_posts_updated_at();

-- Update existing posts that are drafts to published (so they display)
UPDATE public.insight_posts
SET status = 'published'
WHERE status = 'draft';