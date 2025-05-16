import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Send, Clock, AlertTriangle, Trash2 } from "lucide-react";
import { MessageItem, MessageStatus } from "./types";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

const mockMessages: MessageItem[] = [
  {
    id: "1",
    content: "Olá! Temos novidades incríveis na coleção Primavera/Verão 2025! Visite nossa loja online e aproveite 15% OFF em toda nova coleção. Cupom: PRIMAVERA25",
    type: "text",
    recipients: 150,
    status: "sent",
    scheduledFor: "Imediato",
    createdAt: new Date(),
  },
  {
    id: "2",
    content: "/assets/promocao-lingerie.jpg",
    type: "image",
    recipients: 120,
    status: "sent",
    scheduledFor: "Imediato",
    createdAt: new Date(),
  },
  {
    id: "3",
    content: "Atenção clientes especiais! Amanhã teremos um dia exclusivo de promoções só para vocês! Não perca até 40% de desconto em peças selecionadas.",
    type: "text",
    recipients: 50,
    status: "scheduled",
    scheduledFor: "20/05/2025",
    createdAt: new Date(),
  },
  {
    id: "4",
    content: "/assets/audio-promocao.mp3",
    type: "audio",
    recipients: 80,
    status: "failed",
    scheduledFor: "Imediato",
    createdAt: new Date(),
  },
];

const getStatusBadge = (status: MessageStatus) => {
  switch (status) {
    case "sent":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Send className="h-3 w-3 mr-1" />
          Enviada
        </Badge>
      );
    case "scheduled":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Agendada
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Falha
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          {status}
        </Badge>
      );
  }
};

const getTruncatedContent = (content: string, type: string) => {
  if (type === "text") {
    return content;
  }
  return content.startsWith("/") ? content : `/${content}`;
};

const MessagesTab = () => {
  const [messages, setMessages] = useState<MessageItem[]>(mockMessages);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(null);
  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);

  const handleDelete = () => {
    if (selectedMessageId) {
      setMessages(messages.filter(msg => msg.id !== selectedMessageId));
      setIsDeleteDialogOpen(false);
      setSelectedMessageId(null);
    }
  };

  const openDeleteDialog = (id: string) => {
    setSelectedMessageId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Histórico de Mensagens</h3>
        <Button variant="default">
          <Send className="mr-2 h-4 w-4" />
          Nova Mensagem
        </Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead className="w-full">Conteúdo</TableHead>
              <TableHead>Destinatários</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell className="font-medium">
                  {message.type === "text" ? "Texto" : 
                   message.type === "image" ? "Imagem" : 
                   message.type === "audio" ? "Áudio" : message.type}
                </TableCell>
                <TableCell className="max-w-xs">
                  <p className="truncate">
                    {getTruncatedContent(message.content, message.type)}
                  </p>
                </TableCell>
                <TableCell>{message.recipients}</TableCell>
                <TableCell>
                  {getStatusBadge(message.status)}
                </TableCell>
                <TableCell>{message.scheduledFor}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Ver Detalhes</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openDeleteDialog(message.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedMessage && (
        <DeleteConfirmationDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDelete}
          itemName={selectedMessage.content.substring(0, 30) + "..."}
          itemType="mensagem"
        />
      )}
    </div>
  );
};

export default MessagesTab;
