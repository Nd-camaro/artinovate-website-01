-- 1. Fix mutable search_path on the three trigger functions (lint 0011)
ALTER FUNCTION public.update_insight_posts_updated_at() SET search_path = public;
ALTER FUNCTION public.calculate_insight_post_metrics() SET search_path = public;
ALTER FUNCTION public.validate_insight_post_published_at() SET search_path = public;

-- 2. Add RLS policies for the insights_assets storage bucket
-- Public read access (bucket is public; images must load on the published site)
CREATE POLICY "Anyone can view insights assets"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'insights_assets');

-- Only authenticated users can upload to the bucket
CREATE POLICY "Authenticated users can upload insights assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'insights_assets');

-- Only authenticated users can update objects in the bucket
CREATE POLICY "Authenticated users can update insights assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'insights_assets')
WITH CHECK (bucket_id = 'insights_assets');

-- Only authenticated users can delete objects in the bucket
CREATE POLICY "Authenticated users can delete insights assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'insights_assets');