import { ChevronRight, User, Settings, Database, Bell, MessageSquare, Info, Shield, FileText, Users } from "lucide-react";

interface SettingsRowProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function SettingsRow({ icon: Icon, label, onClick }: SettingsRowProps) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between h-[52px] px-4 bg-bhoop-surface-elevated border-b-[0.5px] border-bhoop-surface-border last:border-b-0 cursor-pointer active:bg-[#222222] transition-colors"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-[#A0A0A0]" />
        <span className="text-[15px] text-white">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-[#444444]" />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-[11px] font-bold text-[#555555] uppercase tracking-[1px] mt-[14px] mb-[4px] px-4">
      {title}
    </div>
  );
}

export default function More() {
  return (
    <div className="flex flex-col min-h-full pb-6">
      <div className="px-5 pt-4 mb-2">
        <h1 className="text-[24px] font-bold text-white">MORE</h1>
      </div>

      <div className="flex flex-col">
        <SectionHeader title="ACCOUNT" />
        <div className="mx-4 rounded-[12px] overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-bhoop-surface-elevated border-b-[0.5px] border-bhoop-surface-border cursor-pointer active:bg-[#222222] transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#333333] flex items-center justify-center">
                <span className="text-[14px] font-bold text-white">JS</span>
              </div>
              <div>
                <div className="text-[15px] font-bold text-white">John Smith</div>
                <div className="text-[13px] text-[#A0A0A0]">CEO, Acme Corp</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#444444]" />
          </div>
          <SettingsRow icon={User} label="Edit Profile" />
        </div>

        <SectionHeader title="BHOOP SETTINGS" />
        <div className="mx-4 rounded-[12px] overflow-hidden">
          <SettingsRow icon={Database} label="Data Targets" />
          <SettingsRow icon={Settings} label="Currency & Locale" />
          <SettingsRow icon={Settings} label="Fiscal Year Settings" />
          <SettingsRow icon={Bell} label="Notification Preferences" />
        </div>

        <SectionHeader title="INTEGRATIONS" />
        <div className="mx-4 rounded-[12px] overflow-hidden">
          <SettingsRow icon={Database} label="ERP / Accounting" />
          <SettingsRow icon={Users} label="CRM" />
          <SettingsRow icon={Database} label="Marketing" />
          <SettingsRow icon={FileText} label="Manual CSV Upload" />
        </div>

        <SectionHeader title="BHAI" />
        <div className="mx-4 rounded-[12px] overflow-hidden">
          <SettingsRow icon={MessageSquare} label="BHAI Chat History" />
          <SettingsRow icon={Settings} label="BHAI Settings" />
        </div>

        <SectionHeader title="ABOUT" />
        <div className="mx-4 rounded-[12px] overflow-hidden">
          <SettingsRow icon={Info} label="About BHOOP" />
          <div className="flex items-center justify-between h-[52px] px-4 bg-bhoop-surface-elevated border-b-[0.5px] border-bhoop-surface-border">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-[#A0A0A0]" />
              <span className="text-[15px] text-white">Version</span>
            </div>
            <span className="text-[15px] text-[#666666]">1.0.0</span>
          </div>
          <SettingsRow icon={Shield} label="Privacy Policy" />
          <SettingsRow icon={FileText} label="Terms of Service" />
        </div>
      </div>
    </div>
  );
}
