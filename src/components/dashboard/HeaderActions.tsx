
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/dashboard/SearchBar";
import NotificationDropdown from "@/components/dashboard/NotificationDropdown";
import UserProfileDropdown from "@/components/dashboard/UserProfileDropdown";

interface HeaderActionsProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportClick: () => void;
}

export const HeaderActions = ({ 
  searchQuery, 
  onSearchChange, 
  onExportClick 
}: HeaderActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <SearchBar 
        value={searchQuery} 
        onChange={onSearchChange} 
      />
      
      <NotificationDropdown />
      
      <UserProfileDropdown />

      <Button
        onClick={onExportClick}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Download className="h-4 w-4" />
        Exportar Dados
      </Button>
    </div>
  );
};

export default HeaderActions;
