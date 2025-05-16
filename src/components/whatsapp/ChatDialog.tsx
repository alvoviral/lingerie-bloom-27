
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatMessage, Customer, ConnectionState, MessageType } from "./types";
import ChatInterface from "./ChatInterface";
import { toast } from "sonner";

// Demo data for initial chat messages
const generateDemoChat = (customerId: string): ChatMessage[] => {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  
  return [
    {
      id: `${customerId}-1`,
      content: "Olá, gostaria de saber sobre as promoções atuais.",
      type: "text",
      timestamp: new Date(yesterday.setHours(10, 15)),
      direction: "incoming",
    },
    {
      id: `${customerId}-2`,
      content: "Olá! Temos 20% de desconto em toda a coleção de primavera. Posso te enviar algumas opções?",
      type: "text",
      timestamp: new Date(yesterday.setHours(10, 18)),
      direction: "outgoing",
      status: "read"
    },
    {
      id: `${customerId}-3`,
      content: "Sim, por favor! Estou procurando lingeries.",
      type: "text",
      timestamp: new Date(yesterday.setHours(10, 20)),
      direction: "incoming",
    },
    {
      id: `${customerId}-4`,
      content: "/assets/promocao-lingerie.jpg",
      type: "image",
      timestamp: new Date(yesterday.setHours(10, 22)),
      direction: "outgoing",
      status: "read"
    },
    {
      id: `${customerId}-5`,
      content: "Estas são as nossas opções mais populares com 20% OFF!",
      type: "text",
      timestamp: new Date(yesterday.setHours(10, 22)),
      direction: "outgoing",
      status: "read"
    },
    {
      id: `${customerId}-6`,
      content: "Ótimo! Vou passar na loja hoje à tarde. Vocês fecham que horas?",
      type: "text",
      timestamp: new Date(now.setHours(9, 5)),
      direction: "incoming",
    }
  ];
};

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer | null;
  connectionState: ConnectionState;
}

const ChatDialog = ({ open, onOpenChange, customer, connectionState }: ChatDialogProps) => {
  const [chat, setChat] = useState<ChatMessage[]>([]);
  
  // Initialize chat history when customer changes
  useEffect(() => {
    if (customer) {
      setChat(generateDemoChat(customer.id));
    } else {
      setChat([]);
    }
  }, [customer]);
  
  const handleSendMessage = (content: string, type: MessageType) => {
    if (connectionState.status !== "connected") {
      toast.error("É necessário conectar o WhatsApp para enviar mensagens");
      return;
    }
    
    if (!customer) return;
    
    const newMessage: ChatMessage = {
      id: `${customer.id}-${Date.now()}`,
      content,
      type,
      timestamp: new Date(),
      direction: "outgoing",
      status: "sent"
    };
    
    setChat([...chat, newMessage]);
    toast.success("Mensagem enviada com sucesso");
    
    // Simulate customer reply after a delay (for demo purposes)
    if (Math.random() > 0.5) {
      setTimeout(() => {
        const reply: ChatMessage = {
          id: `${customer.id}-${Date.now() + 1}`,
          content: "Obrigado pela informação!",
          type: "text",
          timestamp: new Date(),
          direction: "incoming"
        };
        
        setChat(currentChat => [...currentChat, reply]);
      }, 5000 + Math.random() * 10000);
    }
  };
  
  if (!customer) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Chat com {customer.name}</DialogTitle>
        </DialogHeader>
        <div className="px-4 pb-4">
          <ChatInterface
            customer={customer}
            chat={chat}
            connectionState={connectionState}
            onSendMessage={handleSendMessage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
