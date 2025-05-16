
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingBag, Users, Package } from "lucide-react";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import InventorySummary from "@/components/dashboard/InventorySummary";
import RecentSales from "@/components/dashboard/RecentSales";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Dashboard" 
            subtitle="Bem-vinda de volta! Aqui está o resumo do seu negócio hoje." 
          />
          
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
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialSummary />
            <InventorySummary />
          </div>
          
          <div className="mt-6">
            <RecentSales />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
