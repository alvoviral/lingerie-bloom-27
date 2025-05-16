
import StatCard from "@/components/dashboard/StatCard";
import { ShoppingCart, DollarSign, Package, TrendingUp } from "lucide-react";

export const BusinessOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Vendas Realizadas"
        value="0"
        icon={ShoppingCart}
        trend={0}
        description="Total do último período"
        iconClassName="bg-lavender-100 dark:bg-lavender-900/30"
      />
      <StatCard
        title="Faturamento"
        value="R$ 0,00"
        icon={DollarSign}
        trend={0}
        description="Total do último período"
        iconClassName="bg-lingerie-100 dark:bg-lingerie-900/30"
      />
      <StatCard
        title="Produtos Vendidos"
        value="0"
        icon={Package}
        trend={0}
        description="Total do último período"
        iconClassName="bg-cream-100 dark:bg-cream-900/30"
      />
      <StatCard
        title="Ticket Médio"
        value="R$ 0,00"
        icon={TrendingUp}
        trend={0}
        description="Média do último período"
        iconClassName="bg-lingerie-100 dark:bg-lingerie-900/30"
      />
    </div>
  );
};
