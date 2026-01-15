import { useState, useCallback } from "react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  buttons?: Array<{ name: string; request: any }>;
}

const API_BASE = "https://general-runtime.voiceflow.com";
const VERSION_ID = "production";

// Get or create persistent user ID
const getUserId = (): string => {
  const stored = localStorage.getItem("vf-user-id");
  if (stored) return stored;
  const newId = crypto.randomUUID();
  localStorage.setItem("vf-user-id", newId);
  return newId;
};

export function useVoiceflow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady] = useState(true);
  const [hasLaunched, setHasLaunched] = useState(false);
  const [userId] = useState(getUserId);

  // Make API request to Voiceflow Runtime
  const interact = useCallback(
    async (action: { type: string; payload?: string }) => {
      const response = await fetch(
        `${API_BASE}/state/user/${userId}/interact?logs=off`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            versionID: VERSION_ID,
          },
          body: JSON.stringify({
            action,
            config: { tts: false, stripSSML: true },
          }),
        }
      );
      return response.json();
    },
    [userId]
  );

  // Parse Voiceflow traces into messages
  const parseTraces = useCallback(
    (traces: any[]): { content: string; buttons: Array<{ name: string; request: any }> } => {
      if (!traces || !Array.isArray(traces)) {
        return { content: "", buttons: [] };
      }

      let content = "";
      let buttons: Array<{ name: string; request: any }> = [];

      traces.forEach((trace) => {
        if (trace.type === "text" && trace.payload?.message) {
          content += (content ? "\n" : "") + trace.payload.message;
        } else if (trace.type === "choice" && trace.payload?.buttons) {
          buttons = trace.payload.buttons.map((btn: any) => ({
            name: btn.name,
            request: btn.request,
          }));
        }
      });

      return { content, buttons };
    },
    []
  );

  // Launch conversation
  const launchConversation = useCallback(async () => {
    if (hasLaunched) return;

    setIsLoading(true);
    setHasLaunched(true);

    try {
      const traces = await interact({ type: "launch" });
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
    } finally {
      setIsLoading(false);
    }
  }, [hasLaunched, interact, parseTraces]);

  // Send a text message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const traces = await interact({ type: "text", payload: text.trim() });
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
    [interact, parseTraces]
  );

  // Handle button click
  const handleButtonClick = useCallback(
    async (button: { name: string; request: any }) => {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: button.name,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const traces = await interact(button.request);
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
    [interact, parseTraces]
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
