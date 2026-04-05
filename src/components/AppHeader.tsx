import { Bell } from "lucide-react";

export default function AppHeader() {
  const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" });

  return (
    <div className="pt-4 px-5 pb-2">
      <div className="flex items-center justify-between h-[60px]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full border-[1.5px] border-bhoop-healthy flex items-center justify-center bg-bhoop-surface-elevated">
          <span className="text-[12px] font-bold text-white">JS</span>
        </div>

        {/* Wordmark */}
        <h1 className="text-[22px] font-[800] text-white tracking-[3px]">BHOOP</h1>

        {/* Bell */}
        <div className="relative">
          <Bell className="w-6 h-6 text-white" />
          <div className="absolute top-0 right-0 w-2 h-2 bg-bhoop-critical rounded-full" />
        </div>
      </div>
      
      <div className="text-center mt-2">
        <p className="text-[13px] text-bhoop-text-secondary">Today, {today}</p>
      </div>
    </div>
  );
}
