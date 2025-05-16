
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { BusinessOverview } from "@/components/reports/BusinessOverview";
import { TimeframeSelector } from "@/components/reports/TimeframeSelector";
import { ReportTabs } from "@/components/reports/ReportTabs";
import { ScheduledReportsCard } from "@/components/reports/ScheduledReportsCard";
import { AvailableReportsCard } from "@/components/reports/AvailableReportsCard";
import { Separator } from "@/components/ui/separator";

const Reports = () => {
  useEffect(() => {
    document.title = "Relatórios | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 pb-40">
          <Header 
            title="Relatórios" 
            subtitle="Analise dados e métricas do seu negócio." 
          />
          
          <div className="mt-32 space-y-36">
            <div className="flex justify-between items-center mt-32">
              <h3 className="text-lg font-medium">Visão Geral do Negócio</h3>
              <TimeframeSelector />
            </div>
            
            <BusinessOverview />
            
            <ReportTabs />
            
            <Separator className="my-40" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-32 mb-40">
              <ScheduledReportsCard />
              <AvailableReportsCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
