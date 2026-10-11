
import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Chatbot Image
import chatbotImg from "@/assets/chatbot_img/chatbot.png";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Nardev's AI Assistant. What would you like to talk about?",
    },
  ]);

  const [hasNew, setHasNew] = useState(true);

  // Loading state
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // =========================================================
  // BACKEND API
  // =========================================================

  const API_URL = "http://localhost:8080/api/chat";

  // =========================================================
  // AUTO-SCROLL
  // =========================================================

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // =========================================================
  // FOCUS INPUT WHEN OPEN
  // =========================================================

  useEffect(() => {
    if (open) {
      setHasNew(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [open]);

  // =========================================================
  // SEND MESSAGE TO SPRING BOOT
  // =========================================================

  const sendMessageToBackend = async (text: string) => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't generate a response right now.",
        },
      ]);
    } catch (error) {
      console.error("Chat API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI assistant. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SEND NORMAL MESSAGE
  // =========================================================

  const send = async () => {
    const text = input.trim();

    if (!text || loading) return;

    const userMsg: Msg = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    await sendMessageToBackend(text);
  };

  // =========================================================
  // ENTER KEY
  // =========================================================

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* =========================================================
          CHAT WINDOW
      ========================================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-8rem)] rounded-2xl border border-primary/30 bg-background/95 backdrop-blur-xl shadow-[0_0_40px_hsl(var(--primary)/0.25)] flex flex-col overflow-hidden"
          >
            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2">

                {/* Chatbot Image */}

                <div className="w-9 h-9 rounded-full overflow-hidden border border-primary/40 bg-primary/10 flex items-center justify-center shadow-sm">
                  <img
                    src={chatbotImg}
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Header Text */}

                <div>
                  <p className="font-semibold text-sm text-foreground">
                    AI Assistant
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    Let's talk about anything
                  </p>
                </div>
              </div>

              {/* Close Button */}

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* =====================================================
                MESSAGES
            ===================================================== */}

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted/60 text-foreground rounded-bl-sm border border-border"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* =================================================
                  LOADING INDICATOR
              ================================================= */}

              {loading && (
                <div className="flex justify-start">
                  <div className="bg-muted/60 text-foreground rounded-2xl rounded-bl-sm border border-border px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="w-2 h-2 rounded-full bg-primary animate-bounce"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* =========================================================
                INPUT AREA
            ========================================================= */}

            <div className="p-3 border-t border-border bg-background/50">
              <div className="flex items-center gap-2">

                {/* Input */}

                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={
                    loading
                      ? "AI is thinking..."
                      : "Type your message..."
                  }
                  disabled={loading}
                  className="flex-1 bg-muted/50 border border-primary rounded-lg px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground disabled:opacity-60"
                />

                {/* Send Button */}

                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          FLOATING CHAT BUTTON
      ========================================================= */}

      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={
                open
                  ? "Close AI assistant"
                  : "Open AI assistant"
              }
              className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
            >
              {/* Ping Animation */}

              {!open && (
                <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
              )}

              {/* =================================================
                  CHATBOT IMAGE
              ================================================= */}

              {!open ? (
                <span className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/60 bg-background shadow-[0_0_30px_hsl(var(--primary)/0.55)]">
                  <img
                    src={chatbotImg}
                    alt="Open AI Assistant"
                    className="w-full h-full object-cover"
                  />
                </span>
              ) : (
                <span className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.55)] border border-primary/60">
                  <X className="h-6 w-6" />
                </span>
              )}

              {/* Notification Dot */}

              {!open && hasNew && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-destructive border-2 border-background z-20" />
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent side="left">
            Ask me anything
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ChatBot;
