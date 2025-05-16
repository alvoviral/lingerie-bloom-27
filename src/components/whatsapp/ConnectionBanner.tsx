
import { AlertCircle, Loader2, MessageSquareText, PhoneOff, QrCode, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ConnectionState, ConnectionStatus, ConnectionError } from "./types";
import { useState, useEffect } from "react";

interface ConnectionBannerProps {
  connectionState: ConnectionState;
  onConnect: () => void;
  onReconnect: () => void;
}

const ConnectionBanner = ({ connectionState, onConnect, onReconnect }: ConnectionBannerProps) => {
  const [reconnectCountdown, setReconnectCountdown] = useState<number>(0);
  
  // Handle reconnection countdown
  useEffect(() => {
    let timer: number | undefined;
    
    if (connectionState.status === "error" && reconnectCountdown > 0) {
      timer = window.setTimeout(() => {
        setReconnectCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [reconnectCountdown, connectionState.status]);
  
  // Trigger reconnect when countdown finishes
  useEffect(() => {
    if (reconnectCountdown === 0 && connectionState.status === "error") {
      onReconnect();
    }
  }, [reconnectCountdown, connectionState.status, onReconnect]);
  
  // Set initial countdown when error occurs
  useEffect(() => {
    if (connectionState.status === "error") {
      setReconnectCountdown(10);
    }
  }, [connectionState.error]);

  // Helper to get appropriate error message
  const getErrorMessage = (error?: ConnectionError): string => {
    switch (error) {
      case "timeout":
        return "A conexão expirou. Tentando reconectar automaticamente...";
      case "qr_expired":
        return "O QR code expirou. Tente escanear um novo código.";
      case "server_error":
        return "Erro no servidor do WhatsApp. Tentando reconectar automaticamente...";
      case "auth_failure":
        return "Falha na autenticação. Tente conectar novamente.";
      case "network_error":
        return "Falha na conexão de rede. Tentando reconectar automaticamente...";
      default:
        return "Erro desconhecido. Tentando reconectar automaticamente...";
    }
  };

  if (connectionState.status === "connected") {
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
  } else if (connectionState.status === "connecting") {
    return (
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
        <AlertTitle className="text-amber-600">Conectando WhatsApp</AlertTitle>
        <AlertDescription className="text-amber-700">
          Escaneie o QR code com seu WhatsApp para concluir a conexão.
        </AlertDescription>
      </Alert>
    );
  } else if (connectionState.status === "reconnecting") {
    return (
      <Alert className="mb-6 bg-amber-50 border-amber-200">
        <RefreshCw className="h-4 w-4 text-amber-600 animate-spin" />
        <AlertTitle className="text-amber-600">Reconectando WhatsApp</AlertTitle>
        <AlertDescription className="text-amber-700">
          Tentando restabelecer conexão com o WhatsApp...
          {connectionState.reconnectAttempts > 0 && (
            <span className="ml-1">
              Tentativa {connectionState.reconnectAttempts}/{connectionState.maxReconnectAttempts}.
            </span>
          )}
        </AlertDescription>
        <Button 
          variant="outline"
          size="sm" 
          className="ml-auto border-amber-300 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          onClick={onConnect}
        >
          <QrCode className="h-4 w-4 mr-2" />
          Conectar Manualmente
        </Button>
      </Alert>
    );
  } else if (connectionState.status === "error") {
    return (
      <Alert className="mb-6 bg-red-50 border-red-200">
        <AlertCircle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-600">Erro na Conexão</AlertTitle>
        <AlertDescription className="text-red-700">
          {getErrorMessage(connectionState.error)}
          {reconnectCountdown > 0 && (
            <span className="ml-1 font-medium">
              Reconectando em {reconnectCountdown}s...
            </span>
          )}
        </AlertDescription>
        <div className="ml-auto flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
            onClick={onReconnect}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reconectar Agora
          </Button>
          <Button 
            variant="outline"
            size="sm" 
            className="border-red-300 text-red-700 hover:bg-red-100 hover:text-red-800"
            onClick={onConnect}
          >
            <QrCode className="h-4 w-4 mr-2" />
            Conectar Manualmente
          </Button>
        </div>
      </Alert>
    );
  } else {
    // Disconnected state
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
