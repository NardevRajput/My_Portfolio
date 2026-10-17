import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import chatbotImg from "@/assets/chatbot_img/chatbot.png";

type Msg = {
  role: "user" | "assistant";
  content: string;
};

type ChatApiResponse = {
  reply?: string;
  message?: string;
};

const createConversationId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `chat-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
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
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the same ID for every message in this chat session.
  // Closing and reopening the widget does not reset the conversation.
  const conversationIdRef = useRef<string>(createConversationId());

  const API_URL = `${
    (import.meta.env.VITE_API_URL || "http://localhost:8080").replace(/\/+$/, "")
  }/api/chat`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      const timeout = window.setTimeout(() => inputRef.current?.focus(), 200);
      return () => window.clearTimeout(timeout);
    }
  }, [open]);

  const sendMessageToBackend = async (text: string) => {
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          conversationId: conversationIdRef.current,
        }),
      });

      let data: ChatApiResponse = {};
      try {
        data = (await response.json()) as ChatApiResponse;
      } catch {
        // Keep the generic error message below if the server did not return JSON.
      }

      if (!response.ok) {
        const serverMessage =
          data.message ||
          (response.status === 429
            ? "Too many requests. Please wait a moment and try again."
            : `The chat service returned an error (${response.status}). Please try again.`);
        throw new Error(serverMessage);
      }

      const reply = data.reply?.trim();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            reply ||
            "Sorry, I couldn't generate a response right now. Please try again.",
        },
      ]);
    } catch (error) {
      console.error("Chat API Error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Sorry, I couldn't connect to the AI assistant. Please try again.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const send = async () => {
    const text = input.trim();

    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    await sendMessageToBackend(text);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[32rem] max-h-[calc(100vh-8rem)] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-primary/30 bg-background/95 shadow-[0_0_40px_hsl(var(--primary)/0.25)] backdrop-blur-xl sm:w-96"
          >
            <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-primary/40 bg-primary/10 shadow-sm">
                  <img
                    src={chatbotImg}
                    alt="AI Assistant"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    AI Assistant
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Let's talk about anything
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close chatbot"
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
              aria-live="polite"
            >
              {messages.map((message, index) => (
                <div
                  key={`${index}-${message.role}`}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm border border-border bg-muted/60 text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl rounded-bl-sm border border-border bg-muted/60 px-4 py-3 text-foreground"
                    aria-label="AI is thinking"
                  >
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: "0.15s" }}
                      />
                      <span
                        className="h-2 w-2 animate-bounce rounded-full bg-primary"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-background/50 p-3">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={loading ? "AI is thinking..." : "Type your message..."}
                  disabled={loading}
                  aria-label="Type your message"
                  className="flex-1 rounded-lg border border-primary bg-muted/50 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-60"
                />

                <button
                  onClick={() => void send()}
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close AI assistant" : "Open AI assistant"}
              className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
            >
              {!open && (
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
              )}

              {!open ? (
                <span className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/60 bg-background shadow-[0_0_30px_hsl(var(--primary)/0.55)]">
                  <img
                    src={chatbotImg}
                    alt="Open AI Assistant"
                    className="h-full w-full object-cover"
                  />
                </span>
              ) : (
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/60 bg-primary text-primary-foreground shadow-[0_0_30px_hsl(var(--primary)/0.55)]">
                  <X className="h-6 w-6" />
                </span>
              )}

              {!open && hasNew && (
                <span className="absolute right-0 top-0 z-20 h-3.5 w-3.5 rounded-full border-2 border-background bg-destructive" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Ask me anything</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default ChatBot;
