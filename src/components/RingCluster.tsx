import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ScoreRingProps {
  id: string;
  value: number;
  label: string;
  subLabel: string;
  color: string;
  displayValue: string;
}

function ScoreRing({ id, value, label, subLabel, color, displayValue }: ScoreRingProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 44; // 88px inner diameter / 2
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform duration-120"
      onClick={() => navigate(`/metric/${id}`)}
    >
      <div className="relative w-[96px] h-[96px] flex items-center justify-center">
        {/* Background Track */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="8"
            fill="none"
          />
          {/* Animated Arc */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-600 ease-[cubic-bezier(0.33,1,0.68,1)]"
            style={{
              filter: `drop-shadow(0 0 12px ${color}66)`,
            }}
          />
        </svg>
        <span className="text-[18px] font-bold text-white z-10">{displayValue}</span>
      </div>
      
      <div className="mt-2 text-center">
        <div className="text-[8px] font-bold text-[#888888] tracking-[1.5px] uppercase whitespace-pre-line leading-tight">
          {label}
        </div>
        <div className="text-[9px] mt-0.5" style={{ color }}>
          {subLabel}
        </div>
      </div>
    </div>
  );
}

export default function RingCluster() {
  return (
    <div className="flex justify-between items-start px-5 mt-4">
      <ScoreRing
        id="sales-run-rate"
        value={74}
        displayValue="74%"
        label={"SALES\nRUN RATE"}
        subLabel="On Track"
        color="var(--color-bhoop-healthy)"
      />
      <ScoreRing
        id="collection-velocity"
        value={82}
        displayValue="82%"
        label={"COLLECTION\nVELOCITY"}
        subLabel="Moderate"
        color="var(--color-bhoop-ring-collection)"
      />
      <ScoreRing
        id="breakeven-point"
        value={100} // Cap at 100 for the ring fill
        displayValue="112%"
        label={"BREAKEVEN\nPOINT"}
        subLabel="Covered"
        color="var(--color-bhoop-ring-breakeven)"
      />
    </div>
  );
}
