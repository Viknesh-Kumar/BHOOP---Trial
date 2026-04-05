import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import BHAIChatSheet from "./BHAIChatSheet";

export default function BHAIFab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="fixed bottom-[100px] right-6 z-50">
        {pulse && (
          <div className="absolute inset-0 rounded-full bg-bhoop-bhai-accent opacity-40 animate-ping-slow" />
        )}
        <button
          onPointerDown={() => setIsPressed(true)}
          onPointerUp={() => setIsPressed(false)}
          onPointerLeave={() => setIsPressed(false)}
          onClick={() => setIsOpen(true)}
          className={cn(
            "relative h-14 px-5 rounded-full flex items-center justify-center gap-2 transition-transform duration-200",
            "bg-gradient-to-br from-bhoop-bhai-accent to-[#0A84FF]",
            "shadow-[0_0_0_4px_rgba(0,229,195,0.2),0_4px_16px_rgba(0,0,0,0.4)]",
            isPressed ? "scale-95" : "scale-100"
          )}
        >
          <Sparkles className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-[14px]">Ask BHAI</span>
        </button>
      </div>

      <BHAIChatSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
