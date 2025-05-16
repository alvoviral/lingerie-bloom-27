
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', receita: 4000, despesas: 2400 },
  { name: 'Fev', receita: 3000, despesas: 1398 },
  { name: 'Mar', receita: 2000, despesas: 9800 },
  { name: 'Abr', receita: 2780, despesas: 3908 },
  { name: 'Mai', receita: 1890, despesas: 4800 },
  { name: 'Jun', receita: 2390, despesas: 3800 },
  { name: 'Jul', receita: 3490, despesas: 4300 },
];

const FinancialSummary = () => {
  return (
    <Card className="hover-card">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `R$${value}`}
              />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, undefined]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="receita"
                name="Receita"
                stroke="#EC4899"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
              <Area
                type="monotone"
                dataKey="despesas"
                name="Despesas"
                stroke="#8B5CF6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorExpenses)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-lingerie-50 dark:bg-lingerie-900/20 p-2">
            <p className="text-xs text-muted-foreground">Receita Total</p>
            <p className="text-lg font-semibold font-playfair text-lingerie-600 dark:text-lingerie-300">
              R$ 17.550,00
            </p>
          </div>
          <div className="rounded-lg bg-lavender-50 dark:bg-lavender-900/20 p-2">
            <p className="text-xs text-muted-foreground">Despesas Totais</p>
            <p className="text-lg font-semibold font-playfair text-lavender-600 dark:text-lavender-300">
              R$ 6.700,00
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
