import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { useVoiceflow } from "@/hooks/useVoiceflow";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    isReady,
    hasLaunched,
    sendMessage,
    launchConversation,
    handleButtonClick,
  } = useVoiceflow();

  // Launch conversation when chat opens
  useEffect(() => {
    if (isOpen && isReady && !hasLaunched) {
      launchConversation();
    }
  }, [isOpen, isReady, hasLaunched, launchConversation]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Get the last message's buttons for quick actions
  const lastMessageButtons = messages.length > 0 
    ? messages[messages.length - 1].buttons 
    : undefined;

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
            onClick={() => setIsOpen(true)}
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
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-destructive text-destructive-foreground shadow-md">
              1
            </span>
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
              {/* Show loading state while waiting for launch */}
              {!hasLaunched && isLoading && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 text-primary animate-spin" />
                </div>
              )}

              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 mb-4 ${message.role === "user" ? "justify-end" : ""}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`flex-1 max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-md"
                        : "bg-muted rounded-tl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    <span className="text-[10px] opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && hasLaunched && (
                <div className="flex gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Quick action buttons from Voiceflow */}
              {lastMessageButtons && lastMessageButtons.length > 0 && !isLoading && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {lastMessageButtons.map((button, index) => (
                    <button
                      key={index}
                      onClick={() => handleButtonClick(button)}
                      className="px-3 py-1.5 text-xs rounded-full border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
                    >
                      {button.name}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  disabled={isLoading || !isReady}
                  className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputValue.trim() || !isReady}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
