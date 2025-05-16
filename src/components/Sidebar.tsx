
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  MessageSquare, 
  ShoppingCart,
  Settings,
  PieChart,
  Package,
  Calendar,
  Calculator
} from "lucide-react";
import { useState } from "react";
import BusinessCalculator from "@/components/settings/BusinessCalculator";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Estoque", href: "/dashboard/estoque", icon: Package },
    { name: "Finanças", href: "/dashboard/financas", icon: DollarSign },
    { name: "Vendas", href: "/dashboard/vendas", icon: ShoppingCart },
    { name: "Clientes", href: "/dashboard/clientes", icon: Users },
    { name: "WhatsApp", href: "/dashboard/whatsapp", icon: MessageSquare },
    { name: "Marketplaces", href: "/dashboard/marketplaces", icon: ShoppingBag },
    { name: "Agenda", href: "/dashboard/agenda", icon: Calendar },
    { name: "Relatórios", href: "/dashboard/relatorios", icon: PieChart },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard" && currentPath === "/dashboard") {
      return true;
    }
    return currentPath.startsWith(path) && path !== "/dashboard";
  };

  return (
    <div className={cn("min-h-screen h-full bg-sidebar p-4 flex flex-col", className)}>
      <div className="mb-10 flex items-center justify-center">
        <Link to="/dashboard" className="text-2xl font-playfair font-bold text-lingerie-700 dark:text-lingerie-300">
          Belle<span className="text-lingerie-500">Charm</span>
        </Link>
      </div>
      
      <nav className="space-y-1 flex-1">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg group transition-colors",
              isActive(item.href)
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon 
              className={cn(
                "mr-3 h-5 w-5 flex-shrink-0", 
                isActive(item.href) ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
              )} 
              aria-hidden="true" 
            />
            {item.name}
          </Link>
        ))}
      </nav>
      
      <div className="mt-auto pt-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/dashboard/configuracoes"
          className={cn(
            "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg group transition-colors",
            isActive("/dashboard/configuracoes")
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <Settings 
            className={cn(
              "mr-3 h-5 w-5 flex-shrink-0", 
              isActive("/dashboard/configuracoes") ? "text-sidebar-primary-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
            )} 
            aria-hidden="true" 
          />
          Configurações
        </Link>
        
        {/* Calculadora button right below Configurações */}
        <button
          onClick={() => setIsCalculatorOpen(true)}
          className={cn(
            "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg group transition-colors",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          <Calculator 
            className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
            )} 
            aria-hidden="true" 
          />
          Calculadora
        </button>
      </div>
      
      {/* Calculadora component */}
      <BusinessCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </div>
  );
};

export default Sidebar;
