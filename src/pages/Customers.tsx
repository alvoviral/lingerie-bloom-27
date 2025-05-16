
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { UserPlus, Search, ChevronDown, UserSearch, Tag, ShoppingBag } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define o schema de validação para o formulário de cliente
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres" }),
  segment: z.string(),
  notes: z.string().optional()
});

type CustomerFormValues = z.infer<typeof customerFormSchema>;

// Interface para o tipo de cliente
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  segment: string;
  totalSpent: number;
  lastPurchase: string;
  notes?: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock de dados de clientes iniciais
  useEffect(() => {
    const initialCustomers: Customer[] = [
      {
        id: "1",
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(11) 98765-4321",
        address: "Av. Paulista, 1000, São Paulo, SP",
        segment: "VIP",
        totalSpent: 2500.50,
        lastPurchase: "2024-05-02",
        notes: "Cliente fidelizada, prefere peças em tons pastéis."
      },
      {
        id: "2",
        name: "João Santos",
        email: "joao.santos@email.com",
        phone: "(11) 91234-5678",
        address: "Rua Augusta, 500, São Paulo, SP",
        segment: "Regular",
        totalSpent: 850.00,
        lastPurchase: "2024-04-25",
        notes: "Costuma comprar presentes para esposa."
      },
      {
        id: "3",
        name: "Ana Oliveira",
        email: "ana.oliveira@email.com",
        phone: "(11) 99876-5432",
        address: "Rua Oscar Freire, 200, São Paulo, SP",
        segment: "Premium",
        totalSpent: 1350.75,
        lastPurchase: "2024-05-10",
        notes: "Prefere ser contatada por WhatsApp."
      }
    ];

    setCustomers(initialCustomers);
    document.title = "Clientes | BelleCharm";
  }, []);

  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      segment: "Regular",
      notes: ""
    }
  });

  function onSubmit(data: CustomerFormValues) {
    // Corrigido: Garantir que todos os campos obrigatórios sejam incluídos
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      segment: data.segment,
      notes: data.notes,
      totalSpent: 0,
      lastPurchase: "Nenhuma compra"
    };

    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
    form.reset();
    toast({
      title: "Cliente adicionado",
      description: `${data.name} foi adicionado(a) com sucesso à sua base de clientes.`
    });
  }

  // Filtra os clientes com base na busca e no filtro ativo
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && customer.segment.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Clientes" 
            subtitle="Gerencie seu relacionamento com clientes." 
          />
          
          <div className="mt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="relative mb-4 md:mb-0 md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Buscar clientes..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <Select 
                  value={activeFilter} 
                  onValueChange={setActiveFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrar segmento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os segmentos</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Novo">Novo</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <UserPlus className="mr-2" size={18} />
                  Novo Cliente
                </Button>
              </div>
            </div>

            <Tabs defaultValue="lista" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
                <TabsTrigger value="segmentacao">Segmentação</TabsTrigger>
                <TabsTrigger value="historico">Histórico de Compras</TabsTrigger>
              </TabsList>

              <TabsContent value="lista" className="space-y-6">
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Contato</TableHead>
                          <TableHead>Segmento</TableHead>
                          <TableHead>Total Gasto</TableHead>
                          <TableHead>Última Compra</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.length > 0 ? (
                          filteredCustomers.map((customer) => (
                            <TableRow key={customer.id}>
                              <TableCell>
                                <div className="font-medium">{customer.name}</div>
                              </TableCell>
                              <TableCell>
                                <div>{customer.email}</div>
                                <div className="text-sm text-muted-foreground">{customer.phone}</div>
                              </TableCell>
                              <TableCell>
                                <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-10"
                                     style={{ 
                                       backgroundColor: 
                                         customer.segment === "VIP" ? "rgba(220, 38, 38, 0.1)" : 
                                         customer.segment === "Premium" ? "rgba(79, 70, 229, 0.1)" : 
                                         customer.segment === "Regular" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                                       color: 
                                         customer.segment === "VIP" ? "rgb(220, 38, 38)" : 
                                         customer.segment === "Premium" ? "rgb(79, 70, 229)" : 
                                         customer.segment === "Regular" ? "rgb(16, 185, 129)" : "rgb(245, 158, 11)"
                                     }}>
                                  {customer.segment}
                                </div>
                              </TableCell>
                              <TableCell>
                                R$ {customer.totalSpent.toFixed(2)}
                              </TableCell>
                              <TableCell>
                                {customer.lastPurchase === "Nenhuma compra" 
                                  ? customer.lastPurchase 
                                  : new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon">
                                  <UserSearch size={18} />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                              Nenhum cliente encontrado
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="segmentacao">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Tag className="text-red-600" size={18} />
                      </div>
                      <h3 className="text-lg font-medium">VIP</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clientes com alta fidelidade e alto valor de compra.
                    </p>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">
                        {customers.filter(c => c.segment === "VIP").length}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">clientes</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Tag className="text-indigo-600" size={18} />
                      </div>
                      <h3 className="text-lg font-medium">Premium</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clientes recorrentes com valor médio de compra.
                    </p>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">
                        {customers.filter(c => c.segment === "Premium").length}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">clientes</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Tag className="text-green-600" size={18} />
                      </div>
                      <h3 className="text-lg font-medium">Regular</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clientes ocasionais com potencial para crescer.
                    </p>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">
                        {customers.filter(c => c.segment === "Regular").length}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">clientes</span>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border bg-card p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                        <Tag className="text-amber-600" size={18} />
                      </div>
                      <h3 className="text-lg font-medium">Novo</h3>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Clientes recentes ainda em fase de avaliação.
                    </p>
                    <div className="mt-4">
                      <span className="text-2xl font-bold">
                        {customers.filter(c => c.segment === "Novo").length}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">clientes</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="historico">
                <div className="rounded-lg border bg-card p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Selecione um cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os clientes</SelectItem>
                        {customers.map(customer => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    {customers.slice(0, 3).map((customer) => (
                      <Collapsible key={customer.id} className="border rounded-lg">
                        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                              <ShoppingBag size={16} />
                            </div>
                            <div>
                              <div className="font-medium">{customer.name}</div>
                              <div className="text-sm text-muted-foreground">
                                Total: R$ {customer.totalSpent.toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <ChevronDown size={16} className="text-muted-foreground" />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="p-4 pt-0 border-t">
                          <div className="text-sm">
                            <div className="mb-2">
                              <span className="font-medium">Última compra:</span> {customer.lastPurchase === "Nenhuma compra" ? customer.lastPurchase : new Date(customer.lastPurchase).toLocaleDateString('pt-BR')}
                            </div>
                            <div>
                              <span className="font-medium">Observações:</span> {customer.notes || "Sem observações"}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro de Cliente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <Input placeholder="(00) 00000-0000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Endereço</FormLabel>
                    <FormControl>
                      <Input placeholder="Endereço completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Segmento</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um segmento" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="VIP">VIP</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Regular">Regular</SelectItem>
                        <SelectItem value="Novo">Novo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Observações sobre o cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Adicionar Cliente</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
