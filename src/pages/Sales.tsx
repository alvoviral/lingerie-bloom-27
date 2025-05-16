
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
import { Calendar, Search, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

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

const Sales = () => {
  useEffect(() => {
    document.title = "Vendas | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [sales, setSales] = useState<Sale[]>([
    {
      id: "1",
      orderNumber: "BC-2025-0001",
      customer: "Carolina Silva",
      date: "2025-05-15",
      total: 189.80,
      status: "Enviado",
      items: [
        { product: "Conjunto Renda Floral (M/Preto)", quantity: 1, price: 129.90 },
        { product: "Calcinha Fio Dental Renda (M/Vermelho)", quantity: 1, price: 49.90 },
      ],
      marketplace: "Site Próprio"
    },
    {
      id: "2",
      orderNumber: "BC-2025-0002",
      customer: "Fernanda Oliveira",
      date: "2025-05-14",
      total: 89.90,
      status: "Pago",
      items: [
        { product: "Sutiã Push Up Delicado (42/Rosa)", quantity: 1, price: 89.90 }
      ],
      marketplace: "Shopee"
    },
    {
      id: "3",
      orderNumber: "BC-2025-0003",
      customer: "Amanda Costa",
      date: "2025-05-14",
      total: 279.80,
      status: "Pendente",
      items: [
        { product: "Body Transparente Bordado (G/Branco)", quantity: 1, price: 159.90 },
        { product: "Camisola Cetim Luxo (P/Azul Céu)", quantity: 1, price: 119.90 }
      ],
      marketplace: "Mercado Livre"
    },
    {
      id: "4",
      orderNumber: "BC-2025-0004",
      customer: "Mariana Ribeiro",
      date: "2025-05-13",
      total: 159.90,
      status: "Entregue",
      items: [
        { product: "Body Transparente Bordado (G/Branco)", quantity: 1, price: 159.90 }
      ],
      marketplace: "Site Próprio"
    },
    {
      id: "5",
      orderNumber: "BC-2025-0005",
      customer: "Luiza Mendes",
      date: "2025-05-10",
      total: 49.90,
      status: "Cancelado",
      items: [
        { product: "Calcinha Fio Dental Renda (M/Vermelho)", quantity: 1, price: 49.90 }
      ],
      marketplace: "Shopee"
    }
  ]);

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

  const getTotalRevenue = () => {
    return sales
      .filter(sale => sale.status !== "Cancelado")
      .reduce((acc, sale) => acc + sale.total, 0)
      .toFixed(2);
  };

  const getPendingOrders = () => {
    return sales.filter(sale => sale.status === "Pendente").length;
  };

  const getShippedOrders = () => {
    return sales.filter(sale => sale.status === "Enviado").length;
  };

  const updateOrderStatus = (id: string, newStatus: "Pendente" | "Pago" | "Enviado" | "Entregue" | "Cancelado") => {
    setSales(sales.map(sale => 
      sale.id === id ? { ...sale, status: newStatus } : sale
    ));
    toast.success(`Status do pedido ${id} atualizado para ${newStatus}`);
  };

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
                  +12% em relação ao mês anterior
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
                      {filteredSales.length > 0 ? (
                        filteredSales.map((sale) => (
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
              </TabsContent>
              
              <TabsContent value="pending" className="mt-0">
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
                      {filteredSales.filter(s => s.status === "Pendente").length > 0 ? (
                        filteredSales
                          .filter(s => s.status === "Pendente")
                          .map((sale) => (
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
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <ShoppingCart className="h-10 w-10 mb-2" />
                              <p>Nenhum pedido pendente encontrado</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="shipped" className="mt-0">
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
                      {filteredSales.filter(s => s.status === "Enviado").length > 0 ? (
                        filteredSales
                          .filter(s => s.status === "Enviado")
                          .map((sale) => (
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
                              </TableCell>
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-10">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <ShoppingCart className="h-10 w-10 mb-2" />
                              <p>Nenhum pedido enviado encontrado</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
