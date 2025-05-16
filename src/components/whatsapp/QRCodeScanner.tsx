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
  const [isLoading, setIsLoading] = useState(true);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  
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

  // Fetch real QR code or simulate the loading
  useEffect(() => {
    const fetchQRCode = async () => {
      setIsLoading(true);
      
      try {
        // In a real implementation, this would be an API call to your WhatsApp Business API provider
        // For example: const response = await fetch('https://your-whatsapp-api.com/generate-qr', { headers: {...} });
        
        // Simulate API call for now
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This would be the actual QR code data from the WhatsApp API
        setQrCodeData('https://wa.me/qr/SAMPLE_WHATSAPP_QRCODE_DATA');
        
      } catch (error) {
        console.error("Failed to fetch WhatsApp QR code:", error);
        setQrExpired(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQRCode();
  }, []);

  // Reset expiration and fetch new QR code on refresh
  const handleRefresh = () => {
    setQrExpiration(60);
    setQrExpired(false);
    setIsLoading(true);
    
    // In real implementation, this would fetch a fresh QR code
    setTimeout(() => {
      setQrCodeData('https://wa.me/qr/REFRESHED_WHATSAPP_QRCODE_DATA');
      setIsLoading(false);
    }, 1500);
    
    onRefresh();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Timer display */}
      <div className="mb-2 bg-white/80 px-3 py-1 rounded-md text-sm text-gray-700 flex items-center">
        <Timer className="h-4 w-4 mr-1" />
        Expira em {qrExpiration}s
      </div>
      
      {/* Realistic WhatsApp QR Code display */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 relative w-64 h-64 flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : (
          !qrExpired ? (
            <div className="w-full h-full flex items-center justify-center">
              {/* In a real implementation, this would be an actual <img> with src from WhatsApp API */}
              {qrCodeData ? (
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeData)}&size=200x200&bgcolor=255-255-255&color=45-157-95`}
                  alt="WhatsApp QR Code"
                  className="w-full h-full"
                />
              ) : (
                <div className="text-red-500">Failed to generate QR code</div>
              )}
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
          : "Abra o WhatsApp no seu telefone > Menu ou Configurações > Aparelhos conectados > Escanear o código QR"}
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
        {/* Keep the simulation button for testing purposes only */}
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
