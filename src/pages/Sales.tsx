import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Calendar, Pencil, Search, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface Sale {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  total: number;
  status: "Pendente" | "Pago" | "Enviado" | "Entregue" | "Cancelado";
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
  marketplace: string;
}

const formSchema = z.object({
  orderNumber: z.string().min(1, "Número do pedido é obrigatório"),
  customer: z.string().min(1, "Nome do cliente é obrigatório"),
  date: z.string().min(1, "Data é obrigatória"),
  total: z.coerce.number().min(0, "Total deve ser maior ou igual a zero"),
  status: z.enum(["Pendente", "Pago", "Enviado", "Entregue", "Cancelado"]),
  marketplace: z.string().min(1, "Marketplace é obrigatório"),
  items: z.array(
    z.object({
      product: z.string().min(1, "Nome do produto é obrigatório"),
      quantity: z.coerce.number().min(1, "Quantidade deve ser pelo menos 1"),
      price: z.coerce.number().min(0, "Preço deve ser maior ou igual a zero"),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

const Sales = () => {
  useEffect(() => {
    document.title = "Vendas | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  // Resetting all sales data to empty array
  const [sales, setSales] = useState<Sale[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [saleToEdit, setSaleToEdit] = useState<Sale | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderNumber: "",
      customer: "",
      date: "",
      total: 0,
      status: "Pendente" as const,
      marketplace: "",
      items: [
        {
          product: "",
          quantity: 1,
          price: 0,
        },
      ],
    },
  });

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === "all" ? true : sale.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pendente": return "bg-amber-100 text-amber-800";
      case "Pago": return "bg-blue-100 text-blue-800";
      case "Enviado": return "bg-purple-100 text-purple-800";
      case "Entregue": return "bg-green-100 text-green-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Function to get total revenue - now returns 0
  const getTotalRevenue = () => {
    return "0,00";
  };

  // Function to get pending orders - now returns 0
  const getPendingOrders = () => {
    return 0;
  };

  // Function to get shipped orders - now returns 0
  const getShippedOrders = () => {
    return 0;
  };

  const updateOrderStatus = (id: string, newStatus: "Pendente" | "Pago" | "Enviado" | "Entregue" | "Cancelado") => {
    setSales(sales.map(sale => 
      sale.id === id ? { ...sale, status: newStatus } : sale
    ));
    toast.success(`Status do pedido ${id} atualizado para ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    setSaleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (saleToDelete) {
      const orderNumber = sales.find(sale => sale.id === saleToDelete)?.orderNumber;
      setSales(sales.filter(sale => sale.id !== saleToDelete));
      setDeleteDialogOpen(false);
      setSaleToDelete(null);
      toast.success(`Pedido ${orderNumber} excluído com sucesso`);
    }
  };

  const openEditDialog = (sale: Sale) => {
    setSaleToEdit(sale);
    form.reset({
      orderNumber: sale.orderNumber,
      customer: sale.customer,
      date: sale.date,
      total: sale.total,
      status: sale.status,
      marketplace: sale.marketplace,
      items: sale.items,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = (values: FormValues) => {
    if (saleToEdit) {
      // Ensure items have the correct non-optional type
      const updatedItems = values.items.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price
      }));
      
      const updatedSales = sales.map((sale) =>
        sale.id === saleToEdit.id
          ? {
              ...sale,
              ...values,
              items: updatedItems,
              total: updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
            }
          : sale
      );
      
      setSales(updatedSales);
      setEditDialogOpen(false);
      setSaleToEdit(null);
      toast.success(`Pedido ${values.orderNumber} atualizado com sucesso`);
    }
  };

  const addItemField = () => {
    const currentItems = form.getValues("items");
    form.setValue("items", [
      ...currentItems,
      { product: "", quantity: 1, price: 0 },
    ]);
  };

  const removeItemField = (index: number) => {
    const currentItems = form.getValues("items");
    if (currentItems.length > 1) {
      form.setValue(
        "items",
        currentItems.filter((_, i) => i !== index)
      );
    }
  };

  const renderItemFields = () => {
    return form.watch("items").map((_, index) => (
      <div key={index} className="space-y-4 p-4 border rounded-md">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Item {index + 1}</h4>
          {form.watch("items").length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeItemField(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name={`items.${index}.product`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Produto</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name={`items.${index}.quantity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseInt(e.target.value) || 1);
                      calculateTotal();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`items.${index}.price`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço Unit.</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    {...field}
                    onChange={(e) => {
                      field.onChange(parseFloat(e.target.value) || 0);
                      calculateTotal();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    ));
  };

  const calculateTotal = () => {
    const items = form.getValues("items");
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    form.setValue("total", total);
  };

  const renderSalesTable = (filteredData: Sale[]) => (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pedido</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Marketplace</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((sale) => (
              <TableRow key={sale.id}>
                <TableCell className="font-medium">{sale.orderNumber}</TableCell>
                <TableCell>{sale.customer}</TableCell>
                <TableCell>{sale.date}</TableCell>
                <TableCell>R$ {sale.total.toFixed(2)}</TableCell>
                <TableCell>{sale.marketplace}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(sale.status)} variant="outline">
                    {sale.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Select 
                      defaultValue={sale.status} 
                      onValueChange={(value) => updateOrderStatus(sale.id, value as any)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pendente">Pendente</SelectItem>
                        <SelectItem value="Pago">Pago</SelectItem>
                        <SelectItem value="Enviado">Enviado</SelectItem>
                        <SelectItem value="Entregue">Entregue</SelectItem>
                        <SelectItem value="Cancelado">Cancelado</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => openEditDialog(sale)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleDelete(sale.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ShoppingCart className="h-10 w-10 mb-2" />
                  <p>Nenhum pedido encontrado</p>
                  {(searchQuery || filterStatus !== "all") && <p className="text-sm">Tente outros filtros</p>}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Vendas" 
            subtitle="Gerencie suas vendas e acompanhe seus pedidos." 
          />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {getTotalRevenue()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  +0% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Pedidos Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getPendingOrders()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Necessitam de atenção
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Em Transporte
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{getShippedOrders()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Pedidos em trânsito
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="all">Todos os Pedidos</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                  <TabsTrigger value="shipped">Enviados</TabsTrigger>
                </TabsList>
                
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar pedidos..."
                      className="pl-8 w-[200px] md:w-[300px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Enviado">Enviado</SelectItem>
                      <SelectItem value="Entregue">Entregue</SelectItem>
                      <SelectItem value="Cancelado">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                {renderSalesTable(filteredSales)}
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
                {renderSalesTable(filteredSales.filter(s => s.status === "Pendente"))}
              </TabsContent>
              
              <TabsContent value="shipped" className="mt-0">
                {renderSalesTable(filteredSales.filter(s => s.status === "Enviado"))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente o pedido do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Sale Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Pedido</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias ao pedido abaixo.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número do Pedido</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="customer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cliente</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="marketplace"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Marketplace</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o marketplace" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Site Próprio">Site Próprio</SelectItem>
                          <SelectItem value="Shopee">Shopee</SelectItem>
                          <SelectItem value="Mercado Livre">Mercado Livre</SelectItem>
                          <SelectItem value="Magazine Luiza">Magazine Luiza</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Pago">Pago</SelectItem>
                          <SelectItem value="Enviado">Enviado</SelectItem>
                          <SelectItem value="Entregue">Entregue</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="total"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total (R$)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step="0.01" 
                          readOnly 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Itens do Pedido</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addItemField}
                  >
                    Adicionar Item
                  </Button>
                </div>
                <div className="space-y-3">
                  {renderItemFields()}
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
                <Button type="submit">Salvar Alterações</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sales;
