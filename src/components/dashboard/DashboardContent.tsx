
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatisticsCardGrid from "@/components/dashboard/StatisticsCardGrid";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import InventorySummary from "@/components/dashboard/InventorySummary";
import RecentSales from "@/components/dashboard/RecentSales";

interface DashboardContentProps {
  onExportClick: () => void;
}

export const DashboardContent = ({ onExportClick }: DashboardContentProps) => {
  return (
    <>
      <StatisticsCardGrid />
      
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FinancialSummary />
        <InventorySummary />
      </div>
      
      <div className="mt-6">
        <RecentSales />
      </div>

      {/* Mobile buttons - hidden on larger screens */}
      <div className="mt-6 sm:hidden grid grid-cols-2 gap-4">
        <Button
          onClick={onExportClick}
          variant="outline"
          className="w-full flex items-center justify-center gap-2"
        >
          <Download className="h-4 w-4" />
          Exportar Dados
        </Button>
      </div>
    </>
  );
};

export default DashboardContent;
