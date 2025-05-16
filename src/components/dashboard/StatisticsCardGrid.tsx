
import { ShoppingBag, DollarSign, Users, Package } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

export const StatisticsCardGrid = () => {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Vendas do Mês"
        value="R$ 0,00"
        description="0 pedidos este mês"
        icon={ShoppingBag}
        trend={0}
        iconClassName="bg-lingerie-100 dark:bg-lingerie-900/30"
      />
      <StatCard
        title="Receita Total"
        value="R$ 0,00"
        description="Este ano"
        icon={DollarSign}
        trend={0}
        iconClassName="bg-green-100 dark:bg-green-900/30"
      />
      <StatCard
        title="Clientes Ativos"
        value="0"
        description="0 novos este mês"
        icon={Users}
        trend={0}
        iconClassName="bg-lavender-100 dark:bg-lavender-900/30"
      />
      <StatCard
        title="Produtos em Estoque"
        value="0"
        description="0 com estoque crítico"
        icon={Package}
        trend={0}
        iconClassName="bg-cream-100 dark:bg-cream-900/30"
      />
    </div>
  );
};

export default StatisticsCardGrid;
