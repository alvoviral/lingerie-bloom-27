
import { Loader2, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeScannerProps {
  connectionStatus: "connected" | "disconnected" | "connecting";
  onRefresh: () => void;
  onScanComplete: () => void;
}

const QRCodeScanner = ({ connectionStatus, onRefresh, onScanComplete }: QRCodeScannerProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="w-64 h-64 bg-gray-100 relative flex items-center justify-center">
          <img 
            src="data:image/png;base64,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" 
            alt="QR Code para conexão do WhatsApp"
            className="max-w-full max-h-full"
          />
          {connectionStatus === "connecting" && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-lingerie-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Escaneie este código QR com seu WhatsApp para conectar sua conta
      </p>
      
      <div className="flex gap-2 mt-6">
        <Button variant="outline" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar QR Code
        </Button>
        <Button onClick={onScanComplete}>
          <Check className="h-4 w-4 mr-2" />
          Simular Conexão
        </Button>
      </div>
    </div>
  );
};

export default QRCodeScanner;
