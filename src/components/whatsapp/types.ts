
export type MessageType = "text" | "image" | "audio";
export type ConnectionStatus = "connected" | "disconnected" | "connecting";
export type MessageDirection = "incoming" | "outgoing";

export interface WhatsAppMessage {
  id: string;
  content: string;
  type: MessageType;
  receivers: number;
  status: "Agendada" | "Enviada" | "Falha";
  scheduledDate?: Date;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  lastPurchase?: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
  direction: MessageDirection;
  status?: "delivered" | "read" | "sent" | "failed";
}

export interface CustomerChat {
  customerId: string;
  messages: ChatMessage[];
  unreadCount: number;
  lastMessageTimestamp: Date;
}
