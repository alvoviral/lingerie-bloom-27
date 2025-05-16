
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChartBar } from "lucide-react";

// Sample marketplace data
const marketplaceData = [
  { name: 'Loja própria', value: 40 },
  { name: 'Shopee', value: 25 },
  { name: 'Mercado Livre', value: 20 },
  { name: 'Magazine Luiza', value: 10 },
  { name: 'Casas Bahia', value: 5 },
];

const COLORS = ['#ec4899', '#8b5cf6', '#0ea5e9', '#10b981', '#f59e0b'];

export const MarketplaceChart = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="mb-4">
      <CardHeader className="pb-0 pt-4">
        <CardTitle className="flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          Vendas por Marketplace
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3 pt-2">
        <div className={`${isMobile ? 'block' : 'flex'} items-center justify-between gap-4`}>
          <div className={`${isMobile ? 'w-full h-64' : 'w-1/2 h-80'} flex items-center justify-center`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={marketplaceData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 80,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 'dataMax']} tickFormatter={(value) => `${value}%`} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={80}
                  tick={{ fontSize: isMobile ? 11 : 13 }}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Porcentagem']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                >
                  {marketplaceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={`${isMobile ? 'w-full mt-2' : 'w-1/2'}`}>
            <h4 className="text-sm font-medium mb-3">Distribuição por canais de venda</h4>
            <div className="space-y-3">
              {marketplaceData.map((item, index) => (
                <div key={`legend-${index}`} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${item.value}%`,
                          backgroundColor: COLORS[index % COLORS.length]
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
