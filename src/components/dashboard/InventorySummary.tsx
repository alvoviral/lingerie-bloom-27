
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Sutiãs', value: 35, color: '#EC4899' },
  { name: 'Calcinhas', value: 45, color: '#8B5CF6' },
  { name: 'Conjuntos', value: 20, color: '#F59E0B' },
];

const COLORS = ['#EC4899', '#8B5CF6', '#F59E0B'];

const InventorySummary = () => {
  return (
    <Card className="hover-card">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Resumo do Estoque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} itens`, undefined]}
                labelFormatter={(label, payload) => payload[0]?.name || ''}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div className="rounded-lg bg-lingerie-50 dark:bg-lingerie-900/20 p-2">
            <p className="text-xs text-muted-foreground">Total de Itens</p>
            <p className="text-lg font-semibold font-playfair text-lingerie-600 dark:text-lingerie-300">
              187
            </p>
          </div>
          <div className="rounded-lg bg-lavender-50 dark:bg-lavender-900/20 p-2">
            <p className="text-xs text-muted-foreground">Estoque Baixo</p>
            <p className="text-lg font-semibold font-playfair text-lavender-600 dark:text-lavender-300">
              12
            </p>
          </div>
          <div className="rounded-lg bg-cream-50 dark:bg-cream-900/20 p-2">
            <p className="text-xs text-muted-foreground">Valor Total</p>
            <p className="text-lg font-semibold font-playfair text-cream-600 dark:text-cream-300">
              R$ 24.350
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InventorySummary;
