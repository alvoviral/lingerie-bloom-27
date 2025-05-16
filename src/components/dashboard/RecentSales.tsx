
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const salesData = [
  {
    id: 1,
    customer: "Maria Silva",
    product: "Conjunto Renda Floral",
    amount: "R$ 149,90",
    date: "12/05/2025",
    status: "Pago",
    marketplace: "Shopee"
  },
  {
    id: 2,
    customer: "Ana Paula Santos",
    product: "Sutiã Push-up Cetim",
    amount: "R$ 89,90",
    date: "11/05/2025",
    status: "Em processamento",
    marketplace: "Mercado Livre"
  },
  {
    id: 3,
    customer: "Carolina Mendes",
    product: "Kit 3 Calcinhas Brasileira",
    amount: "R$ 79,90",
    date: "10/05/2025",
    status: "Enviado",
    marketplace: "Loja Própria"
  },
  {
    id: 4,
    customer: "Juliana Costa",
    product: "Conjunto Rendado Premium",
    amount: "R$ 219,90",
    date: "09/05/2025",
    status: "Entregue",
    marketplace: "Magazine Luiza"
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pago":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "Em processamento":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "Enviado":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "Entregue":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

const getMarketplaceColor = (marketplace: string) => {
  switch (marketplace) {
    case "Shopee":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
    case "Mercado Livre":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "Loja Própria":
      return "bg-lingerie-100 text-lingerie-800 dark:bg-lingerie-900/20 dark:text-lingerie-300";
    case "Magazine Luiza":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

const RecentSales = () => {
  return (
    <Card className="hover-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Vendas Recentes</CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {salesData.map((sale) => (
            <div key={sale.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="text-sm font-medium">{sale.customer}</p>
                <p className="text-xs text-muted-foreground">{sale.product}</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className={cn("text-xs font-normal", getStatusColor(sale.status))}>
                    {sale.status}
                  </Badge>
                  <Badge variant="outline" className={cn("text-xs font-normal", getMarketplaceColor(sale.marketplace))}>
                    {sale.marketplace}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{sale.amount}</p>
                <p className="text-xs text-muted-foreground">{sale.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
