import { useState, useEffect, useRef } from "react";
import { X, Sparkles, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

interface BHAIChatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BHAIChatSheet({ isOpen, onClose }: BHAIChatSheetProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: string; role: "user" | "bhai"; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "What needs my attention today?",
    "Why is my ROAS dropping?",
    "How's my cash position?",
    "Am I on track for the month?",
    "Summarize this week's pipeline",
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: text }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "bhai",
          content: "I've analyzed your metrics. Sales are pacing well, but Marketing ROAS has dropped to 3.2x this week. I recommend reviewing your Meta Ads spend.",
        },
      ]);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[90vh] bg-[#0A0A0A] rounded-t-3xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-bhoop-surface-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bhoop-bhai-accent to-[#0A84FF] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold bg-gradient-to-r from-bhoop-bhai-accent to-[#0A84FF] bg-clip-text text-transparent">
                    BHAI
                  </h2>
                  <p className="text-[11px] text-[#666666]">Your Business Co-Pilot</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-[#A0A0A0]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 pb-0">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col justify-end pb-4">
                  <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                    {suggestedPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt)}
                        className="whitespace-nowrap px-4 py-2 rounded-full border border-bhoop-surface-border bg-bhoop-surface-elevated text-[12px] text-bhoop-text-secondary"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "max-w-[85%] p-3 text-[14px]",
                        msg.role === "user"
                          ? "self-end bg-bhoop-surface-elevated text-white rounded-[16px_16px_4px_16px]"
                          : "self-start bg-[#0D2020] border border-[#00E5C330] text-[#CCCCCC] rounded-[16px_16px_16px_4px]"
                      )}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="self-start bg-[#0D2020] border border-[#00E5C330] rounded-[16px_16px_16px_4px] p-4 flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-bhoop-bhai-accent animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-bhoop-bhai-accent animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-bhoop-bhai-accent animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-4 bg-[#161616] border-t-[0.5px] border-bhoop-surface-border pb-[env(safe-area-inset-bottom)]">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                  placeholder="Ask BHAI anything..."
                  className="w-full bg-bhoop-surface-elevated rounded-[22px] py-2.5 pl-4 pr-12 text-[14px] text-white placeholder:text-[#888888] outline-none"
                />
                <button
                  onClick={() => handleSend(input)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                >
                  <ArrowUpCircle
                    className={cn(
                      "w-7 h-7 transition-colors",
                      input.trim() ? "text-bhoop-bhai-accent" : "text-[#333333]"
                    )}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
