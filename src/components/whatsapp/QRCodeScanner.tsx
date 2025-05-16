
import { Loader2, RefreshCw, Check, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionState } from "./types";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface QRCodeScannerProps {
  connectionState: ConnectionState;
  onRefresh: () => void;
  onScanComplete: () => void;
}

const QRCodeScanner = ({ connectionState, onRefresh, onScanComplete }: QRCodeScannerProps) => {
  const [qrExpiration, setQrExpiration] = useState(60); // QR code expires in 60 seconds
  const [qrExpired, setQrExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
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

  // Simulating loading of QR Code (in practice, this would be an API call)
  useEffect(() => {
    const loadQrCode = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(loadQrCode);
  }, []);

  // Reset expiration on refresh
  const handleRefresh = () => {
    setQrExpiration(60);
    setQrExpired(false);
    setIsLoading(true);
    
    // Simulation of loading when refreshing
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    onRefresh();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Timer moved outside the QR Code container */}
      <div className="mb-2 bg-white/80 px-3 py-1 rounded-md text-sm text-gray-700 flex items-center">
        <Timer className="h-4 w-4 mr-1" />
        Expira em {qrExpiration}s
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 relative w-64 h-64 flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          !qrExpired ? (
            /* Use a standard QR code format that WhatsApp can recognize */
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=whatsapp://link?code=DEMO1234567890" 
              alt="WhatsApp QR Code"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <Timer className="h-10 w-10 mb-2" />
              <p className="text-sm font-medium">QR Code expirado</p>
            </div>
          )
        )}
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 text-center">
        {qrExpired 
          ? "O QR code expirou. Por favor, atualize para gerar um novo código."
          : "Escaneie este código QR com seu WhatsApp para conectar sua conta"}
      </p>
      
      <div className="flex gap-3 w-full justify-center">
        <Button 
          variant="outline" 
          onClick={handleRefresh} 
          className="flex items-center justify-center"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {qrExpired ? "Gerar Novo QR Code" : "Atualizar QR Code"}
        </Button>
        <Button 
          onClick={onScanComplete}
          disabled={qrExpired || isLoading}
          className="flex items-center justify-center"
        >
          <Check className="h-4 w-4 mr-2" />
          Simular Conexão
        </Button>
      </div>
    </div>
  );
};

export default QRCodeScanner;
