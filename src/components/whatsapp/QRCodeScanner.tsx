
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

  // Simulação de carregamento do QR Code (na prática, seria uma chamada à API)
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
    
    // Simulação de carregamento ao atualizar
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
      
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 relative w-64 h-64">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          !qrExpired ? (
            <div className="w-full h-full relative flex items-center justify-center">
              {/* QR code real aqui - essa seria uma API real em produção */}
              <svg viewBox="0 0 29 29" className="w-full h-full">
                <path d="M1,1h7v7h-7z M10,1h1v1h-1z M12,1h3v1h1v1h-2v1h-1v-1h-1z M18,1h1v2h-1z M20,1h7v7h-7z M2,2v5h5v-5z M21,2v5h5v-5z M3,3h3v3h-3z M22,3h3v3h-3z M10,4h3v1h1v1h-2v1h-1v-3h-1z M16,4h2v1h-1v1h-2v-1h1z M13,6h1v1h-1z M17,6h4v1h-4z M1,10h1v2h-1z M3,10h3v1h-3z M8,10h7v1h-7z M17,10h1v1h2v2h-1v-1h-1v-1h-1z M20,10h1v1h-1z M24,10h3v1h-3z M27,10h1v1h-1z M8,11h1v3h-2v-1h1z M13,11h1v1h-1z M22,11h1v1h-1z M3,12h1v1h1v3h-1v-1h-1z M6,12h1v1h-1z M10,12h1v1h-1z M12,12h1v3h-2v-1h1z M14,12h1v1h-1z M16,12h1v1h-1z M23,12h1v1h-1z M26,12h1v1h-1z M7,13h1v1h-1z M19,13h1v1h-1z M25,13h1v3h-1z M27,13h1v2h-1z M18,14h1v1h-1z M20,14h1v1h-1z M22,14h2v1h-2z M1,15h1v1h-1z M5,15h1v2h-1z M7,15h4v1h-4z M13,15h1v1h-1z M15,15h1v1h1v-1h1v3h-1v-1h-1v-1h-1z M20,15h1v1h-1z M26,16h1v2h-1z M3,17h1v1h-1z M8,17h4v1h-4z M21,17h1v1h-1z M1,18h2v1h-2z M5,18h1v1h-1z M7,18h1v1h-1z M14,18h1v1h-1z M18,18h1v1h-1z M20,18h1v1h-1z M22,18h1v1h-1z M24,18h2v1h-2z M10,19h1v1h2v1h-3z M13,19h1v2h3v2h-1v1h-1v-1h-2v-1h-1v-1h1z M19,19h1v3h-2v-1h-1v-1h2z M22,19h1v1h-1z M24,19h1v1h-1z M26,19h2v1h-2z M1,20h7v7h-7z M10,20h1v1h-1z M12,20h1v3h-1z M20,20h1v1h-1z M22,20h1v1h-1z M2,21v5h5v-5z M9,21h1v1h-1z M14,21h1v1h-1z M17,21h1v1h-1z M22,21h1v1h-1z M24,21h2v1h-1v1h-2v-1h1z M3,22h3v3h-3z M8,22h1v3h1v1h-3v-1h1z M15,22h2v1h-1v1h-2v-1h1z M20,22h1v1h-1z M22,22h1v1h-1z M11,23h1v1h-1z M17,23h1v1h-1z M19,23h1v1h-1z M23,23h1v1h1v1h-2z M26,23h2v1h-1v1h-1z M20,24h1v1h1v1h1v1h-3z M25,24h1v1h-1z M9,25h1v1h2v1h1v1h-3v-1h-1z M17,25h3v1h-3z M24,25h1v1h-1z M27,25h1v1h-1z M13,26h2v1h-2z M16,26h1v1h-1z M18,26h1v1h-1z M23,26h1v2h-1z M25,26h2v2h-2z M15,27h1v1h-1z M19,27h3v1h-3z" fill="#000"></path>
              </svg>
            </div>
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
