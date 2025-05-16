
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
];

const FinancialSummary = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="hover-card">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Resumo Financeiro</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Reduced chart height for better spacing */}
        <div className={`${isMobile ? 'h-[180px]' : 'h-[200px]'} mt-4`}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: isMobile ? 0 : 10,
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
        {/* Adjusted margin-top to create better spacing between chart and cards */}
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
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
