
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Send, MessageSquare, Image, Trash2, Eye } from "lucide-react";
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppMessage, Customer, ConnectionState, MessageType } from "./types";
import DeleteDialog from "@/components/customers/DeleteCustomerDialog";

interface MessagesTabProps {
  messages: WhatsAppMessage[];
  customers: Customer[];
  connectionState: ConnectionState;
  onSendMessage: (message: Omit<WhatsAppMessage, "id" | "receivers" | "status">, recipients: string[]) => void;
  onDeleteMessage: (messageId: string) => void;
}

const MessagesTab = ({ messages, customers, connectionState, onSendMessage, onDeleteMessage }: MessagesTabProps) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<{
    content: string;
    type: MessageType;
    scheduledDate?: Date | undefined;
  }>({
    content: "",
    type: "text",
    scheduledDate: undefined
  });
  
  // Add state for delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<WhatsAppMessage | null>(null);
  
  const handleSelectAllCustomers = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(customers.map(c => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  const handleToggleCustomer = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  const handleSendMessage = () => {
    if (connectionState.status !== "connected") {
      toast.error("É necessário conectar ao WhatsApp para enviar mensagens.");
      return;
    }
    
    if (!newMessage.content.trim()) {
      toast.error("O conteúdo da mensagem não pode estar vazio.");
      return;
    }

    if (selectedCustomers.length === 0) {
      toast.error("Selecione pelo menos um cliente para enviar a mensagem.");
      return;
    }

    onSendMessage(newMessage, selectedCustomers);
    
    setNewMessage({
      content: "",
      type: "text",
      scheduledDate: undefined
    });
    setSelectedCustomers([]);
  };
  
  // Add handlers for delete functionality
  const openDeleteDialog = (message: WhatsAppMessage) => {
    setMessageToDelete(message);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteMessage = () => {
    if (!messageToDelete) return;
    
    // Call the parent component's delete handler
    onDeleteMessage(messageToDelete.id);
    setDeleteDialogOpen(false);
    setMessageToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Agendada": return "bg-amber-100 text-amber-800";
      case "Enviada": return "bg-green-100 text-green-800";
      case "Falha": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Histórico de Mensagens</h3>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={connectionState.status !== "connected"}>
              <Plus className="mr-2 h-4 w-4" /> Nova Mensagem
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Enviar Mensagem</DialogTitle>
              <DialogDescription>
                Crie uma nova mensagem para seus clientes.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tipo de Mensagem</Label>
                <Select
                  value={newMessage.type}
                  onValueChange={(val: MessageType) => 
                    setNewMessage({ ...newMessage, type: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Texto</SelectItem>
                    <SelectItem value="image">Imagem</SelectItem>
                    <SelectItem value="audio">Áudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Conteúdo</Label>
                {newMessage.type === "text" ? (
                  <Textarea
                    placeholder="Digite sua mensagem..."
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    className="min-h-[100px]"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder={`URL para ${newMessage.type === "image" ? "imagem" : "áudio"}...`}
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                    />
                    <Button variant="secondary" size="sm">
                      Escolher Arquivo
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label>Agendar Envio (opcional)</Label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !newMessage.scheduledDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newMessage.scheduledDate ? (
                          format(newMessage.scheduledDate, "dd/MM/yyyy")
                        ) : (
                          "Escolha uma data"
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={newMessage.scheduledDate}
                        onSelect={(date) => setNewMessage({ ...newMessage, scheduledDate: date })}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  
                  {newMessage.scheduledDate && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setNewMessage({ ...newMessage, scheduledDate: undefined })}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                      </svg>
                      <span className="sr-only">Limpar data</span>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Destinatários ({selectedCustomers.length} selecionados)</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox 
                      id="selectAll" 
                      checked={selectedCustomers.length === customers.length}
                      onCheckedChange={handleSelectAllCustomers}
                    />
                    <Label htmlFor="selectAll" className="text-sm">Selecionar todos</Label>
                  </div>
                </div>
                
                <ScrollArea className="h-[200px] border rounded-lg p-2">
                  <div className="space-y-2">
                    {customers.map((customer) => (
                      <div key={customer.id} className="flex items-center justify-between py-2 px-1 hover:bg-muted/40 rounded">
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-xs text-muted-foreground">{customer.phoneNumber}</p>
                        </div>
                        <Checkbox 
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={() => handleToggleCustomer(customer.id)}
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleSendMessage} 
                disabled={!newMessage.content || selectedCustomers.length === 0 || connectionState.status !== "connected"}
              >
                <Send className="mr-2 h-4 w-4" />
                {newMessage.scheduledDate && newMessage.scheduledDate > new Date() 
                  ? "Agendar Mensagem" 
                  : "Enviar Mensagem"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead className="w-[300px]">Conteúdo</TableHead>
              <TableHead>Destinatários</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  {message.type === "text" && <MessageSquare className="h-4 w-4" />}
                  {message.type === "image" && <Image className="h-4 w-4" />}
                  {message.type === "audio" && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {message.content}
                </TableCell>
                <TableCell>{message.receivers}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(message.status)} variant="outline">
                    {message.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {message.scheduledDate 
                    ? format(message.scheduledDate, "dd/MM/yyyy") 
                    : "Imediato"}
                </TableCell>
                <TableCell className="text-right flex justify-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Ver Detalhes</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => openDeleteDialog(message)}
                    disabled={connectionState.status !== "connected"}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <DeleteDialog 
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteMessage}
        itemName={messageToDelete?.content.substring(0, 20) + (messageToDelete?.content.length > 20 ? "..." : "") || ""}
        itemType="mensagem"
      />
    </>
  );
};

export default MessagesTab;
