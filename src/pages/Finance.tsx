
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Jan', receita: 4500, lucro: 1800 },
  { name: 'Fev', receita: 5200, lucro: 2100 },
  { name: 'Mar', receita: 3800, lucro: 1500 },
  { name: 'Abr', receita: 6500, lucro: 2600 },
  { name: 'Mai', receita: 5800, lucro: 2300 },
  { name: 'Jun', receita: 6200, lucro: 2500 },
  { name: 'Jul', receita: 7100, lucro: 2800 },
];

const expenseData = [
  { categoria: 'Produtos', valor: 8500 },
  { categoria: 'Marketing', valor: 1200 },
  { categoria: 'Embalagens', valor: 800 },
  { categoria: 'Taxas Market', valor: 1500 },
  { categoria: 'Entregas', valor: 1100 },
];

const salesByCategoryData = [
  { categoria: 'Sutiãs', valor: 12500 },
  { categoria: 'Calcinhas', valor: 9800 },
  { categoria: 'Conjuntos', valor: 15200 },
  { categoria: 'Lingeries', valor: 7300 },
  { categoria: 'Acessórios', valor: 2100 },
];

const Finance = () => {
  useEffect(() => {
    document.title = "Finanças | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Finanças" 
            subtitle="Gerencie suas receitas e despesas" 
          />
          
          <div className="mt-8">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="revenue">Receitas</TabsTrigger>
                <TabsTrigger value="expenses">Despesas</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="hover-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Receitas x Lucro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={revenueData}
                            margin={{
                              top: 10,
                              right: 20,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis 
                              tick={{ fontSize: 12 }}
                              tickFormatter={(value) => `R$${value}`}
                            />
                            <Tooltip formatter={(value) => [`R$ ${value}`, undefined]} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="receita"
                              name="Receita"
                              stroke="#EC4899"
                              strokeWidth={2}
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type="monotone"
                              dataKey="lucro"
                              name="Lucro"
                              stroke="#8B5CF6"
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-medium">Despesas por Categoria</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={expenseData}
                            margin={{
                              top: 10,
                              right: 20,
                              left: 20,
                              bottom: 5,
                            }}
                            layout="vertical"
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis type="number" tick={{ fontSize: 12 }} />
                            <YAxis 
                              dataKey="categoria" 
                              type="category" 
                              tick={{ fontSize: 12 }}
                              width={100}
                            />
                            <Tooltip formatter={(value) => [`R$ ${value}`, undefined]} />
                            <Bar dataKey="valor" name="Valor" fill="#EC4899" radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="hover-card mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Vendas por Categoria de Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={salesByCategoryData}
                          margin={{
                            top: 10,
                            right: 20,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="categoria" tick={{ fontSize: 12 }} />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => `R$${value}`}
                          />
                          <Tooltip formatter={(value) => [`R$ ${value}`, undefined]} />
                          <Bar dataKey="valor" name="Valor" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise de Receitas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Detalhamento completo de receitas ainda será implementado nesta seção.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expenses">
                <Card>
                  <CardHeader>
                    <CardTitle>Controle de Despesas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Controle detalhado de despesas será implementado nesta seção.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
