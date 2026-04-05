import { useNavigate } from "react-router-dom";
import { Check, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonitorCardProps {
  title: string;
  badgeContent: React.ReactNode;
  badgeBg: string;
  statusLabel: string;
  statusColor: string;
  subLabel: string;
  onClick: () => void;
}

function MonitorCard({ title, badgeContent, badgeBg, statusLabel, statusColor, subLabel, onClick }: MonitorCardProps) {
  return (
    <div 
      onClick={onClick}
      className="flex-1 bg-bhoop-surface-mid border border-[#1F2B27] rounded-[16px] p-[14px] shadow-[0_4px_16px_rgba(0,0,0,0.5)] cursor-pointer active:scale-95 transition-transform duration-120 flex flex-col justify-between h-[96px]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold text-white tracking-[1px] uppercase">{title}</h3>
        <ChevronRight className="w-[14px] h-[14px] text-[#666666]" />
      </div>
      
      <div className="flex items-center gap-2">
        <div 
          className="w-7 h-7 rounded-[8px] flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: badgeBg }}
        >
          {badgeContent}
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-bold tracking-[0.5px] uppercase" style={{ color: statusColor }}>
            {statusLabel}
          </span>
          <span className="text-[11px] text-[#666666]">
            {subLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function MonitorCardRow() {
  const navigate = useNavigate();

  return (
    <div className="flex gap-[10px] px-5 mt-6">
      <MonitorCard
        title="BUSINESS VITALS"
        badgeContent={<Check className="w-[14px] h-[14px] text-bhoop-healthy" strokeWidth={3} />}
        badgeBg="var(--color-bhoop-badge-healthy)"
        statusLabel="WITHIN RANGE"
        statusColor="var(--color-bhoop-healthy)"
        subLabel="6/6 Metrics"
        onClick={() => navigate("/vitals")}
      />
      <MonitorCard
        title="FINANCIAL HEALTH"
        badgeContent={<span className="text-[13px] font-bold text-bhoop-healthy">8.2</span>}
        badgeBg="var(--color-bhoop-badge-healthy)"
        statusLabel="STABLE"
        statusColor="var(--color-bhoop-healthy)"
        subLabel="All 3 Strong"
        onClick={() => navigate("/financial-health")}
      />
    </div>
  );
}
