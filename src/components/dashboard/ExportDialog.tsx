import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { exportData, ExportFormat, ExportSection } from "@/utils/export";
import { toast } from "sonner";
import { Loader2, Download, File } from "lucide-react";

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportDialog = ({ isOpen, onClose }: ExportDialogProps) => {
  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [section, setSection] = useState<ExportSection>('all');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const result = await exportData(format, section);
      
      if (result.success) {
        toast.success(result.message);
        onClose();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Falha ao exportar dados. Tente novamente.");
    } finally {
      setIsExporting(false);
    }
  };

  const getFormatIcon = () => {
    switch (format) {
      case 'pdf':
        return <File className="h-4 w-4 mr-2" />;
      case 'xlsx':
        return <File className="h-4 w-4 mr-2" />;
      case 'txt':
        return <File className="h-4 w-4 mr-2" />;
      case 'docx':
        return <File className="h-4 w-4 mr-2" />;
      default:
        return <Download className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Exportar Dados</DialogTitle>
          <DialogDescription>
            Escolha o formato e seção para exportar os dados do seu negócio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium col-span-1">Formato:</span>
            <Select
              value={format}
              onValueChange={(value) => setFormat(value as ExportFormat)}
              disabled={isExporting}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Escolha o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                <SelectItem value="txt">Texto (TXT)</SelectItem>
                <SelectItem value="docx">Word (DOCX)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-right text-sm font-medium col-span-1">Seção:</span>
            <Select
              value={section}
              onValueChange={(value) => setSection(value as ExportSection)}
              disabled={isExporting}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Escolha a seção" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os dados</SelectItem>
                <SelectItem value="inventory">Estoque</SelectItem>
                <SelectItem value="finances">Finanças</SelectItem>
                <SelectItem value="sales">Vendas</SelectItem>
                <SelectItem value="customers">Clientes</SelectItem>
                <SelectItem value="marketplaces">Marketplaces</SelectItem>
                <SelectItem value="calendar">Agenda</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="reports">Relatórios</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancelar
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Exportando...
              </>
            ) : (
              <>
                {getFormatIcon()}
                Exportar
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportDialog;
