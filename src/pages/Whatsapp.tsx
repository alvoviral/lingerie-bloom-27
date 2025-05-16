
import { useEffect, useState } from "react";
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
import { ConnectionStatus, WhatsAppMessage, Customer } from "@/components/whatsapp/types";

const Whatsapp = () => {
  useEffect(() => {
    document.title = "WhatsApp | BelleCharm";
  }, []);

  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("disconnected");
  const [showQrCode, setShowQrCode] = useState(false);
  
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
  
  const handleConnect = () => {
    if (connectionStatus === "connected") {
      // Disconnect
      setConnectionStatus("disconnected");
      toast.success("WhatsApp desconectado com sucesso!");
      return;
    }
    
    // Connect
    setConnectionStatus("connecting");
    setShowQrCode(true);
  };
  
  const handleScanComplete = () => {
    // Simulating connection success after QR scan
    setTimeout(() => {
      setConnectionStatus("connected");
      setShowQrCode(false);
      toast.success("WhatsApp conectado com sucesso!");
    }, 2000);
  };
  
  const handleRefreshQrCode = () => {
    toast.info("Gerando novo QR code...");
    // Simulate QR code refresh
    setTimeout(() => {
      toast.success("Novo QR code gerado!");
    }, 1500);
  };

  const handleSendMessage = (
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
  };

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
            {/* QR Code Dialog */}
            <Dialog open={showQrCode && connectionStatus === "connecting"} onOpenChange={setShowQrCode}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Conectar ao WhatsApp</DialogTitle>
                  <DialogDescription>
                    Escaneie o código QR com seu WhatsApp para conectar sua conta
                  </DialogDescription>
                </DialogHeader>
                <QRCodeScanner 
                  connectionStatus={connectionStatus} 
                  onRefresh={handleRefreshQrCode} 
                  onScanComplete={handleScanComplete} 
                />
              </DialogContent>
            </Dialog>
            
            {/* Connection Status Banner */}
            <ConnectionBanner 
              connectionStatus={connectionStatus} 
              onConnect={handleConnect} 
            />
            
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="automation">Automação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="mt-0">
                <MessagesTab 
                  messages={messages}
                  customers={customers}
                  connectionStatus={connectionStatus}
                  onSendMessage={handleSendMessage}
                />
              </TabsContent>
              
              <TabsContent value="contacts" className="mt-0">
                <ContactsTab 
                  customers={customers}
                  connectionStatus={connectionStatus}
                />
              </TabsContent>
              
              <TabsContent value="automation" className="mt-0">
                <AutomationTab connectionStatus={connectionStatus} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
