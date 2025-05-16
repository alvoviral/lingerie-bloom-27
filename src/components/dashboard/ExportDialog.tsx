
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ExportOptionsForm from "@/components/dashboard/ExportOptionsForm";
import { useState } from "react";
import { exportData } from "@/utils/export";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDialog = ({ isOpen, onClose }: ExportDialogProps) => {
  const [exportFormat, setExportFormat] = useState<string>("excel");
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      await exportData(exportFormat, "dashboard-data");
      toast.success("Dados exportados com sucesso!");
      onClose();
    } catch (error) {
      console.error("Error exporting data:", error);
      toast.error("Erro ao exportar dados. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Dados</DialogTitle>
        </DialogHeader>
        
        <ExportOptionsForm
          exportFormat={exportFormat}
          setExportFormat={setExportFormat}
        />
        
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="default"
            onClick={handleExport}
            disabled={isExporting}
            className="w-full sm:w-auto"
          >
            {isExporting ? (
              "Exportando..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
