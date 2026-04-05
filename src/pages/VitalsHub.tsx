import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowUpRight, PieChart, DollarSign, Banknote, Package, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricRowProps {
  id: string;
  icon: React.ElementType;
  name: string;
  subLabel: string;
  value: string;
  delta: string;
  statusColor: string;
  isPositiveDelta?: boolean;
}

function MetricRow({ id, icon: Icon, name, subLabel, value, delta, statusColor, isPositiveDelta = true }: MetricRowProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/metric/${id}`)}
      className="bg-bhoop-surface-elevated rounded-[16px] p-4 mb-[10px] flex items-center justify-between cursor-pointer active:scale-95 transition-transform duration-120"
    >
      <div className="flex items-center gap-3 flex-1">
        <Icon className="w-5 h-5" style={{ color: statusColor }} />
        <div>
          <div className="text-[13px] font-bold text-white">{name}</div>
          <div className="text-[11px] text-[#666666]">{subLabel}</div>
        </div>
      </div>

      {/* Mini sparkline placeholder */}
      <div className="w-[60px] h-[28px] mx-2 flex-shrink-0 relative">
        <svg className="w-full h-full" viewBox="0 0 60 28" preserveAspectRatio="none">
          <path 
            d="M0,20 Q15,5 30,15 T60,10" 
            fill="none" 
            stroke="#0A84FF" 
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="flex flex-col items-end flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[18px] font-bold text-white">{value}</span>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
        </div>
        <div className={cn(
          "text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1",
          isPositiveDelta 
            ? "bg-bhoop-badge-healthy text-bhoop-healthy" 
            : "bg-bhoop-badge-critical text-bhoop-critical"
        )}>
          {delta}
        </div>
      </div>
    </div>
  );
}

export default function VitalsHub() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-bhoop-bg">
      <div className="px-5 pt-4 pb-4 sticky top-0 bg-bhoop-bg z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[24px] font-bold text-white">BUSINESS VITALS</h1>
        </div>

        {/* Segmented Picker */}
        <div className="flex bg-bhoop-surface-elevated rounded-[20px] p-1 h-[36px]">
          <button className="flex-1 rounded-[16px] bg-white text-black font-bold text-[13px]">Month</button>
          <button className="flex-1 rounded-[16px] text-[#555555] font-normal text-[13px]">Quarter</button>
          <button className="flex-1 rounded-[16px] text-[#555555] font-normal text-[13px]">YTD</button>
        </div>
      </div>

      <div className="px-5 pb-6">
        <MetricRow
          id="revenue"
          icon={ArrowUpRight}
          name="REVENUE"
          subLabel="80% of AED 3M target"
          value="AED 2.4M"
          delta="↑ 4.2%"
          statusColor="var(--color-bhoop-healthy)"
        />
        <MetricRow
          id="gross-profit"
          icon={PieChart}
          name="GROSS PROFIT (GP)"
          subLabel="GP: AED 924K"
          value="38.5%"
          delta="↑ 1.2%"
          statusColor="var(--color-bhoop-warning)"
        />
        <MetricRow
          id="net-profit"
          icon={DollarSign}
          name="NET PROFIT (NP)"
          subLabel="NP: AED 295K"
          value="12.3%"
          delta="↓ 0.5%"
          statusColor="var(--color-bhoop-warning)"
          isPositiveDelta={false}
        />
        <MetricRow
          id="net-cash-flow"
          icon={Banknote}
          name="NET CASH FLOW"
          subLabel="Operating: +210K | Investing: −30K"
          value="AED +180K"
          delta="↑ 8.4%"
          statusColor="var(--color-bhoop-healthy)"
        />
        <MetricRow
          id="inventory-turnover"
          icon={Package}
          name="INVENTORY TURNOVER"
          subLabel="DIO: 59 days"
          value="6.2×"
          delta="↑ 0.3×"
          statusColor="var(--color-bhoop-healthy)"
        />
        <MetricRow
          id="overdue-receivables"
          icon={AlertCircle}
          name="OVERDUE RECEIVABLES"
          subLabel="30d: 60% | 60d: 28% | 90d+: 12%"
          value="AED 340K"
          delta="↑ 2.1%"
          statusColor="var(--color-bhoop-critical)"
          isPositiveDelta={false}
        />
      </div>
    </div>
  );
}
