import { AlertTriangle, ChevronRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pulse() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full px-5 pt-4 pb-6">
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-white">PULSE</h1>
        <p className="text-[13px] text-bhoop-text-secondary">Live business alerts</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Critical Alert */}
        <div className="bg-bhoop-surface-elevated rounded-[14px] p-4 border-l-[3px] border-l-bhoop-critical">
          <div className="text-[11px] font-bold text-bhoop-critical mb-1">⚠ CRITICAL</div>
          <h3 className="text-[14px] font-bold text-white mb-2">Net Cash Flow is negative: −AED 45K</h3>
          <p className="text-[13px] text-[#CCCCCC] mb-3">
            Operating cash flow dropped significantly this week due to delayed payments from 2 major clients.
          </p>
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate("/metric/net-cash-flow")}
              className="text-[12px] text-[#0A84FF] flex items-center"
            >
              View Metric <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
            <span className="text-[12px] text-[#555555]">2h ago</span>
          </div>
        </div>

        {/* Watch Alert */}
        <div className="bg-bhoop-surface-elevated rounded-[14px] p-4 border-l-[3px] border-l-bhoop-warning">
          <div className="text-[11px] font-bold text-bhoop-warning mb-1">! WATCH</div>
          <h3 className="text-[14px] font-bold text-white mb-2">Cost Per Lead increased 18%</h3>
          <p className="text-[13px] text-[#CCCCCC] mb-3">
            CPL is now AED 270, approaching the maximum acceptable threshold of AED 500.
          </p>
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate("/metric/cpl")}
              className="text-[12px] text-[#0A84FF] flex items-center"
            >
              View Metric <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
            <span className="text-[12px] text-[#555555]">5h ago</span>
          </div>
        </div>

        {/* BHAI Daily Brief */}
        <div className="bg-[#0D2020] border border-[#00E5C330] rounded-[14px] p-4 mt-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-bhoop-bhai-accent to-[#0A84FF] flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <h3 className="text-[14px] font-bold text-white">BHAI Daily Brief — April 5</h3>
          </div>
          <p className="text-[13px] text-[#CCCCCC] leading-relaxed mb-4">
            Your business is in Good health today. Sales are pacing at 87% of monthly target with 11 days remaining. Collection is strong (DSO: 12 days). One watch: Marketing CPL rose 18% — review campaign spend this week.
          </p>
          <div className="flex justify-between items-center">
            <button className="text-[12px] font-semibold text-bhoop-bhai-accent flex items-center">
              Deep Dive with BHAI <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
            <span className="text-[11px] text-[#555555]">Updated 7:00 AM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
