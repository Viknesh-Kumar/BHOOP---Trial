import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Scale, Droplet } from "lucide-react";
import { cn } from "@/lib/utils";

interface FinancialCardProps {
  id: string;
  icon: React.ElementType;
  name: string;
  value: string;
  subLabel: string;
  statusColor: string;
  customVisual?: React.ReactNode;
}

function FinancialCard({ id, icon: Icon, name, value, subLabel, statusColor, customVisual }: FinancialCardProps) {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/metric/${id}`)}
      className="bg-bhoop-surface-elevated rounded-[20px] p-5 mb-4 cursor-pointer active:scale-95 transition-transform duration-120"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${statusColor}20` }}>
            <Icon className="w-4 h-4" style={{ color: statusColor }} />
          </div>
          <div className="text-[13px] font-bold text-white uppercase tracking-[1px]">{name}</div>
        </div>
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusColor }} />
      </div>

      <div className="flex items-end justify-between">
        <div>
          <div className="text-[32px] font-bold text-white leading-none mb-2">{value}</div>
          <div className="text-[13px] text-[#A0A0A0]">{subLabel}</div>
        </div>
        {customVisual && (
          <div className="w-[100px]">
            {customVisual}
          </div>
        )}
      </div>
    </div>
  );
}

export default function FinancialHealthHub() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full bg-bhoop-bg">
      <div className="px-5 pt-4 pb-4 sticky top-0 bg-bhoop-bg z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-[24px] font-bold text-white">FINANCIAL HEALTH</h1>
        </div>

        {/* Segmented Picker */}
        <div className="flex bg-bhoop-surface-elevated rounded-[20px] p-1 h-[36px]">
          <button className="flex-1 rounded-[16px] bg-white text-black font-bold text-[13px]">Month</button>
          <button className="flex-1 rounded-[16px] text-[#555555] font-normal text-[13px]">Quarter</button>
          <button className="flex-1 rounded-[16px] text-[#555555] font-normal text-[13px]">YTD</button>
        </div>
      </div>

      <div className="px-5 pb-6">
        <FinancialCard
          id="roi"
          icon={TrendingUp}
          name="RETURN ON INVESTMENT"
          value="24.8%"
          subLabel="Annualized: 29.8%"
          statusColor="var(--color-bhoop-healthy)"
        />
        
        <FinancialCard
          id="debt-to-equity"
          icon={Scale}
          name="DEBT-TO-EQUITY RATIO"
          value="0.65×"
          subLabel="Total Debt: AED 520K | Equity: AED 800K"
          statusColor="var(--color-bhoop-warning)"
          customVisual={
            <div className="flex h-2 rounded-full overflow-hidden w-full">
              <div className="bg-bhoop-healthy" style={{ width: '60%' }} />
              <div className="bg-bhoop-critical" style={{ width: '40%' }} />
            </div>
          }
        />

        <FinancialCard
          id="quick-ratio"
          icon={Droplet}
          name="QUICK RATIO"
          value="1.35"
          subLabel="Covers 1.35 months of liabilities"
          statusColor="var(--color-bhoop-healthy)"
        />
      </div>
    </div>
  );
}
