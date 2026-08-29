/**
 * Legacy insight slugs → canonical slugs. Served as real HTTP 301 redirects
 * by the /insights/$slug route loader (replaces the Netlify [[redirects]]).
 */
export const INSIGHT_REDIRECTS: Record<string, string> = {
  "autonomous-ai-powered-website-web3-context": "autonomous-ai-powered-website-web3",
  "autonomous-ai-powered-web3-website": "autonomous-ai-powered-website-web3",
  "what-is-autonomous-ai-powered-website-web3": "autonomous-ai-powered-website-web3",
  "autonomous-ai-website": "what-is-an-autonomous-ai-website",
  "ai-interpretability-impact-security": "blockchain-startups-build-24-7-digital-growth-system",
  "ai-model-interpretability-critical-ai-safety": "blockchain-startups-build-24-7-digital-growth-system",
  "ai-interpretability-legal-requirement": "blockchain-startups-build-24-7-digital-growth-system",
  "ai-safety-interpretability-cybersecurity": "blockchain-startups-build-24-7-digital-growth-system",
  "offense-defense-imbalance-ai-cybersecurity": "blockchain-startups-build-24-7-digital-growth-system",
};
