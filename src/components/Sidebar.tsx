
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
  Calculator,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import BusinessCalculator from "@/components/settings/BusinessCalculator";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const { user } = useAuth();
  
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

  // Desktop sidebar
  const DesktopSidebar = () => (
    <div className={cn("hidden md:flex min-h-screen h-full bg-sidebar p-4 flex-col", className)}>
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
      
      <BusinessCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </div>
  );

  // Mobile menu content (inside a sheet)
  const MobileMenu = () => (
    <SheetContent side="left" className="w-[280px] sm:w-[300px] bg-sidebar p-0 border-r border-sidebar-border">
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-center">
            <Link to="/dashboard" className="text-2xl font-playfair font-bold text-lingerie-700 dark:text-lingerie-300">
              Belle<span className="text-lingerie-500">Charm</span>
            </Link>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-3 text-sm font-medium rounded-lg group transition-colors",
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
        
        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Link
            to="/dashboard/configuracoes"
            className={cn(
              "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg group transition-colors w-full",
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
      </div>
    </SheetContent>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <DesktopSidebar />
      
      {/* Mobile hamburger menu */}
      <div className="md:hidden fixed top-0 left-0 z-40 w-full bg-background border-b border-border shadow-sm">
        <div className="flex items-center justify-between p-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <MobileMenu />
          </Sheet>
          
          <Link to="/dashboard" className="font-playfair font-bold text-lg text-lingerie-700 dark:text-lingerie-300">
            Belle<span className="text-lingerie-500">Charm</span>
          </Link>
          
          <div className="w-8">
            {/* Spacer to balance layout */}
          </div>
        </div>
      </div>
      
      {/* Business calculator modal (shared between mobile and desktop) */}
      <BusinessCalculator 
        isOpen={isCalculatorOpen} 
        onClose={() => setIsCalculatorOpen(false)} 
      />
    </>
  );
};

export default Sidebar;
