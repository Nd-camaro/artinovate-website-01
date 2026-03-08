import { useEffect } from "react";

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: {
          verify: { projectID: string };
          url: string;
          versionID: string;
          voice?: { url: string };
        }) => void;
      };
    };
  }
}

export function ChatWidget() {
  useEffect(() => {
    const loadWidget = () => {
      if (document.getElementById("voiceflow-widget-script")) return;

      const script = document.createElement("script");
      script.id = "voiceflow-widget-script";
      script.type = "text/javascript";
      script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      script.onload = () => {
        window.voiceflow?.chat.load({
          verify: { projectID: "69950fac1279ee129fc94c96" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: { url: "https://runtime-api.voiceflow.com" },
        });
      };
      document.body.appendChild(script);
    };

    // Defer widget loading to after main content renders
    const id = typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback(loadWidget, { timeout: 4000 })
      : null;
    const fallback = id === null ? setTimeout(loadWidget, 3000) : null;

    return () => {
      if (id !== null) cancelIdleCallback(id);
      if (fallback !== null) clearTimeout(fallback);
      document.getElementById("voiceflow-widget-script")?.remove();
    };
  }, []);

  return null;
}
