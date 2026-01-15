import { useState, useCallback, useRef, useEffect } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface VoiceflowConfig {
  projectID: string;
  runtimeURL: string;
  versionID: string;
}

const VOICEFLOW_CONFIG: VoiceflowConfig = {
  projectID: "66b7fd279aa5c5d732078d05",
  runtimeURL: "https://general-runtime.voiceflow.com",
  versionID: "production",
};

// Generate or retrieve session ID
const getSessionId = (): string => {
  const storageKey = "artinovate_vf_session";
  let sessionId = sessionStorage.getItem(storageKey);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem(storageKey, sessionId);
  }
  return sessionId;
};

export function useVoiceflow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(getSessionId());
  const hasLaunchedRef = useRef(false);

  // Initialize conversation with Voiceflow (launch action)
  const initializeConversation = useCallback(async () => {
    if (hasLaunchedRef.current) return;
    
    try {
      hasLaunchedRef.current = true;
      const response = await fetch(
        `${VOICEFLOW_CONFIG.runtimeURL}/state/user/${sessionIdRef.current}/interact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: VOICEFLOW_CONFIG.projectID,
            versionID: VOICEFLOW_CONFIG.versionID,
          },
          body: JSON.stringify({
            action: { type: "launch" },
            config: { tts: false, stripSSML: true },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initialize conversation");
      }

      const traces = await response.json();
      processTraces(traces);
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      console.error("Voiceflow initialization error:", err);
      hasLaunchedRef.current = false;
      // Show welcome message even if Voiceflow fails
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "👋 Hi there! Welcome to ArtiNovate. How can we help you today?",
          timestamp: new Date(),
        },
      ]);
      setIsInitialized(true);
    }
  }, []);

  // Process Voiceflow response traces
  const processTraces = useCallback((traces: any[]) => {
    const newMessages: Message[] = [];

    for (const trace of traces) {
      if (trace.type === "text" || trace.type === "speak") {
        const content = trace.payload?.message || trace.payload?.text || "";
        if (content.trim()) {
          newMessages.push({
            id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            role: "assistant",
            content: content.trim(),
            timestamp: new Date(),
          });
        }
      }
    }

    if (newMessages.length > 0) {
      setMessages((prev) => [...prev, ...newMessages]);
    }
  }, []);

  // Send message to Voiceflow
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      // Add user message immediately
      const userMessage: Message = {
        id: `user_${Date.now()}`,
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${VOICEFLOW_CONFIG.runtimeURL}/state/user/${sessionIdRef.current}/interact`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: VOICEFLOW_CONFIG.projectID,
              versionID: VOICEFLOW_CONFIG.versionID,
            },
            body: JSON.stringify({
              action: { type: "text", payload: text.trim() },
              config: { tts: false, stripSSML: true },
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const traces = await response.json();
        processTraces(traces);
      } catch (err) {
        console.error("Voiceflow message error:", err);
        setError("System temporarily unavailable. Leave your email and we will follow up.");
        setMessages((prev) => [
          ...prev,
          {
            id: `error_${Date.now()}`,
            role: "assistant",
            content: "System temporarily unavailable. Leave your email and we will follow up.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [processTraces]
  );

  // Clear conversation
  const clearConversation = useCallback(() => {
    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    sessionStorage.setItem("artinovate_vf_session", newSessionId);
    sessionIdRef.current = newSessionId;
    hasLaunchedRef.current = false;
    setMessages([]);
    setIsInitialized(false);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    isInitialized,
    error,
    sendMessage,
    initializeConversation,
    clearConversation,
  };
}
