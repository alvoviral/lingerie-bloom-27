
import { Loader2, RefreshCw, Check, Timer, QrCode } from "lucide-react";
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

  // Simulating loading of QR Code
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
            /* Professional WhatsApp-style QR code display */
            <div className="w-full h-full flex items-center justify-center">
              {/* WhatsApp corners indicator */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-green-500"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-green-500"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-green-500"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-green-500"></div>
              
              {/* WhatsApp logo in the middle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <QrCode className="h-10 w-10 text-green-500" />
                </div>
              </div>
              
              {/* Realistic QR Code pattern (the 3x3 position detection patterns) */}
              <div className="grid grid-cols-6 grid-rows-6 gap-1 w-full h-full p-2">
                {/* Top-left position detection pattern */}
                <div className="col-span-1 row-span-1 bg-black"></div>
                <div className="col-span-1 row-span-1 bg-black"></div>
                <div className="col-span-1 row-span-1 bg-black"></div>
                
                {/* Top-right position detection pattern */}
                <div className="col-start-4 row-start-1 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-5 row-start-1 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-6 row-start-1 col-span-1 row-span-1 bg-black"></div>
                
                {/* Second row */}
                <div className="col-start-1 row-start-2 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-2 row-start-2 col-span-1 row-span-1 bg-white border border-gray-200"></div>
                <div className="col-start-3 row-start-2 col-span-1 row-span-1 bg-black"></div>
                
                <div className="col-start-4 row-start-2 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-5 row-start-2 col-span-1 row-span-1 bg-white border border-gray-200"></div>
                <div className="col-start-6 row-start-2 col-span-1 row-span-1 bg-black"></div>
                
                {/* Third row */}
                <div className="col-start-1 row-start-3 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-2 row-start-3 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-3 row-start-3 col-span-1 row-span-1 bg-black"></div>
                
                <div className="col-start-4 row-start-3 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-5 row-start-3 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-6 row-start-3 col-span-1 row-span-1 bg-black"></div>
                
                {/* Bottom-left position detection pattern */}
                <div className="col-start-1 row-start-4 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-2 row-start-4 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-3 row-start-4 col-span-1 row-span-1 bg-black"></div>
                
                {/* Second to last row */}
                <div className="col-start-1 row-start-5 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-2 row-start-5 col-span-1 row-span-1 bg-white border border-gray-200"></div>
                <div className="col-start-3 row-start-5 col-span-1 row-span-1 bg-black"></div>
                
                {/* Last row */}
                <div className="col-start-1 row-start-6 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-2 row-start-6 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-3 row-start-6 col-span-1 row-span-1 bg-black"></div>
                
                {/* Random QR code data points */}
                <div className="col-start-2 row-start-4 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-4 row-start-3 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-5 row-start-5 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-4 row-start-6 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-6 row-start-4 col-span-1 row-span-1 bg-black"></div>
                <div className="col-start-5 row-start-2 col-span-1 row-span-1 bg-black"></div>
              </div>
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
