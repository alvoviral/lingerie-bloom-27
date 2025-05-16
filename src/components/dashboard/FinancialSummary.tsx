
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

const data = [
  { name: 'Jan', receita: 0, despesas: 0 },
  { name: 'Fev', receita: 0, despesas: 0 },
  { name: 'Mar', receita: 0, despesas: 0 },
  { name: 'Abr', receita: 0, despesas: 0 },
  { name: 'Mai', receita: 0, despesas: 0 },
  { name: 'Jun', receita: 0, despesas: 0 },
  { name: 'Jul', receita: 0, despesas: 0 },
  { name: 'Ago', receita: 0, despesas: 0 },
  { name: 'Set', receita: 0, despesas: 0 },
  { name: 'Out', receita: 0, despesas: 0 },
  { name: 'Nov', receita: 0, despesas: 0 },
  { name: 'Dez', receita: 0, despesas: 0 },
];

const FinancialSummary = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="hover-card">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Fixed height container with proper spacing */}
        <div className={`${isMobile ? 'h-48' : 'h-52'} w-full mb-6 pt-2`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 30,
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
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => `R$${value}`}
                ticks={[0, 1]}
              />
              <Tooltip 
                formatter={(value) => [`R$ ${value}`, undefined]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Legend verticalAlign="bottom" height={36} />
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
        {/* Reduced top margin now that chart is properly contained */}
        <div className="mt-2 grid grid-cols-2 gap-4 text-center">
          <div className="rounded-lg bg-lingerie-50 dark:bg-lingerie-900/20 p-2">
            <p className="text-xs text-muted-foreground">Receita Total</p>
            <p className="text-lg font-semibold font-playfair text-lingerie-600 dark:text-lingerie-300">
              R$ 0,00
            </p>
          </div>
          <div className="rounded-lg bg-lavender-50 dark:bg-lavender-900/20 p-2">
            <p className="text-xs text-muted-foreground">Despesas Totais</p>
            <p className="text-lg font-semibold font-playfair text-lavender-600 dark:text-lavender-300">
              R$ 0,00
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;
