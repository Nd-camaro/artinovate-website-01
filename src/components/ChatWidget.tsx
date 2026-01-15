import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

declare global {
  interface Window {
    voiceflow?: {
      chat: {
        load: (config: unknown) => void;
        interact: (action: { type: string; payload?: string }) => Promise<unknown[]>;
        hide: () => void;
        show: () => void;
      };
    };
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "assistant",
      content: "👋 Hi there! Welcome to ArtiNovate. How can we help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Hide the default Voiceflow widget
  useEffect(() => {
    const hideVoiceflowWidget = () => {
      if (window.voiceflow?.chat?.hide) {
        window.voiceflow.chat.hide();
      }
    };

    // Try immediately and also after a delay
    hideVoiceflowWidget();
    const timer = setTimeout(hideVoiceflowWidget, 1000);
    const timer2 = setTimeout(hideVoiceflowWidget, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Interact with Voiceflow
      if (window.voiceflow?.chat?.interact) {
        const response = await window.voiceflow.chat.interact({
          type: "text",
          payload: text.trim(),
        });

        // Parse Voiceflow response
        const assistantMessages: string[] = [];
        
        if (Array.isArray(response)) {
          response.forEach((trace: unknown) => {
            const t = trace as { type?: string; payload?: { message?: string; slate?: { content?: { children?: { text?: string }[] }[] } } };
            if (t.type === "text" && t.payload?.message) {
              assistantMessages.push(t.payload.message);
            } else if (t.type === "speak" && t.payload?.message) {
              assistantMessages.push(t.payload.message);
            } else if (t.payload?.slate?.content) {
              const slateContent = t.payload.slate.content
                .map((block: { children?: { text?: string }[] }) => 
                  block.children?.map((child: { text?: string }) => child.text || "").join("") || ""
                )
                .join("\n");
              if (slateContent) {
                assistantMessages.push(slateContent);
              }
            }
          });
        }

        const responseText = assistantMessages.join("\n\n") || 
          "I'm here to help! Feel free to ask me anything about ArtiNovate.";

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: responseText,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        // Fallback if Voiceflow isn't loaded
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to explore our website or schedule a demo.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "I apologize, but I'm having trouble connecting right now. Please try again in a moment or contact us directly.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (action: string) => {
    sendMessage(action);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setHasNewMessage(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Badge Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Open chat"
          >
            {/* Pulse ring animation */}
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
            
            {/* Main button */}
            <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_hsl(var(--primary))]">
              <MessageCircle className="w-6 h-6" />
            </div>

            {/* Notification badge */}
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground shadow-md">
                1
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl bg-card border border-border shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">ArtiNovate Support</h3>
                  <p className="text-xs text-muted-foreground">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="h-[320px] p-5 overflow-y-auto bg-background/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 mb-4 ${
                    message.type === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.type === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`flex-1 max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-md ml-auto"
                        : "bg-muted rounded-tl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span
                      className={`text-[10px] mt-2 block ${
                        message.type === "user"
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick action buttons - only show at start */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Schedule a demo", "Pricing info", "Technical support"].map((action) => (
                    <button
                      key={action}
                      onClick={() => handleQuickAction(action)}
                      className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  disabled={isLoading}
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Powered by ArtiNovate
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
