import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Activity, Users, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import BHAIFab from "./BHAIFab";

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { id: "/", label: "HOME", icon: Home },
    { id: "/pulse", label: "PULSE", icon: Activity },
    { id: "/community", label: "COMMUNITY", icon: Users },
    { id: "/more", label: "MORE", icon: MoreHorizontal },
  ];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bhoop-bg text-bhoop-text-primary">
      <main className="flex-1 overflow-y-auto pb-[83px]">
        <Outlet />
      </main>

      <BHAIFab />

      <nav className="fixed bottom-0 left-0 right-0 h-[83px] bg-bhoop-surface border-t-[0.5px] border-bhoop-surface-border pb-[env(safe-area-inset-bottom)] flex items-center justify-around px-2 z-40">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.id)}
              className="flex flex-col items-center justify-center w-16 h-full relative"
            >
              {isActive && (
                <div className="absolute top-0 w-5 h-[2px] bg-white rounded-[1px]" />
              )}
              <Icon
                className={cn(
                  "w-[22px] h-[22px] mb-1 transition-transform duration-200",
                  isActive ? "text-white scale-110" : "text-[#444444] scale-100"
                )}
              />
              <span
                className={cn(
                  "text-[10px]",
                  isActive ? "text-white font-semibold" : "text-[#444444] font-normal"
                )}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
