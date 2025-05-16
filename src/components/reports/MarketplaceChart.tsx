
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample marketplace data
const marketplaceData = [
  { name: 'Loja própria', value: 0 },
  { name: 'Shopee', value: 0 },
  { name: 'Mercado Livre', value: 0 },
  { name: 'Magazine Luiza', value: 0 },
  { name: 'Casas Bahia', value: 0 },
];

const COLORS = ['#ec4899', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];

export const MarketplaceChart = () => {
  const isMobile = useIsMobile();
  
  return (
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
  );
};
