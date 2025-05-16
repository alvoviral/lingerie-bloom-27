
import { Loader2, RefreshCw, Check, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionState } from "./types";
import { useState, useEffect } from "react";

interface QRCodeScannerProps {
  connectionState: ConnectionState;
  onRefresh: () => void;
  onScanComplete: () => void;
}

const QRCodeScanner = ({ connectionState, onRefresh, onScanComplete }: QRCodeScannerProps) => {
  const [qrExpiration, setQrExpiration] = useState(60); // QR code expires in 60 seconds
  const [qrExpired, setQrExpired] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  
  // Handle QR code expiration countdown
  useEffect(() => {
    let timer: number | undefined;
    
    if (connectionState.status === "connecting" && !qrExpired && qrExpiration > 0) {
      timer = window.setTimeout(() => {
        setQrExpiration(prev => prev - 1);
      }, 1000);
    }
    
    if (qrExpiration === 0) {
      setQrExpired(true);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [qrExpiration, connectionState.status, qrExpired]);

  // Reset expiration on refresh
  const handleRefresh = () => {
    setQrExpiration(60);
    setQrExpired(false);
    setQrLoaded(false);
    // Simulate QR loading
    setTimeout(() => {
      setQrLoaded(true);
    }, 800);
    onRefresh();
  };

  // Simulate QR code loading on initial render
  useEffect(() => {
    if (connectionState.status === "connecting" && !qrLoaded) {
      const timer = setTimeout(() => {
        setQrLoaded(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [connectionState.status, qrLoaded]);

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="w-64 h-64 bg-gray-100 relative flex items-center justify-center">
          {qrLoaded && !qrExpired ? (
            <img 
              src="/lovable-uploads/9907025e-7f10-4f88-8419-162f592539ac.png" 
              alt="QR Code para conexão do WhatsApp"
              className="max-w-full max-h-full"
            />
          ) : qrExpired ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Timer className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">QR Code expirado</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Loader2 className="h-10 w-10 mb-2 animate-spin" />
              <p className="text-sm font-medium">Carregando QR Code...</p>
            </div>
          )}
          
          {connectionState.status === "connecting" && !qrExpired && qrLoaded && (
            <div className="absolute inset-0 bg-white/10 flex flex-col items-center justify-end p-2">
              <div className="bg-white/80 px-2 py-1 rounded-md text-xs text-gray-700 flex items-center">
                <Timer className="h-3 w-3 mr-1" />
                Expira em {qrExpiration}s
              </div>
            </div>
          )}
          
          {connectionState.status === "connecting" && !qrLoaded && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-lingerie-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        {qrExpired 
          ? "O QR code expirou. Por favor, atualize para gerar um novo código."
          : "Escaneie este código QR com seu WhatsApp para conectar sua conta"}
      </p>
      
      <div className="flex gap-2 mt-6">
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          {qrExpired ? "Gerar Novo QR Code" : "Atualizar QR Code"}
        </Button>
        <Button 
          onClick={onScanComplete}
          disabled={!qrLoaded || qrExpired}
          className={!qrLoaded || qrExpired ? "opacity-50" : ""}
        >
          <Check className="h-4 w-4 mr-2" />
          Simular Conexão
        </Button>
      </div>
    </div>
  );
};

export default QRCodeScanner;
