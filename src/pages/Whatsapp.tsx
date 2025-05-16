
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Image, MessageSquare, Plus, Send, Users } from "lucide-react";
import { cn } from "@/lib/utils";

type MessageType = "text" | "image" | "audio";

interface WhatsAppMessage {
  id: string;
  content: string;
  type: MessageType;
  receivers: number;
  status: "Agendada" | "Enviada" | "Falha";
  scheduledDate?: Date;
}

interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  lastPurchase?: string;
  tags: string[];
}

const Whatsapp = () => {
  useEffect(() => {
    document.title = "WhatsApp | BelleCharm";
  }, []);

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
    if (!newMessage.content.trim()) {
      toast.error("O conteúdo da mensagem não pode estar vazio.");
      return;
    }

    if (selectedCustomers.length === 0) {
      toast.error("Selecione pelo menos um cliente para enviar a mensagem.");
      return;
    }

    const newWhatsAppMessage: WhatsAppMessage = {
      id: `${Date.now()}`,
      content: newMessage.content,
      type: newMessage.type,
      receivers: selectedCustomers.length,
      status: newMessage.scheduledDate && newMessage.scheduledDate > new Date() ? "Agendada" : "Enviada",
      scheduledDate: newMessage.scheduledDate
    };

    setMessages([newWhatsAppMessage, ...messages]);
    setNewMessage({
      content: "",
      type: "text",
      scheduledDate: undefined
    });
    setSelectedCustomers([]);

    toast.success(
      newMessage.scheduledDate && newMessage.scheduledDate > new Date()
        ? "Mensagem agendada com sucesso!"
        : "Mensagem enviada com sucesso!"
    );
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
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="WhatsApp" 
            subtitle="Automatize sua comunicação com clientes." 
          />
          
          <div className="mt-8">
            <Tabs defaultValue="messages" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="messages">Mensagens</TabsTrigger>
                <TabsTrigger value="contacts">Contatos</TabsTrigger>
                <TabsTrigger value="automation">Automação</TabsTrigger>
              </TabsList>
              
              <TabsContent value="messages" className="mt-0">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Histórico de Mensagens</h3>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
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
                        <Button onClick={handleSendMessage} disabled={!newMessage.content || selectedCustomers.length === 0}>
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
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Ver Detalhes
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="contacts" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Lista de Contatos</CardTitle>
                    <CardDescription>
                      Gerencie seus contatos do WhatsApp.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-6">
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
                          <circle cx="11" cy="11" r="8"></circle>
                          <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <Input
                          placeholder="Buscar contatos..."
                          className="pl-8 w-[300px]"
                        />
                      </div>
                      
                      <Button>
                        <Users className="mr-2 h-4 w-4" />
                        Importar Contatos
                      </Button>
                    </div>
                    
                    <div className="rounded-lg border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Telefone</TableHead>
                            <TableHead>Última Compra</TableHead>
                            <TableHead>Tags</TableHead>
                            <TableHead className="text-right">Ações</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customers.map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell className="font-medium">{customer.name}</TableCell>
                              <TableCell>{customer.phoneNumber}</TableCell>
                              <TableCell>{customer.lastPurchase || "N/A"}</TableCell>
                              <TableCell>
                                <div className="flex gap-1">
                                  {customer.tags.map((tag, index) => (
                                    <Badge key={index} variant="secondary">{tag}</Badge>
                                  ))}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  Enviar Mensagem
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="automation" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Automação</CardTitle>
                    <CardDescription>
                      Configure mensagens automáticas para diversas situações.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Pós-Compra</h4>
                            <p className="text-sm text-muted-foreground">Envie mensagem após a conclusão de uma compra</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800" variant="outline">
                              Ativo
                            </Badge>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Aniversário</h4>
                            <p className="text-sm text-muted-foreground">Envie uma mensagem no aniversário do cliente</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800" variant="outline">
                              Ativo
                            </Badge>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Cliente Inativo</h4>
                            <p className="text-sm text-muted-foreground">Envie uma mensagem para clientes inativos há mais de 30 dias</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-red-100 text-red-800" variant="outline">
                              Inativo
                            </Badge>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Confirmação de Envio</h4>
                            <p className="text-sm text-muted-foreground">Notifique quando o pedido for enviado</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-green-100 text-green-800" variant="outline">
                              Ativo
                            </Badge>
                            <Button variant="outline" size="sm">Editar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Automação
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatsapp;
