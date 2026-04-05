import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PipelineMetric {
  id: string;
  label: string;
  value: string;
  minLabel: string;
  maxLabel: string;
  benchmark: string;
  score: number; // 0-100
  isInverted?: boolean;
}

const metrics: PipelineMetric[] = [
  { id: "visits", label: "NO OF VISITS", value: "620", minLabel: "0", maxLabel: "850", benchmark: "73%", score: 72.9 },
  { id: "leads", label: "NO OF LEADS", value: "185", minLabel: "0", maxLabel: "300", benchmark: "62%", score: 61.7 },
  { id: "lead-qual", label: "LEAD QUAL %", value: "43.2%", minLabel: "0%", maxLabel: "100%", benchmark: "Tgt: 40%", score: 43.2 },
  { id: "lead-conv", label: "LEAD CONVERSION", value: "11.9%", minLabel: "0%", maxLabel: "30%", benchmark: "Ind avg: 10-15%", score: 39.6 },
  { id: "invoiced", label: "INVOICED DEALS", value: "38", minLabel: "0", maxLabel: "50", benchmark: "76%", score: 76 },
  { id: "back-orders", label: "BACK ORDERS", value: "5", minLabel: "0", maxLabel: "20", benchmark: "Alert: 20", score: 25, isInverted: true },
  { id: "roas", label: "MARKETING ROAS", value: "3.2×", minLabel: "0×", maxLabel: "5×", benchmark: "Tgt: 4×", score: 64 },
  { id: "marketing-leads", label: "MARKETING LEADS", value: "88", minLabel: "0", maxLabel: "120", benchmark: "73%", score: 73.3 },
  { id: "cpl", label: "COST PER LEAD", value: "AED 270", minLabel: "0", maxLabel: "500", benchmark: "Max: 500", score: 54, isInverted: true },
];

function GradientScaleRow({ metric, index }: { metric: PipelineMetric; index: number }) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(metric.score);
    }, 40 * index + 100);
    return () => clearTimeout(timer);
  }, [metric.score, index]);

  const gradientClass = metric.isInverted
    ? "bg-gradient-to-r from-[#00C853] to-[#FF3B30]"
    : "bg-gradient-to-r from-[#D4800A] via-[#A8B800] to-[#00C853]";

  return (
    <div 
      onClick={() => navigate(`/metric/${metric.id}`)}
      className="h-[72px] flex flex-col justify-center cursor-pointer active:opacity-70 transition-opacity duration-120 border-b-[0.5px] border-[#1E1E1E] last:border-0"
    >
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] font-bold text-white uppercase tracking-[1px]">{metric.label}</span>
        <ChevronRight className="w-3 h-3 text-[#444444]" />
      </div>

      <div className="relative h-6 mt-3">
        {/* Tooltip */}
        <div 
          className="absolute -top-5 -translate-x-1/2 transition-all duration-400 ease-out whitespace-nowrap"
          style={{ left: `${progress}%` }}
        >
          <span className="text-[13px] font-bold text-white">{metric.value}</span>
        </div>

        {/* Track */}
        <div className="absolute top-2 left-0 right-0 h-[6px] rounded-[3px] bg-[#333333] overflow-hidden">
          <div 
            className={cn("absolute top-0 left-0 bottom-0 w-full opacity-30", gradientClass)}
          />
          <div 
            className={cn("absolute top-0 left-0 bottom-0 transition-all duration-400 ease-out", gradientClass)}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Marker */}
        <div 
          className="absolute top-2 -ml-1 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] transition-all duration-400 ease-out"
          style={{ left: `${progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center mt-1">
        <span className="text-[11px] font-semibold text-[#D4800A]">{metric.minLabel}</span>
        <div className="flex items-center gap-1">
          <span className="text-[11px] font-semibold text-[#00C853]">{metric.maxLabel}</span>
          <span className="text-[11px] text-[#555555] ml-1">{metric.benchmark}</span>
        </div>
      </div>
    </div>
  );
}

export default function PipelineSection() {
  return (
    <div className="mt-5 px-5 pb-6">
      <h2 className="text-[11px] font-bold text-bhoop-text-secondary uppercase tracking-[2px] mb-3">
        PIPELINE & EFFICIENCY
      </h2>
      <div className="flex flex-col gap-[10px]">
        {metrics.map((metric, i) => (
          <GradientScaleRow key={metric.id} metric={metric} index={i} />
        ))}
      </div>
    </div>
  );
}
