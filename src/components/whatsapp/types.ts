
export type MessageType = "text" | "image" | "audio";
export type ConnectionStatus = "connected" | "disconnected" | "connecting";

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
