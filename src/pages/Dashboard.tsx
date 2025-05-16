
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import ExportDialog from "@/components/dashboard/ExportDialog";
import HeaderActions from "@/components/dashboard/HeaderActions";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Dashboard | BelleCharm";
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-5">
            <Header 
              title="Dashboard" 
              subtitle="Seja bem-vindo"
              className="border-none pb-0"
              showSearchOnly={true}
            />
            
            <HeaderActions 
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onExportClick={() => setIsExportDialogOpen(true)}
            />
          </div>
          
          <DashboardContent 
            onExportClick={() => setIsExportDialogOpen(true)}
          />

          {/* Dialogs */}
          <ExportDialog 
            isOpen={isExportDialogOpen} 
            onClose={() => setIsExportDialogOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
