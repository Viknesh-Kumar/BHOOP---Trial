import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function MetricDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<"D" | "W" | "M">("W");
  const [selectedBar, setSelectedBar] = useState<number | null>(4);

  // Mock data based on ID
  const title = id?.replace(/-/g, " ").toUpperCase() || "METRIC";
  const value = id === "sales-run-rate" ? "74%" : id === "cpl" ? "AED 270" : "42.5";
  const delta = "↑ +4.2% vs last month";
  const isPositive = true;

  const chartData = {
    D: [
      { label: "Mon", value: 60 }, { label: "Tue", value: 85 }, 
      { label: "Wed", value: 75 }, { label: "Thu", value: 90 }, 
      { label: "Fri", value: 100 }, { label: "Sat", value: 40 }, { label: "Sun", value: 30 }
    ],
    W: [
      { label: "3 Mar-\n9 Mar", value: 60 }, { label: "10 Mar-\n16 Mar", value: 85 }, 
      { label: "17 Mar-\n23 Mar", value: 75 }, { label: "24 Mar-\n30 Mar", value: 90 }, 
      { label: "31 Mar-\n5 Apr", value: 100 }
    ],
    M: [
      { label: "Jan", value: 70 }, { label: "Feb", value: 85 }, 
      { label: "Mar", value: 95 }, { label: "Apr", value: 80 }
    ]
  };

  const currentData = chartData[timeframe];
  const maxValue = Math.max(...currentData.map(d => d.value));

  return (
    <div className="flex flex-col min-h-full bg-bhoop-bg pb-6">
      {/* Header */}
      <div className="px-5 pt-4 pb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-[14px] text-[#A0A0A0] mb-4 -ml-1">
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        
        <h1 className="text-[12px] font-bold text-[#A0A0A0] uppercase tracking-[2px] mb-1">{title}</h1>
        <div className="flex items-end gap-3">
          <div className="text-[38px] font-bold text-white leading-none">{value}</div>
          <div className={cn(
            "text-[11px] font-semibold px-2.5 py-1 rounded-full mb-1",
            isPositive ? "bg-bhoop-badge-healthy text-bhoop-healthy" : "bg-bhoop-badge-critical text-bhoop-critical"
          )}>
            {delta}
          </div>
        </div>
      </div>

      {/* Timeline Toggle */}
      <div className="px-5 mb-6">
        <div className="flex bg-bhoop-surface-elevated rounded-[20px] p-1 h-[36px] w-[180px]">
          {(["D", "W", "M"] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTimeframe(t);
                setSelectedBar(null);
              }}
              className={cn(
                "flex-1 rounded-[16px] text-[13px] transition-colors",
                timeframe === t ? "bg-white text-black font-bold" : "text-[#555555] font-normal"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="px-5 mb-8 h-[220px] relative flex items-end gap-1">
        {currentData.map((d, i) => {
          const heightPct = (d.value / maxValue) * 100;
          const isSelected = selectedBar === i;
          const isDimmed = selectedBar !== null && !isSelected;
          
          // Color logic based on value
          const colorClass = heightPct > 66 ? "from-[#30D158]/60 to-[#30D158]" : 
                             heightPct > 33 ? "from-[#FFD60A]/60 to-[#FFD60A]" : 
                             "from-[#FF3B30]/60 to-[#FF3B30]";

          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full relative group" onClick={() => setSelectedBar(i)}>
              {isSelected && (
                <div className="absolute -top-10 bg-white text-black text-[12px] font-semibold px-2 py-1 rounded-[8px] whitespace-nowrap z-10 shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {d.label} · {d.value}
                </div>
              )}
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${heightPct}%` }}
                transition={{ duration: 0.3, delay: i * 0.03, ease: "easeOut" }}
                className={cn(
                  "w-full rounded-t-[4px] bg-gradient-to-t transition-opacity duration-200",
                  colorClass,
                  isDimmed ? "opacity-40" : "opacity-100",
                  isSelected && "ring-2 ring-white/20"
                )}
              />
              <div className="text-[9px] text-[#555555] mt-2 h-6 whitespace-pre-line text-center leading-tight">{d.label}</div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="px-5 mb-8">
        <div className="flex bg-bhoop-surface-elevated rounded-[16px] h-[64px] divide-x divide-bhoop-surface-border">
          <div className="flex-1 flex flex-col justify-center pl-4">
            <span className="text-[11px] text-[#A0A0A0]">AVG</span>
            <span className="text-[20px] font-bold text-white">72.4</span>
          </div>
          <div className="flex-1 flex flex-col justify-center pl-4">
            <span className="text-[11px] text-[#A0A0A0]">HIGH</span>
            <span className="text-[20px] font-bold text-bhoop-healthy">100</span>
          </div>
          <div className="flex-1 flex flex-col justify-center pl-4">
            <span className="text-[11px] text-[#A0A0A0]">LOW</span>
            <span className="text-[20px] font-bold text-bhoop-critical">30</span>
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="px-5 mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] text-[#555555] uppercase">30-DAY TREND</span>
        </div>
        <div className="h-[40px] relative">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sparkline-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A84FF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path 
              d="M0,30 Q10,10 20,20 T40,15 T60,25 T80,5 T100,10 L100,40 L0,40 Z" 
              fill="url(#sparkline-gradient)" 
            />
            <path 
              d="M0,30 Q10,10 20,20 T40,15 T60,25 T80,5 T100,10" 
              fill="none" 
              stroke="#0A84FF" 
              strokeWidth="1.5"
            />
          </svg>
        </div>
      </div>

      {/* BHAI Insight */}
      <div className="px-5">
        <div className="bg-[#0D2020] border border-[#00E5C320] rounded-[16px] p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-bhoop-bhai-accent" />
            <span className="text-[11px] font-bold text-bhoop-bhai-accent uppercase tracking-[1.5px]">BHAI INSIGHT</span>
          </div>
          <p className="text-[14px] text-[#CCCCCC] leading-[1.6] mb-3">
            You're pacing at 86.7% of this month's target with 11 days remaining. Tuesdays and Wednesdays account for 62% of your weekly closings. Push for 3 additional deals this week to get ahead of pace.
          </p>
          <button className="text-[12px] font-semibold text-bhoop-bhai-accent">
            Ask BHAI →
          </button>
        </div>
      </div>
    </div>
  );
}
