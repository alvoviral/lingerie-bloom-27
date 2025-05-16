
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileText, FileSpreadsheet, FileType2, File } from "lucide-react";
import { ExportFormat } from "@/utils/export";

interface ExportOptionsFormProps {
  exportFormat: ExportFormat;
  setExportFormat: (format: ExportFormat) => void;
}

const ExportOptionsForm = ({ 
  exportFormat, 
  setExportFormat 
}: ExportOptionsFormProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="px-1">
        <p className="text-sm text-muted-foreground mb-3">
          Escolha o formato de exportação desejado:
        </p>
        <RadioGroup
          value={exportFormat}
          onValueChange={setExportFormat}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="xlsx" id="excel" />
            <Label htmlFor="excel" className="flex items-center cursor-pointer">
              <FileSpreadsheet className="h-5 w-5 mr-2 text-green-600" />
              Excel (.xlsx)
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="pdf" id="pdf" />
            <Label htmlFor="pdf" className="flex items-center cursor-pointer">
              <FileText className="h-5 w-5 mr-2 text-red-600" />
              PDF (.pdf)
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="txt" id="txt" />
            <Label htmlFor="txt" className="flex items-center cursor-pointer">
              <FileType2 className="h-5 w-5 mr-2 text-gray-600" />
              Texto (.txt)
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-md p-3 hover:bg-accent cursor-pointer">
            <RadioGroupItem value="docx" id="docx" />
            <Label htmlFor="docx" className="flex items-center cursor-pointer">
              <File className="h-5 w-5 mr-2 text-blue-600" />
              Word (.docx)
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default ExportOptionsForm;
