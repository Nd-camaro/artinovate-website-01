// Returns the Flutterwave public key from edge secret storage.
// Public keys are safe to expose to the browser; this endpoint
// simply avoids hardcoding the key in the repo.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  const key = Deno.env.get("FLUTTERWAVE_PUBLIC_KEY") ?? "";
  return new Response(JSON.stringify({ publicKey: key }), {
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300",
    },
  });
});