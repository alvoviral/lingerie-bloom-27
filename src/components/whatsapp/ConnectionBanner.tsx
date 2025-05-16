
import { AlertCircle, Loader2, MessageSquareText, PhoneOff, QrCode } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ConnectionBannerProps {
  connectionStatus: "connected" | "disconnected" | "connecting";
  onConnect: () => void;
}

const ConnectionBanner = ({ connectionStatus, onConnect }: ConnectionBannerProps) => {
  if (connectionStatus === "connected") {
    return (
      <Alert className="mb-6 bg-green-50 border-green-200">
        <MessageSquareText className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-600">WhatsApp Conectado</AlertTitle>
        <AlertDescription className="text-green-700">
          Seu WhatsApp está conectado e pronto para enviar mensagens.
        </AlertDescription>
        <Button 
          variant="outline"
          size="sm" 
          className="ml-auto border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800"
          onClick={onConnect}
        >
          <PhoneOff className="h-4 w-4 mr-2" />
          Desconectar
        </Button>
      </Alert>
    );
  } else if (connectionStatus === "connecting") {
    return (
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
        <AlertTitle className="text-amber-600">Conectando WhatsApp</AlertTitle>
        <AlertDescription className="text-amber-700">
          Escaneie o QR code com seu WhatsApp para concluir a conexão.
        </AlertDescription>
      </Alert>
    );
  } else {
    return (
      <Alert className="mb-6 bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-600">WhatsApp Desconectado</AlertTitle>
        <AlertDescription className="text-red-700">
          Você precisa conectar seu WhatsApp para enviar e receber mensagens.
        </AlertDescription>
        <Button 
          variant="outline"
          size="sm" 
          className="ml-auto border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
          onClick={onConnect}
        >
          <QrCode className="h-4 w-4 mr-2" />
          Conectar WhatsApp
        </Button>
      </Alert>
    );
  }
};

export default ConnectionBanner;
