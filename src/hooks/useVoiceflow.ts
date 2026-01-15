import { useState, useEffect, useCallback, useRef } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  buttons?: Array<{ name: string; request: any }>;
}

declare global {
  interface Window {
    voiceflow: {
      chat: {
        load: (config: any) => Promise<void>;
        open: () => void;
        close: () => void;
        hide: () => void;
        show: () => void;
        interact: (action: { type: string; payload?: any }) => Promise<any[]>;
        proactive: {
          clear: () => void;
        };
      };
    };
  }
}

export function useVoiceflow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasLaunched, setHasLaunched] = useState(false);
  const initializingRef = useRef(false);

  // Load Voiceflow script
  useEffect(() => {
    if (window.voiceflow || document.querySelector('script[src*="voiceflow"]')) {
      return;
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.onload = () => {
      window.voiceflow.chat.load({
        verify: { projectID: "69683416f7032a296d4dfd92" },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
      }).then(() => {
        // Hide the default Voiceflow widget completely
        window.voiceflow.chat.hide();
        window.voiceflow.chat.proactive.clear();
        setIsReady(true);
      });
    };

    document.head.appendChild(script);

    // Hide Voiceflow widget with CSS as backup
    const style = document.createElement("style");
    style.textContent = `
      #voiceflow-chat, 
      .vfrc-widget, 
      .vfrc-launcher,
      [data-testid="widget-bubble"],
      [class*="vfrc"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Parse Voiceflow traces into messages
  const parseTraces = useCallback((traces: any[]): { content: string; buttons: Array<{ name: string; request: any }> } => {
    let content = "";
    let buttons: Array<{ name: string; request: any }> = [];

    traces.forEach((trace) => {
      if (trace.type === "text") {
        content += (content ? "\n" : "") + trace.payload.message;
      } else if (trace.type === "choice") {
        buttons = trace.payload.buttons.map((btn: any) => ({
          name: btn.name,
          request: btn.request,
        }));
      }
    });

    return { content, buttons };
  }, []);

  // Launch conversation
  const launchConversation = useCallback(async () => {
    if (!isReady || hasLaunched || initializingRef.current) return;
    
    initializingRef.current = true;
    setIsLoading(true);

    try {
      const traces = await window.voiceflow.chat.interact({ type: "launch" });
      const { content, buttons } = parseTraces(traces);

      if (content) {
        setMessages([
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content,
            timestamp: new Date(),
            buttons: buttons.length > 0 ? buttons : undefined,
          },
        ]);
      }
      setHasLaunched(true);
    } catch (error) {
      console.error("Voiceflow launch error:", error);
      setMessages([
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "👋 Hi there! Welcome to ArtiNovate. How can we help you today?",
          timestamp: new Date(),
        },
      ]);
      setHasLaunched(true);
    } finally {
      setIsLoading(false);
      initializingRef.current = false;
    }
  }, [isReady, hasLaunched, parseTraces]);

  // Send a text message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!isReady || !text.trim()) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const traces = await window.voiceflow.chat.interact({
          type: "text",
          payload: text.trim(),
        });

        const { content, buttons } = parseTraces(traces);

        if (content) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content,
              timestamp: new Date(),
              buttons: buttons.length > 0 ? buttons : undefined,
            },
          ]);
        }
      } catch (error) {
        console.error("Voiceflow send error:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Sorry, I encountered an error. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isReady, parseTraces]
  );

  // Handle button click
  const handleButtonClick = useCallback(
    async (button: { name: string; request: any }) => {
      if (!isReady) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: button.name,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const traces = await window.voiceflow.chat.interact(button.request);
        const { content, buttons } = parseTraces(traces);

        if (content) {
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content,
              timestamp: new Date(),
              buttons: buttons.length > 0 ? buttons : undefined,
            },
          ]);
        }
      } catch (error) {
        console.error("Voiceflow button error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [isReady, parseTraces]
  );

  return {
    messages,
    isLoading,
    isReady,
    hasLaunched,
    sendMessage,
    launchConversation,
    handleButtonClick,
  };
}
