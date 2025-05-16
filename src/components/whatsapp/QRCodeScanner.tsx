
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
            /* Using an SVG QR code similar to what WhatsApp Web actually uses */
            <div className="w-full h-full flex items-center justify-center">
              <svg 
                width="200" 
                height="200" 
                viewBox="0 0 256 256" 
                className="w-full h-full" 
                style={{ backgroundColor: 'white' }}
              >
                {/* WhatsApp Web-like QR code pattern */}
                <rect x="0" y="0" width="256" height="256" fill="white" />
                <path d="M32,32 L96,32 L96,96 L32,96 Z" fill="black" />
                <path d="M32,36 L92,36 L92,92 L36,92 L36,36 Z" fill="white" />
                <path d="M42,42 L86,42 L86,86 L42,86 Z" fill="black" />
                
                <path d="M160,32 L224,32 L224,96 L160,96 Z" fill="black" />
                <path d="M160,36 L220,36 L220,92 L160,92 Z" fill="white" />
                <path d="M166,42 L214,42 L214,86 L166,86 Z" fill="black" />
                
                <path d="M32,160 L96,160 L96,224 L32,224 Z" fill="black" />
                <path d="M32,164 L92,164 L92,220 L36,220 L36,164 Z" fill="white" />
                <path d="M42,170 L86,170 L86,214 L42,214 Z" fill="black" />
                
                {/* WhatsApp logo in center */}
                <circle cx="128" cy="128" r="18" fill="#25D366" />
                <path d="M136,124 A12,12 0 1,0 120,132 L122,138 L128,136 A12,12 0 0,0 136,124 Z" fill="white" />
                
                {/* Random data patterns */}
                <rect x="112" y="32" width="8" height="8" fill="black" />
                <rect x="128" y="32" width="8" height="8" fill="black" />
                <rect x="128" y="48" width="8" height="8" fill="black" />
                <rect x="112" y="64" width="8" height="8" fill="black" />
                <rect x="144" y="64" width="8" height="8" fill="black" />
                <rect x="32" y="112" width="8" height="8" fill="black" />
                <rect x="48" y="128" width="8" height="8" fill="black" />
                <rect x="64" y="112" width="8" height="8" fill="black" />
                <rect x="176" y="112" width="8" height="8" fill="black" />
                <rect x="192" y="128" width="8" height="8" fill="black" />
                <rect x="208" y="144" width="8" height="8" fill="black" />
                <rect x="112" y="176" width="8" height="8" fill="black" />
                <rect x="128" y="192" width="8" height="8" fill="black" />
                <rect x="144" y="208" width="8" height="8" fill="black" />
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
