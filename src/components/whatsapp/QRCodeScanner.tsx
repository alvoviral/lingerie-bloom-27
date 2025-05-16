
import { Loader2, RefreshCw, Check, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionState } from "./types";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface QRCodeScannerProps {
  connectionState: ConnectionState;
  onRefresh: () => void;
  onScanComplete: () => void;
}

const QRCodeScanner = ({ connectionState, onRefresh, onScanComplete }: QRCodeScannerProps) => {
  const [qrExpiration, setQrExpiration] = useState(60);
  const [qrExpired, setQrExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [qrData, setQrData] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  
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
      setApiError("QR Code expirado. Por favor, atualize para gerar um novo código.");
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [qrExpiration, connectionState.status, qrExpired]);

  // Função para buscar QR code da WhatsApp Business API
  const fetchWhatsAppQRCode = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      // Esta é a parte onde você deve integrar com sua API WhatsApp Business
      // Exemplo de como seria a chamada real:
      /*
      const response = await fetch('https://sua-api-whatsapp.com/qrcode', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer SEU_TOKEN_AQUI',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Parâmetros necessários para sua API
        })
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao gerar QR Code: ${response.status}`);
      }
      
      const data = await response.json();
      setQrData(data.qrCodeData);
      */
      
      // Para fins de demonstração, simulamos a resposta da API
      // IMPORTANTE: Substitua este código pela chamada real à sua API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Em uma implementação real, aqui receberíamos o QR Code da API WhatsApp Business");
      // Este é um QR code de exemplo, substitua pelo real da sua API
      setQrData("https://api.qrserver.com/v1/create-qr-code/?data=WhatsAppDemo&size=200x200&color=45-157-95&bgcolor=255-255-255");
      
    } catch (error) {
      console.error("Erro ao buscar QR Code:", error);
      setApiError("Falha ao conectar com a API WhatsApp Business. Tente novamente.");
      toast.error("Erro ao gerar QR Code do WhatsApp");
    } finally {
      setIsLoading(false);
    }
  };

  // Busca o QR Code quando o componente é montado
  useEffect(() => {
    fetchWhatsAppQRCode();
  }, []);

  // Função para atualizar o QR Code
  const handleRefresh = () => {
    setQrExpiration(60);
    setQrExpired(false);
    fetchWhatsAppQRCode();
    onRefresh();
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-4">
      {/* Timer display */}
      <div className="mb-2 bg-white/80 px-3 py-1 rounded-md text-sm text-gray-700 flex items-center">
        <Timer className="h-4 w-4 mr-1" />
        Expira em {qrExpiration}s
      </div>
      
      {/* WhatsApp QR Code display */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-4 relative w-64 h-64 flex items-center justify-center">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : apiError ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-red-500 text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p className="mt-4 text-sm">{apiError}</p>
          </div>
        ) : qrExpired ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
            <Timer className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium">QR Code expirado</p>
          </div>
        ) : qrData ? (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Logo WhatsApp */}
            <div className="absolute top-0 left-0 w-full flex justify-center">
              <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full mt-1">
                WhatsApp Business
              </div>
            </div>
            
            {/* QR Code - Na implementação real, exibiria o QR gerado pela API */}
            <img 
              src={qrData} 
              alt="WhatsApp QR Code"
              className="w-full h-full p-2"
            />
            
            <div className="absolute bottom-0 w-full text-center text-xs text-gray-500">
              Escaneie para conectar
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-red-500">
            Falha ao gerar QR code
          </div>
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
        
        {/* IMPORTANTE: Em produção, remover este botão. 
            Ele serve apenas para testes durante o desenvolvimento */}
        {process.env.NODE_ENV !== "production" && (
          <Button 
            onClick={onScanComplete}
            disabled={qrExpired || isLoading}
            className="flex items-center justify-center"
          >
            <Check className="h-4 w-4 mr-2" />
            Simular Conexão
          </Button>
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 max-w-md text-center">
        <p>Para configurar a integração real, você precisará:</p>
        <ul className="list-disc pl-5 mt-2 text-left">
          <li>Conta WhatsApp Business API</li>
          <li>Credenciais de API configuradas</li>
          <li>Implementação do webhook para receber eventos</li>
        </ul>
      </div>
    </div>
  );
};

export default QRCodeScanner;
