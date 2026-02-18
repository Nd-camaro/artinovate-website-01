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
    // Check if script is already loaded
    if (document.getElementById("voiceflow-widget-script")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "voiceflow-widget-script";
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      window.voiceflow?.chat.load({
        verify: { projectID: "69950fac1279ee129fc94c96" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
      const existingScript = document.getElementById("voiceflow-widget-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Voiceflow widget renders itself, no JSX needed
  return null;
}
