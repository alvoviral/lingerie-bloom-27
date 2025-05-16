import { useEffect, useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

// Import custom components
import QRCodeScanner from "@/components/whatsapp/QRCodeScanner";
import ConnectionBanner from "@/components/whatsapp/ConnectionBanner";
import MessagesTab from "@/components/whatsapp/MessagesTab";
import ContactsTab from "@/components/whatsapp/ContactsTab";
import AutomationTab from "@/components/whatsapp/AutomationTab";

// Import types
import { ConnectionState, ConnectionStatus, ConnectionError, WhatsAppMessage, Customer } from "@/components/whatsapp/types";

const Whatsapp = () => {
  useEffect(() => {
    document.title = "WhatsApp | BelleCharm";
  }, []);

  const [connectionState, setConnectionState] = useState<ConnectionState>({
    status: "disconnected",
    reconnectAttempts: 0,
    maxReconnectAttempts: 3
  });
  
  const [showQrCode, setShowQrCode] = useState(false);
  
  // Keep track of connection timeout
  const connectionTimeoutRef = useRef<number>();
  const pingIntervalRef = useRef<number>();
  
  const [messages, setMessages] = useState<WhatsAppMessage[]>([
    {
      id: "1",
      content: "Olá! Temos novidades incríveis na coleção Primavera/Verão 2025! Visite nossa loja online e aproveite 15% OFF em toda nova coleção. Cupom: PRIMAVERA25",
      type: "text",
      receivers: 150,
      status: "Enviada",
    },
    {
      id: "2",
      content: "/assets/promocao-lingerie.jpg",
      type: "image",
      receivers: 120,
      status: "Enviada",
    },
    {
      id: "3",
      content: "Atenção clientes especiais! Amanhã teremos um dia exclusivo de promoções só para vocês! Não perca até 40% de desconto em peças selecionadas.",
      type: "text",
      receivers: 50,
      status: "Agendada",
      scheduledDate: new Date(2025, 4, 20),
    },
    {
      id: "4",
      content: "/assets/audio-promocao.mp3",
      type: "audio",
      receivers: 80,
      status: "Falha",
    }
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: "1", name: "Carolina Silva", phoneNumber: "+5511987654321", lastPurchase: "2025-05-10", tags: ["Fiel", "VIP"] },
    { id: "2", name: "Fernanda Oliveira", phoneNumber: "+5511976543210", lastPurchase: "2025-05-05", tags: ["Novo"] },
    { id: "3", name: "Amanda Costa", phoneNumber: "+5511965432109", lastPurchase: "2025-04-28", tags: ["VIP"] },
    { id: "4", name: "Mariana Ribeiro", phoneNumber: "+5511954321098", lastPurchase: "2025-04-15", tags: ["Inativo"] },
    { id: "5", name: "Luiza Mendes", phoneNumber: "+5511943210987", lastPurchase: "2025-05-12", tags: ["Fiel"] }
  ]);
  
  // Cleanup intervals and timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (connectionTimeoutRef.current) {
        clearTimeout(connectionTimeoutRef.current);
      }
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, []);
  
  // Set up ping interval when connected to detect connection issues
  useEffect(() => {
    if (connectionState.status === "connected") {
      pingIntervalRef.current = window.setInterval(() => {
        // Simulate random connection loss (1% chance every 30 seconds)
        if (Math.random() < 0.01) {
          handleConnectionError("network_error");
        }
      }, 30000);
      
      return () => {
        if (pingIntervalRef.current) {
          clearInterval(pingIntervalRef.current);
        }
      };
    }
  }, [connectionState.status]);
  
  // Handle connection errors
  const handleConnectionError = useCallback((error: ConnectionError) => {
    toast.error("Erro na conexão com WhatsApp");
    
    setConnectionState(prev => ({
      ...prev,
      status: "error",
      error: error,
      lastAttempt: new Date()
    }));
  }, []);
  
  // Attempt reconnection
  const handleReconnect = useCallback(() => {
    if (connectionState.reconnectAttempts >= connectionState.maxReconnectAttempts) {
      toast.error("Número máximo de tentativas excedido. Tente conectar manualmente.");
      setConnectionState(prev => ({
        ...prev,
        status: "disconnected",
        reconnectAttempts: 0
      }));
      return;
    }
    
    toast.info("Tentando reconectar...");
    
    setConnectionState(prev => ({
      ...prev,
      status: "reconnecting",
      reconnectAttempts: prev.reconnectAttempts + 1
    }));
    
    // Simulate reconnection attempt
    setTimeout(() => {
      // 60% chance of successful reconnection for demo
      if (Math.random() < 0.6) {
        setConnectionState(prev => ({
          ...prev,
          status: "connected",
          error: undefined
        }));
        toast.success("Reconectado com sucesso!");
      } else {
        handleConnectionError("network_error");
      }
    }, 3000);
  }, [connectionState.reconnectAttempts, connectionState.maxReconnectAttempts, handleConnectionError]);
  
  const handleConnect = useCallback(() => {
    if (connectionState.status === "connected") {
      // Disconnect logic
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
      setConnectionState({
        status: "disconnected",
        reconnectAttempts: 0,
        maxReconnectAttempts: 3
      });
      toast.success("WhatsApp desconectado com sucesso!");
      return;
    }
    
    // Connect
    setConnectionState(prev => ({
      ...prev,
      status: "connecting"
    }));
    
    // Mostrar QR code imediatamente
    setShowQrCode(true);
    
    // Clear any existing timeout
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
    }
    
    // Set connection timeout (60 seconds)
    connectionTimeoutRef.current = window.setTimeout(() => {
      if (connectionState.status === "connecting") {
        handleConnectionError("timeout");
        setShowQrCode(false);
      }
    }, 60000);
  }, [connectionState.status, handleConnectionError]);
  
  const handleScanComplete = useCallback(() => {
    // Clear the connection timeout
    if (connectionTimeoutRef.current) {
      clearTimeout(connectionTimeoutRef.current);
    }
    
    // Simulating connection success after QR scan
    setConnectionState({
      status: "connected",
      reconnectAttempts: 0,
      maxReconnectAttempts: 3
    });
    setShowQrCode(false);
    toast.success("WhatsApp conectado com sucesso!");
  }, []);
  
  const handleRefreshQrCode = useCallback(() => {
    toast.info("Gerando novo QR code...");
    // Simulate QR code refresh
    setTimeout(() => {
      toast.success("Novo QR code gerado!");
    }, 1000);
  }, []);

  const handleSendMessage = useCallback(
    (
      newMessageData: Omit<WhatsAppMessage, "id" | "receivers" | "status">, 
      recipients: string[]
    ) => {
      const newWhatsAppMessage: WhatsAppMessage = {
        id: `${Date.now()}`,
        content: newMessageData.content,
        type: newMessageData.type,
        receivers: recipients.length,
        status: newMessageData.scheduledDate && newMessageData.scheduledDate > new Date() ? "Agendada" : "Enviada",
        scheduledDate: newMessageData.scheduledDate
      };

      setMessages([newWhatsAppMessage, ...messages]);

      toast.success(
        newMessageData.scheduledDate && newMessageData.scheduledDate > new Date()
          ? "Mensagem agendada com sucesso!"
          : "Mensagem enviada com sucesso!"
      );
    },
    [messages]
  );
  
  // Add a handler for deleting messages
  const handleDeleteMessage = useCallback((messageId: string) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId));
    toast.success("Mensagem excluída com sucesso!");
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="WhatsApp" 
            subtitle="Automatize sua comunicação com clientes." 
          />
          
          <div className="mt-8">
            {/* QR Code Dialog - Garantindo que seja exibido corretamente */}
            <Dialog 
              open={showQrCode} 
              onOpenChange={(open) => {
                if (!open && connectionState.status === "connecting") {
                  // Se o diálogo for fechado durante a conexão, cancelar o processo
                  setConnectionState({
                    status: "disconnected",
                    reconnectAttempts: 0,
                    maxReconnectAttempts: 3
                  });
                  
                  if (connectionTimeoutRef.current) {
                    clearTimeout(connectionTimeoutRef.current);
                  }
                }
                setShowQrCode(open);
              }}
            >
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Conectar ao WhatsApp</DialogTitle>
                  <DialogDescription>
                    Escaneie o código QR com seu WhatsApp para conectar sua conta
                  </DialogDescription>
                </DialogHeader>
                <QRCodeScanner 
                  connectionState={connectionState} 
                  onRefresh={handleRefreshQrCode} 
                  onScanComplete={handleScanComplete} 
                />
              </DialogContent>
            </Dialog>
            
            {/* Connection Status Banner */}
            <ConnectionBanner 
              connectionState={connectionState} 
              onConnect={handleConnect}
              onReconnect={handleReconnect}
            />
            
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="automation">Automação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="mt-0">
                <MessagesTab />
              </TabsContent>
              
              <TabsContent value="contacts" className="mt-0">
                <ContactsTab 
                  customers={customers}
                  connectionState={connectionState}
                />
              </TabsContent>
              
              <TabsContent value="automation" className="mt-0">
                <AutomationTab connectionState={connectionState} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
