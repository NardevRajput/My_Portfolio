import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        "Hi! 👋 I'm Nardev's AI assistant. Ask me about his skills, projects, experience, or how to hire him.",
    },
  ]);

  const [hasNew, setHasNew] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      setHasNew(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  const send = () => {
    const text = input.trim();

    if (!text) return;

    const userMsg: Msg = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMsg]);

    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      send();
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
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] max-h-[calc(100vh-8rem)] rounded-2xl border border-primary/30 bg-background/95 backdrop-blur-xl shadow-[0_0_40px_hsl(var(--primary)/0.25)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary" />
                </div>

                <div>
                  <p className="font-semibold text-sm text-foreground">
                    AI Assistant
                  </p>

                  <p className="text-[11px] text-muted-foreground">
                    Ask me anything about Nardev
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
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
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border bg-background/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 bg-muted/50 border border-primary rounded-lg px-3 py-2 text-sm outline-none text-foreground placeholder:text-muted-foreground"
                />

                <button
                  onClick={send}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setOpen((v) => !v)}
              className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.55)] hover:scale-110 transition-all border border-primary/60"
            >
              {!open && (
                <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
              )}

              <span className="relative">
                {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
              </span>

              {!open && hasNew && (
                <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-destructive border-2 border-background" />
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
