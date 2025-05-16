
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample sales data
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

export const SalesChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="mb-12">
      <CardHeader className="pb-0">
        <CardTitle>Gráfico de Vendas</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className={`${isMobile ? 'h-64' : 'h-80'} w-full relative`}>
          <ChartContainer
            config={{
              sales: { label: "Vendas", theme: { light: "#ec4899", dark: "#ec4899" } },
              tooltip: { theme: { light: "#ec4899", dark: "#ec4899" } },
            }}
          >
            <LineChart 
              data={salesData}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 14 }} />
              <YAxis 
                tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                tick={{ fontSize: 14 }}
                ticks={[0, 1]}
              />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 14, bottom: 0 }} />
              <Line
                type="monotone"
                dataKey="value"
                name="Vendas (R$)"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5, stroke: "#ec4899", strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
