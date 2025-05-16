
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Image as ImageIcon, MessageSquare } from "lucide-react";
import { format } from "date-fns";

import { ChatMessage, Customer, ConnectionStatus, MessageType } from "./types";

interface ChatInterfaceProps {
  customer: Customer;
  chat: ChatMessage[];
  connectionStatus: ConnectionStatus;
  onSendMessage: (content: string, type: MessageType) => void;
}

const ChatInterface = ({ customer, chat, connectionStatus, onSendMessage }: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [attachmentType, setAttachmentType] = useState<MessageType | null>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    onSendMessage(newMessage, "text");
    setNewMessage("");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const renderMessage = (message: ChatMessage) => {
    const isOutgoing = message.direction === "outgoing";
    
    return (
      <div 
        key={message.id} 
        className={`flex mb-4 ${isOutgoing ? 'justify-end' : 'justify-start'}`}
      >
        {!isOutgoing && (
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
          </Avatar>
        )}
        
        <div
          className={`rounded-lg px-4 py-2 max-w-[70%] ${
            isOutgoing 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-muted'
          }`}
        >
          {message.type === "text" && <p>{message.content}</p>}
          
          {message.type === "image" && (
            <div className="space-y-2">
              <div className="h-48 w-full bg-muted-foreground/20 rounded flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <p className="text-xs">{message.content}</p>
            </div>
          )}
          
          {message.type === "audio" && (
            <div className="space-y-2">
              <div className="h-12 w-full bg-muted-foreground/20 rounded flex items-center justify-center px-4">
                <div className="w-full h-1 bg-muted-foreground/50 rounded-full"></div>
              </div>
              <p className="text-xs">Audio message</p>
            </div>
          )}
          
          <p className={`text-xs mt-1 ${isOutgoing ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
            {format(message.timestamp, 'HH:mm')}
            {isOutgoing && message.status && (
              <span className="ml-2">• {message.status}</span>
            )}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex items-center bg-muted/30">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{customer.name}</h3>
          <p className="text-xs text-muted-foreground">{customer.phoneNumber}</p>
        </div>
      </div>
      
      {/* Chat messages */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {chat.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 mb-2 opacity-20" />
                <p>Nenhuma mensagem ainda</p>
                <p className="text-sm">Comece a conversa enviando uma mensagem</p>
              </div>
            </div>
          ) : (
            chat.map(renderMessage)
          )}
        </div>
      </ScrollArea>
      
      {/* Input area */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <div className="flex-1 flex gap-2 items-center">
            <Button
              variant="ghost"
              size="icon"
              disabled={connectionStatus !== "connected"}
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite uma mensagem..."
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={connectionStatus !== "connected"}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || connectionStatus !== "connected"}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
