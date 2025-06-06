
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample inventory data
const inventoryData = [
  { month: 'Jan', estoque: 0, vendas: 0 },
  { month: 'Fev', estoque: 0, vendas: 0 },
  { month: 'Mar', estoque: 0, vendas: 0 },
  { month: 'Abr', estoque: 0, vendas: 0 },
  { month: 'Mai', estoque: 0, vendas: 0 },
  { month: 'Jun', estoque: 0, vendas: 0 },
  { month: 'Jul', estoque: 0, vendas: 0 },
  { month: 'Ago', estoque: 0, vendas: 0 },
  { month: 'Set', estoque: 0, vendas: 0 },
  { month: 'Out', estoque: 0, vendas: 0 },
  { month: 'Nov', estoque: 0, vendas: 0 },
  { month: 'Dez', estoque: 0, vendas: 0 },
];

export const InventoryChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-0 pt-4">
        <CardTitle>Estoque vs. Vendas</CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-2">
        <div className={`${isMobile ? 'h-56' : 'h-72'} w-full relative`}>
          <ChartContainer
            config={{
              estoque: { label: "Estoque", theme: { light: "#8b5cf6", dark: "#8b5cf6" } },
              vendas: { label: "Vendas", theme: { light: "#ec4899", dark: "#ec4899" } },
            }}
          >
            <BarChart 
              data={inventoryData}
              margin={{
                top: 15,
                right: 20,
                left: 20,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} padding={{ left: 10, right: 10 }} />
              <YAxis 
                tick={{ fontSize: 12 }}
                ticks={[0, 1]}
                width={40}
              />
              <Legend wrapperStyle={{ paddingTop: 10, fontSize: 12, bottom: 0 }} />
              <Bar dataKey="estoque" name="Estoque (un)" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="vendas" name="Vendas (un)" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
