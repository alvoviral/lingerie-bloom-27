
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { format } from "date-fns";
import { 
  AlertCircle, 
  Calendar as CalendarIcon, 
  Check, 
  Image, 
  Loader2, 
  MessageSquare, 
  PhoneOff,
  Plus, 
  QrCode,
  Refresh, 
  Send, 
  Users, 
  Whatsapp as WhatsappIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

type MessageType = "text" | "image" | "audio";
type ConnectionStatus = "connected" | "disconnected" | "connecting";

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
    if (connectionStatus !== "connected") {
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

  const renderQrCode = () => (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="w-64 h-64 bg-gray-100 relative flex items-center justify-center">
          <img 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8AAACPj4/U1NT7+/v19fXx8fHj4+Pn5+ft7e2amprY2NjIyMjd3d28vLzDw8OWlpZ0dHSfn5+oqKhcXFy1tbVERESJiYlvb29OTk4qKio8PDxkZGQYGBgNDQ1+fn4yMjJYWFghISEuLi49PT15eXlISEgcHBxnZ2clDBTBAAALdklEQVR4nO2d6WKqOhSFGQQFERUc6lSttv3/P/CGQcgOQyAJ4PlWn3prlKxkT9lJmk2j0Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNP8fLAvlJ8d6v+j5brAOVtPjrh/Nx0+9No/+Y3daTYM1uO52i/1G7zluW6SObX/+5LBeRElAgWXlL2Do0konbA9+ZInYGZ5+35KixZWTqmFO0jXm24+PnWnYE3hkr7ed7aIGP/2iS2Vg+56kNOTdczzsTUbeh9PpOE5/OeOJ/7wfhj5VZmA6xFtPng/TxT8/NQ7HBw4u48Xzdjpdat8Gz0doMQrB8aTiTjl+mS6iz+eXEXvv1Rvt1vPrY7BwXMf27ExmOO9wPVgODtdnEUOttrvOi7t9S+aHJemWaXF4pTw6HnXcIhdOUOs9SpfnG3lv6G+EvTnTudTYbdOPoLUW8kZ3Obm5kV7vTCfxjvTVRrLuFOSLv8kMrqHMlzjDH+YfXvVgHY3n+eCb8R4GpGt9hVeQz04FM7imBr4r4CWO8LtYK+RHO9inbZIbWdDvExJOOxsLrUcLvwSfFQoW8K/ZpNS428HAzM57C3g4pcFtAu8iFi6iX6iHLDm0wvoNu2PbEurQDr7eVJ/GDN/IMMv8vQmvkZrGPeGktKB+Q6U8eb/s7VNlm2M+DUZkifF9fL0BaYvAZ3/IN06wV8avAnB1nLbHt2fiZvD1pm/Fq2GfoTPyxpQGIdl6zGdpAhfTOvruDryRpUSuofat8VzEh9G+umvgui35VwOAG9mKbe09fKmOXDsE79gVrIROYk1dj1/hQoZL9NVL+FpbodlrwIc6RE+uHYJ3dIUqoZvYpv4FZsm6C32P5dWpMxR+qXYa9+APt7ZCtRT2fjH1b/Cl7uAC9PWHAP9wQnic8LRRg84Q/5DfuNCBfmKSzvLgUsopbQle7IzfRuFO7Ef1Yx0Y9vA/oAN8tVqbMKC2+Dr8BLzoiL/iHdamZYchbOtmdZb1M+DS0AIfB94V+YsLqNTlP7J3+AFRTteGnxBSnGLggsQfXMALrdIXsoHJct1VIbxgTPywR3CliDKuwXsJbfD8gENC3QjXcPj9iFQGXchQiV86gTdtZV8SQ5xhK/p0S2iogD8OBPdhRfnogLD8V1Fmr6MZLJWgvJAA32wn/ZJtaEzUVBW44LWFxogKfBm6a+ogEy5T9etCKXB9FHQoQRYi1FNTa6ATyvtQCpw+0Rd1zpT60Cp8iTH0YFUC+kYg0q5TwXngrlA1b1CbF90F29DrlrI/sAfTUfFj+oCgmyX9mmUgK9QTiXvwZ39kDylJg/JIcvpCBuX2E1rDE7xeDPXu4Sd8ib4kBs47JDobKzD6UrvlQCUqvH1CucBS7NVSlqHnonFFCup9mXhUDDw3US4ehcq7Ek3LgeKp8FqpYXgR+nzlwNOuCiSYUhKCj8ibRQGtyyhfE4IhIupxxlycQLSklB8UhZ647JnCVBNfI0RBono2CI1K0wJCMbZyd0juRN+XnBLTUb2kgeG4XPeDBjRpS78mjV70rERNwJ0zFxXSvCKUcSlX9EYeRE8JG/B9EEoZcB89SL8SkI3qO2vQqrqrOz1BQ+Fjix24kBGFSUcGsJ7CF7nAKKk7Vz+BsRvOWTUwAtHlkGkAsQi6/xwYx/PcoAe11FRvPoyiVwa+RND+AaMx5Q46HVhLrTpDGLg1VVQQw6QYfZRALt+yQRt+FcVwCoMqMIqB/j14sxjlm8LJVC5RpAPDGKVK6sJaWW4S1oZNKrsmBB30UKniwtlR9ikKG8ZZoUymCyPuPgitKW1YAMOZoEOigF0qtFx+gElsJdvPHWAopqQumMhLvB+4Sp1MfNPDS/VlN0J1ZwCTOqdQnO+Bn0KFw52smzgbsFlKe0og9lMiDD6xG/yJfUOY8JD055jQUiK+gYv3WcY9f0LgYa2EC/sBVKcoqAYz+36FKyESDNlUhAe7VqbRhIlhklo48AiX4h5kVtit96HxPVM4rYYp5szFRTt6kPsJOCcUaf3BA68CEopg0kmoThhq6Ys4sQYPTWYJHHGCYZE3lsJjY+9krkuzUaRGFvDgq7A+gsnvyyQhKAkKbZScIY+oXaUdJeBtgNbiEhgUcH2mrSbeAMbR5Aly+koxrwsPlpFIChNJ3BCtv0BzDkAFJ9IE3DARtT7+gKfYRNIecMdQ+AN4bhPWp2jBA3Qc0jCSz5UeQuUroaQCCgXRwmoe8NikepYvKJSQsKGj1AkElsRKl7m6TtgqnII+aMcIWJ1PYVuYwdtqqqdvB/DQCo7hwlCnOPQExrLoomdlbL6YFgSE4ZSv0qkkLW9VxziZYCgsqAVNpsJpZ3gmkrhzYMIkWukhYlxZdJaj5p6nQ1XBkBvu4i08lKfeX4Iz+cSd5TgVtZTrwRbQJc42n0JXFDbdnMLH3XOl5B75ABJ+s7AcEzy0LHriNgeQMc/epp8xjMBfIFzLzyVfH4qXwvMiVczLgI1YfjsJxWseP2wpmMDLpzgGMlv5h5gMmKwUtS9zYM5C/JgWcY+cuHO4A+X6wrWMvMMZnMALDtkWaFxjtG9+WUgsfwGXPKzX5kCWZUkrYwP2pBE/VQHPiYnfeVeA975xvDoG7nfnOQYAhueq6ropMDzllB9gEwUZwczJ/AjqGJRs6uaCi14EouQD2BOQ/bIJXNeRPcKYAlvJ+Y9FwQUfHlHyRdzzLDwPBYSiXLMB4S3pwwwOwSZmKzaVCqrqWxNqTYI9J8+SoQczfo55KRgo5Ukc0hSP61q8TVvwx2BqedcK14T76PXuAn+MlfpiKTUtKKhbGk0buIf+k/PVCHDJ3YlvoioQzxTtpQVaevnPLYEYWzyrUQCqzPzvG8GdDpx1jS70Zi3+rltAVL3AZkMTenECs1AO+alx9SXQFGzp5QxgYeb0pUKbi3FP0rroohDuXOPKmWGA23KRrBygdWkpi3tOavuT7VrQk29S/OQcCC5K1aZKuWC6pMUexy34YBmh3GcBaE0k+7hO0RSE+wSFpZTYL1F1uBWnzE8KcBFCoPAoBrhcUHEdPZ+W0D7MUmpcigcsQFaqL0ExLQV+fv+PQvBbV7iOJgPmMGWKB0QgVKJU1YBrG3rbssrFjTKgt6K2FSaD05jSKwJUXCOQqAPQlYNs0zcfWFYrym9JPpSK5SrkZeXnfISgcQupRx1QERtrUAMKmgty8RCL1FLyJl1Gt67uA4kWONQUSVAOpqVE8q8OaMKZeCSU8WYYqPFWMTq5DpgI31/4bBSfvAyVrqqRYA6Gj/XLAe4WQiOdcDYGdU9T5wy9BQahuNwCD7KWZb8CT2BiMirqexqNRmG0JfBw4eLzzTjARs9GUXdNpfOqB5jnkL+OKdo4KewUtQBkUvVYFG+BPsN5cJ5Q2A8A+SWptiObb+N8rpwYMLebeIJJj+AuuZLCquUu4J5hr4rI2fwjnON0JGmGpQTCGw7yuHYrYjJcw9c8p3zNZuKNTLSRH2BmLrL5LI03TgLtEe+Qk68B8WYz3UqHb3TZ+pzFdQ3r9PjttleFJ0TzcAdMqfwm1joVv48wiErTHgl33jFKU/MreE//9Z2+dJlUZkZZ5Qnxkt1y4uxEbX6neDAsGeUiOiUt9vMvHpqQtu9xu3CcF9dxg+HpvD3P/V241PZd3+7FGXRxGVImhPcojLzPzbT3Mnj7OekXbPvuy1GQ/FufS8wpT9Pu9T6CDlnP9oL8fmMR3eYHuUf688BPnfYzSnGdiRd2+xShN/SmT9aHZzuwKM38HWZj2n/O2YLBm7oUySFGbvtV2ClrBXbbt8NT/Bh3fcYw01qw+6PAXhL2aDZImNCrrz5vqzPvv0g6cmBaraOTy7KZUfiw3nw639tLf9CdCh0dm/Yhs8nrZLBd750OuRwWjZzp5W9Dm8Rydtk/Y89y2ldn+P047oOXm3aisjjRy6PEmw5Hj//G2qK30Wg0Go1Go9FoNBqNRqPRaDQajUaj0Wg0Go1Go9FoNP8B/gMhUaRwwW4G7QAAAABJRU5ErkJggg==" 
            alt="QR Code para conexão do WhatsApp"
            className="max-w-full max-h-full"
          />
          {connectionStatus === "connecting" && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <Loader2 className="h-10 w-10 text-lingerie-500 animate-spin" />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Escaneie este código QR com seu WhatsApp para conectar sua conta
      </p>
      
      <div className="flex gap-2 mt-6">
        <Button variant="outline" onClick={handleRefreshQrCode}>
          <Refresh className="h-4 w-4 mr-2" />
          Atualizar QR Code
        </Button>
        <Button onClick={handleScanComplete}>
          <Check className="h-4 w-4 mr-2" />
          Simular Conexão
        </Button>
      </div>
    </div>
  );
  
  const renderConnectionBanner = () => {
    if (connectionStatus === "connected") {
      return (
        <Alert className="mb-6 bg-green-50 border-green-200">
          <WhatsappIcon className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-600">WhatsApp Conectado</AlertTitle>
          <AlertDescription className="text-green-700">
            Seu WhatsApp está conectado e pronto para enviar mensagens.
          </AlertDescription>
          <Button 
            variant="outline"
            size="sm" 
            className="ml-auto border-green-300 text-green-700 hover:bg-green-100 hover:text-green-800"
            onClick={handleConnect}
          >
            <PhoneOff className="h-4 w-4 mr-2" />
            Desconectar
          </Button>
        </Alert>
      );
    } else if (connectionStatus === "connecting") {
      return (
        <Alert className="mb-6 bg-amber-50 border-amber-200">
          <Loader2 className="h-4 w-4 text-amber-600 animate-spin" />
          <AlertTitle className="text-amber-600">Conectando WhatsApp</AlertTitle>
          <AlertDescription className="text-amber-700">
            Escaneie o QR code com seu WhatsApp para concluir a conexão.
          </AlertDescription>
        </Alert>
      );
    } else {
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
            onClick={handleConnect}
          >
            <QrCode className="h-4 w-4 mr-2" />
            Conectar WhatsApp
          </Button>
        </Alert>
      );
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
            {/* QR Code Dialog */}
            <Dialog open={showQrCode && connectionStatus === "connecting"} onOpenChange={setShowQrCode}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Conectar ao WhatsApp</DialogTitle>
                  <DialogDescription>
                    Escaneie o código QR com seu WhatsApp para conectar sua conta
                  </DialogDescription>
                </DialogHeader>
                {renderQrCode()}
              </DialogContent>
            </Dialog>
            
            {/* Connection Status Banner */}
            {renderConnectionBanner()}
            
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
                      <Button disabled={connectionStatus !== "connected"}>
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
                          disabled={!newMessage.content || selectedCustomers.length === 0 || connectionStatus !== "connected"}
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
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" disabled={connectionStatus !== "connected"}>
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
                      
                      <Button disabled={connectionStatus !== "connected"}>
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
                                <Button variant="ghost" size="sm" disabled={connectionStatus !== "connected"}>
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
                            <Button variant="outline" size="sm" disabled={connectionStatus !== "connected"}>Editar</Button>
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
                            <Button variant="outline" size="sm" disabled={connectionStatus !== "connected"}>Editar</Button>
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
                            <Button variant="outline" size="sm" disabled={connectionStatus !== "connected"}>Editar</Button>
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
                            <Button variant="outline" size="sm" disabled={connectionStatus !== "connected"}>Editar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button disabled={connectionStatus !== "connected"}>
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
