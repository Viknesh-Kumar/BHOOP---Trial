import AppHeader from "@/components/AppHeader";
import RingCluster from "@/components/RingCluster";
import MonitorCardRow from "@/components/MonitorCardRow";
import PipelineSection from "@/components/PipelineSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <AppHeader />
      <RingCluster />
      <MonitorCardRow />
      <PipelineSection />
    </div>
  );
}
