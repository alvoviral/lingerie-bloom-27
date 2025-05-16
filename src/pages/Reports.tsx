
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  Calendar, 
  ShoppingCart, 
  Package, 
  DollarSign,
  TrendingUp,
  Clock
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Reset all sample data for reports
const salesData = [
  { month: 'Jan', value: 0 },
  { month: 'Fev', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Abr', value: 0 },
  { month: 'Mai', value: 0 },
  { month: 'Jun', value: 0 },
  { month: 'Jul', value: 0 },
  { month: 'Ago', value: 0 },
  { month: 'Set', value: 0 },
  { month: 'Out', value: 0 },
  { month: 'Nov', value: 0 },
  { month: 'Dez', value: 0 },
];

const categoryData = [
  { name: 'Lingerie', value: 0 },
  { name: 'Roupas íntimas', value: 0 },
  { name: 'Sleepwear', value: 0 },
  { name: 'Acessórios', value: 0 },
  { name: 'Outros', value: 0 },
];

const marketplaceData = [
  { name: 'Loja própria', value: 0 },
  { name: 'Shopee', value: 0 },
  { name: 'Mercado Livre', value: 0 },
  { name: 'Magazine Luiza', value: 0 },
  { name: 'Casas Bahia', value: 0 },
];

const inventoryData = [
  { month: 'Jan', estoque: 0, vendas: 0 },
  { month: 'Fev', estoque: 0, vendas: 0 },
  { month: 'Mar', estoque: 0, vendas: 0 },
  { month: 'Abr', estoque: 0, vendas: 0 },
  { month: 'Mai', estoque: 0, vendas: 0 },
  { month: 'Jun', estoque: 0, vendas: 0 },
  { month: 'Jul', estoque: 0, vendas: 0 },
  { month: 'Ago', estoque: 0, vendas: 0 },
  { month: 'Set', value: 0, vendas: 0 },
  { month: 'Out', estoque: 0, vendas: 0 },
  { month: 'Nov', estoque: 0, vendas: 0 },
  { month: 'Dez', estoque: 0, vendas: 0 },
];

const COLORS = ['#ec4899', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];

const Reports = () => {
  const [timeframe, setTimeframe] = useState<string>("anual");
  const isMobile = useIsMobile();
  
  useEffect(() => {
    document.title = "Relatórios | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 pb-20">
          <Header 
            title="Relatórios" 
            subtitle="Analise dados e métricas do seu negócio." 
          />
          
          <div className="mt-8 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Visão Geral do Negócio</h3>
              <div className="flex items-center">
                <span className="mr-2 text-sm text-muted-foreground">Período:</span>
                <Select defaultValue={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mensal">Mensal</SelectItem>
                    <SelectItem value="trimestral">Trimestral</SelectItem>
                    <SelectItem value="semestral">Semestral</SelectItem>
                    <SelectItem value="anual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Vendas Realizadas"
                value="0"
                icon={ShoppingCart}
                trend={0}
                description="Total do último período"
                iconClassName="bg-lavender-100 dark:bg-lavender-900/30"
              />
              <StatCard
                title="Faturamento"
                value="R$ 0,00"
                icon={DollarSign}
                trend={0}
                description="Total do último período"
                iconClassName="bg-lingerie-100 dark:bg-lingerie-900/30"
              />
              <StatCard
                title="Produtos Vendidos"
                value="0"
                icon={Package}
                trend={0}
                description="Total do último período"
                iconClassName="bg-cream-100 dark:bg-cream-900/30"
              />
              <StatCard
                title="Ticket Médio"
                value="R$ 0,00"
                icon={TrendingUp}
                trend={0}
                description="Média do último período"
                iconClassName="bg-lingerie-100 dark:bg-lingerie-900/30"
              />
            </div>
            
            <Tabs defaultValue="vendas" className="mt-6">
              <TabsList className="flex overflow-x-auto pb-1 mb-1 md:pb-0 md:mb-0">
                <TabsTrigger value="vendas">Vendas</TabsTrigger>
                <TabsTrigger value="categorias">Categorias</TabsTrigger>
                <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
                <TabsTrigger value="estoque">Estoque</TabsTrigger>
              </TabsList>
              
              <TabsContent value="vendas" className="mt-4">
                <Card className="mb-24">
                  <CardHeader className="pb-0">
                    <CardTitle>Gráfico de Vendas</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    {/* Fixed height for chart with complete containment */}
                    <div className={`${isMobile ? 'h-48' : 'h-64'} w-full relative`}>
                      <ChartContainer
                        config={{
                          sales: { label: "Vendas", theme: { light: "#ec4899", dark: "#ec4899" } },
                          tooltip: { theme: { light: "#ec4899", dark: "#ec4899" } },
                        }}
                      >
                        <LineChart 
                          data={salesData}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis 
                            tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                            tick={{ fontSize: 10 }}
                            ticks={[0, 1]}
                          />
                          <Tooltip 
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                return (
                                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="flex flex-col">
                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                          Mês
                                        </span>
                                        <span className="font-bold text-foreground">
                                          {payload[0].payload.month}
                                        </span>
                                      </div>
                                      <div className="flex flex-col">
                                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                                          Valor
                                        </span>
                                        <span className="font-bold text-foreground">
                                          R$ {payload[0].value?.toLocaleString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Legend wrapperStyle={{ paddingTop: 5, fontSize: 10, bottom: -10 }} />
                          <Line
                            type="monotone"
                            dataKey="value"
                            name="Vendas (R$)"
                            stroke="#ec4899"
                            strokeWidth={2}
                            dot={{ r: 2, strokeWidth: 2 }}
                            activeDot={{ r: 4, stroke: "#ec4899", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Adjusted other tab content heights similarly */}
              <TabsContent value="categorias" className="mt-4">
                <Card className="mb-24">
                  <CardHeader className="pb-0">
                    <CardTitle>Vendas por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <div className={`${isMobile ? 'block' : 'flex'} items-center`}>
                      <div className={`${isMobile ? 'w-full h-48' : 'w-1/2 h-64'}`}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart 
                            margin={{
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <Pie
                              data={categoryData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={isMobile ? 50 : 60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {categoryData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Porcentagem']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className={`${isMobile ? 'w-full mt-2' : 'w-1/2'}`}>
                        <h4 className="text-sm font-medium mb-2">Distribuição por categorias</h4>
                        <div className="space-y-1">
                          {categoryData.map((item, index) => (
                            <div key={`legend-${index}`} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">{item.name}</span>
                              </div>
                              <span className="text-sm font-medium">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="marketplaces" className="mt-4">
                <Card className="mb-24">
                  <CardHeader className="pb-0">
                    <CardTitle>Vendas por Marketplace</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <div className={`${isMobile ? 'block' : 'flex'} items-center`}>
                      <div className={`${isMobile ? 'w-full h-48' : 'w-1/2 h-64'}`}>
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart
                            margin={{
                              top: 0,
                              right: 0,
                              left: 0,
                              bottom: 0,
                            }}
                          >
                            <Pie
                              data={marketplaceData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={isMobile ? 50 : 60}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {marketplaceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value}%`, 'Porcentagem']}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className={`${isMobile ? 'w-full mt-2' : 'w-1/2'}`}>
                        <h4 className="text-sm font-medium mb-2">Distribuição por canais de venda</h4>
                        <div className="space-y-1">
                          {marketplaceData.map((item, index) => (
                            <div key={`legend-${index}`} className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div 
                                  className="w-3 h-3 rounded-full mr-2" 
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                ></div>
                                <span className="text-sm">{item.name}</span>
                              </div>
                              <span className="text-sm font-medium">{item.value}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="estoque" className="mt-4">
                <Card className="mb-24">
                  <CardHeader className="pb-0">
                    <CardTitle>Estoque vs. Vendas</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-8">
                    {/* Fixed height for chart with complete containment */}
                    <div className={`${isMobile ? 'h-48' : 'h-64'} w-full relative`}>
                      <ChartContainer
                        config={{
                          estoque: { label: "Estoque", theme: { light: "#8b5cf6", dark: "#8b5cf6" } },
                          vendas: { label: "Vendas", theme: { light: "#ec4899", dark: "#ec4899" } },
                        }}
                      >
                        <BarChart 
                          data={inventoryData}
                          margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 30,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                          <YAxis 
                            tick={{ fontSize: 10 }}
                            ticks={[0, 1]}
                          />
                          <Tooltip />
                          <Legend wrapperStyle={{ paddingTop: 5, fontSize: 10, bottom: -10 }} />
                          <Bar dataKey="estoque" name="Estoque (un)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="vendas" name="Vendas (un)" fill="#ec4899" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-10">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Relatórios Agendados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 hover:bg-accent/50">
                      <h4 className="font-medium">Relatório Mensal de Vendas</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enviado todo dia 1 do mês - Próximo: 01/06/2025
                      </p>
                    </div>
                    <div className="border rounded-lg p-3 hover:bg-accent/50">
                      <h4 className="font-medium">Análise de Estoque Semanal</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enviado toda segunda-feira - Próximo: 19/05/2025
                      </p>
                    </div>
                    <div className="border rounded-lg p-3 hover:bg-accent/50">
                      <h4 className="font-medium">Desempenho de Marketing</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enviado dia 15 do mês - Próximo: 15/05/2025
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Relatórios Disponíveis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <h4 className="font-medium">Análise de Lucratividade</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Comparativo de custos e receitas por produto
                      </p>
                    </div>
                    <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <h4 className="font-medium">Desempenho de Vendedores</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Métricas individuais da equipe de vendas
                      </p>
                    </div>
                    <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
                      <h4 className="font-medium">Retenção de Clientes</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Taxa de retorno e fidelidade dos clientes
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
