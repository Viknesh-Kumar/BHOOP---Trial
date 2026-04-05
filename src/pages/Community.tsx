import { Users } from "lucide-react";

export default function Community() {
  return (
    <div className="flex flex-col items-center justify-center h-full px-5 text-center relative overflow-hidden">
      {/* Background concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[200px] h-[200px] rounded-full border border-[#00E5C310] animate-ping-slow" style={{ animationDuration: '3s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-[#00E5C310] animate-ping-slow" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#00E5C310] animate-ping-slow" style={{ animationDuration: '3s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-[280px]">
        <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-gradient-to-br from-bhoop-bhai-accent to-[#0A84FF]">
          <Users className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-[28px] font-bold text-white mb-2">Community</h1>
        <h2 className="text-[14px] font-bold text-bhoop-bhai-accent uppercase tracking-[3px] mb-4">
          COMING SOON
        </h2>
        
        <p className="text-[14px] text-[#666666] leading-[1.6] mb-8">
          Connect with other BHOOP users, share insights, and learn from peer CEOs. We're building something special.
        </p>

        <div className="w-full flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="Enter your email for early access"
            className="w-full bg-bhoop-surface-elevated border border-bhoop-surface-border rounded-[12px] px-4 py-[14px] text-[14px] text-white placeholder:text-[#666666] outline-none focus:border-bhoop-bhai-accent transition-colors"
          />
          <button className="w-full bg-gradient-to-r from-bhoop-bhai-accent to-[#0A84FF] text-black font-bold text-[14px] rounded-[12px] py-[14px] active:scale-95 transition-transform duration-120">
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
}
