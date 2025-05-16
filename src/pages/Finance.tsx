
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { ArrowUp, ArrowDown, Receipt, Wallet } from "lucide-react";

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

// Dados para a aba de Receitas
const revenueTransactions = [
  { id: '1', date: '15/05/2025', description: 'Venda Online #1254', amount: 250.00, category: 'Loja Online' },
  { id: '2', date: '14/05/2025', description: 'Venda Instagram #768', amount: 189.90, category: 'Instagram' },
  { id: '3', date: '12/05/2025', description: 'Venda Marketplace #4521', amount: 320.50, category: 'Marketplace' },
  { id: '4', date: '10/05/2025', description: 'Venda Varejo #121', amount: 450.00, category: 'Loja Física' },
  { id: '5', date: '08/05/2025', description: 'Venda Online #1242', amount: 275.00, category: 'Loja Online' }
];

const revenueCategories = [
  { name: 'Loja Online', value: 2850, color: '#EC4899' },
  { name: 'Instagram', value: 1890, color: '#8B5CF6' },
  { name: 'Marketplace', value: 3250, color: '#3B82F6' },
  { name: 'Loja Física', value: 2100, color: '#10B981' }
];

// Dados para a aba de Despesas
const expenseTransactions = [
  { id: '1', date: '16/05/2025', description: 'Compra de Estoque', amount: 1200.00, category: 'Produtos' },
  { id: '2', date: '15/05/2025', description: 'Anúncios Facebook', amount: 350.00, category: 'Marketing' },
  { id: '3', date: '12/05/2025', description: 'Embalagens Premium', amount: 180.50, category: 'Embalagens' },
  { id: '4', date: '10/05/2025', description: 'Comissão Shopee', amount: 120.00, category: 'Taxas Market' },
  { id: '5', date: '08/05/2025', description: 'Serviço de Entrega', amount: 95.00, category: 'Entregas' }
];

