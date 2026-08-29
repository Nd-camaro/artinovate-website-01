import { createFileRoute } from "@tanstack/react-router";
import Privacy from "@/pages/Privacy";

const TITLE = "Privacy Policy | ArtiNovate";
const DESCRIPTION =
  "ArtiNovate Privacy Policy — how we handle information on artinovate.com.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.artinovate.com/privacy" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://www.artinovate.com/privacy" }],
  }),
  component: Privacy,
});