const Finance = () => {
  useEffect(() => {
    document.title = "Finanças | BelleCharm";
  }, []);

  // Estados para formulário de nova receita
  const [newRevenue, setNewRevenue] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Loja Online"
  });

  // Estados para formulário de nova despesa
  const [newExpense, setNewExpense] = useState({
    date: "",
    description: "",
    amount: "",
    category: "Produtos"
  });

  // Estados para transações
  const [revenues, setRevenues] = useState(revenueTransactions);
  const [expenses, setExpenses] = useState(expenseTransactions);

  // Manipuladores para nova receita
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRevenue({
      ...newRevenue,
      [e.target.name]: e.target.value
    });
  };

  const handleAddRevenue = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: `${revenues.length + 1}`,
      date: newRevenue.date,
      description: newRevenue.description,
      amount: parseFloat(newRevenue.amount),
      category: newRevenue.category
    };
    setRevenues([newItem, ...revenues]);
    setNewRevenue({
      date: "",
      description: "",
      amount: "",
      category: "Loja Online"
    });
  };

  // Manipuladores para nova despesa
  const handleExpenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({
      ...newExpense,
      [e.target.name]: e.target.value
    });
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: `${expenses.length + 1}`,
      date: newExpense.date,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category
    };
    setExpenses([newItem, ...expenses]);
    setNewExpense({
      date: "",
      description: "",
      amount: "",
      category: "Produtos"
    });
  };

  // Calculos de totais
  const totalRevenue = revenues.reduce((sum, item) => sum + item.amount, 0);
  const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">Análise de Receitas</CardTitle>
                        <div className="flex items-center text-sm font-medium text-muted-foreground">
                          <span className="flex items-center mr-2 text-emerald-500">
                            <ArrowUp className="w-4 h-4 mr-1" />
                            12%
                          </span>
                          vs. mês anterior
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueCategories}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <YAxis 
                                tick={{ fontSize: 12 }}
                                tickFormatter={(value) => `R$${value}`}
                              />
                              <Tooltip formatter={(value) => [`R$ ${value}`, undefined]} />
                              <Bar dataKey="value" name="Valor" fill="#EC4899" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-6">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {revenues.map((revenue) => (
                                <TableRow key={revenue.id}>
                                  <TableCell>{revenue.date}</TableCell>
                                  <TableCell>{revenue.description}</TableCell>
                                  <TableCell>{revenue.category}</TableCell>
                                  <TableCell className="text-right font-medium">
                                    R$ {revenue.amount.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/30 flex justify-between">
                        <p className="text-sm text-muted-foreground">Total de {revenues.length} transações</p>
                        <p className="font-medium text-emerald-600">Total: R$ {totalRevenue.toFixed(2)}</p>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">Adicionar Nova Receita</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleAddRevenue} className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="date">Data</Label>
                            <Input 
                              id="date" 
                              name="date"
                              type="text" 
                              placeholder="DD/MM/AAAA" 
                              value={newRevenue.date} 
                              onChange={handleRevenueChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Input 
                              id="description" 
                              name="description"
                              placeholder="Descrição da receita" 
                              value={newRevenue.description} 
                              onChange={handleRevenueChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Valor (R$)</Label>
                            <Input 
                              id="amount" 
                              name="amount"
                              type="number"
                              step="0.01" 
                              placeholder="0,00" 
                              value={newRevenue.amount} 
                              onChange={handleRevenueChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="category">Categoria</Label>
                            <Input 
                              id="category" 
                              name="category"
                              placeholder="Categoria" 
                              value={newRevenue.category} 
                              onChange={handleRevenueChange}
                              required
                            />
                          </div>
                          
                          <Button type="submit" className="w-full">
                            <Receipt className="mr-2 h-4 w-4" />
                            Registrar Receita
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Resumo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Total este mês</span>
                            <span className="font-semibold text-emerald-600">R$ {totalRevenue.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Média diária</span>
                            <span className="font-semibold">R$ {(totalRevenue / 30).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Projeção mensal</span>
                            <span className="font-semibold text-emerald-600">R$ {(totalRevenue * 1.5).toFixed(2)}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="expenses">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-lg font-medium">Controle de Despesas</CardTitle>
                        <div className="flex items-center text-sm font-medium text-muted-foreground">
                          <span className="flex items-center mr-2 text-red-500">
                            <ArrowDown className="w-4 h-4 mr-1" />
                            5%
                          </span>
                          vs. mês anterior
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={expenseData}
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
                        
                        <div className="mt-6">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Data</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {expenses.map((expense) => (
                                <TableRow key={expense.id}>
                                  <TableCell>{expense.date}</TableCell>
                                  <TableCell>{expense.description}</TableCell>
                                  <TableCell>{expense.category}</TableCell>
                                  <TableCell className="text-right font-medium text-red-500">
                                    R$ {expense.amount.toFixed(2)}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t bg-muted/30 flex justify-between">
                        <p className="text-sm text-muted-foreground">Total de {expenses.length} transações</p>
                        <p className="font-medium text-red-500">Total: R$ {totalExpense.toFixed(2)}</p>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">Adicionar Nova Despesa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleAddExpense} className="space-y-4">
                          <div className="grid gap-2">
                            <Label htmlFor="expense-date">Data</Label>
                            <Input 
                              id="expense-date" 
                              name="date"
                              type="text" 
                              placeholder="DD/MM/AAAA" 
                              value={newExpense.date} 
                              onChange={handleExpenseChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="expense-description">Descrição</Label>
                            <Input 
                              id="expense-description" 
                              name="description"
                              placeholder="Descrição da despesa" 
                              value={newExpense.description} 
                              onChange={handleExpenseChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="expense-amount">Valor (R$)</Label>
                            <Input 
                              id="expense-amount" 
                              name="amount"
                              type="number"
                              step="0.01" 
                              placeholder="0,00" 
                              value={newExpense.amount} 
                              onChange={handleExpenseChange}
                              required
                            />
                          </div>
                          
                          <div className="grid gap-2">
                            <Label htmlFor="expense-category">Categoria</Label>
                            <Input 
                              id="expense-category" 
                              name="category"
                              placeholder="Categoria" 
                              value={newExpense.category} 
                              onChange={handleExpenseChange}
                              required
                            />
                          </div>
                          
                          <Button type="submit" variant="secondary" className="w-full">
                            <Wallet className="mr-2 h-4 w-4" />
                            Registrar Despesa
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                    
                    <Card className="mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-medium">Resumo de Gastos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Total este mês</span>
                            <span className="font-semibold text-red-500">R$ {totalExpense.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Maior despesa</span>
                            <span className="font-semibold">
                              R$ {Math.max(...expenses.map(e => e.amount)).toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-1">
                            <span className="text-sm font-medium">Orçamento restante</span>
                            <span className="font-semibold text-amber-500">
                              R$ {(10000 - totalExpense).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
