import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import { DollarSign, Download, ShoppingBag, Users, Package, Bell } from "lucide-react";
import FinancialSummary from "@/components/dashboard/FinancialSummary";
import InventorySummary from "@/components/dashboard/InventorySummary";
import RecentSales from "@/components/dashboard/RecentSales";
import { Button } from "@/components/ui/button";
import ExportDialog from "@/components/dashboard/ExportDialog";
import { useNotifications } from "@/contexts/NotificationContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Dashboard = () => {
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    document.title = "Dashboard | BelleCharm";
  }, []);

  const handleProfileClick = () => {
    toast.info("Funcionalidade de perfil em desenvolvimento");
  };

  const handleSettingsClick = () => {
    navigate('/dashboard/configuracoes');
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      toast.success("Logout realizado com sucesso");
      navigate('/');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b pb-5">
            <Header 
              title="Dashboard" 
              subtitle="Seja bem-vindo"
              className="border-none pb-0"
              showSearchOnly={true}
            >
            </Header>
            
            <div className="flex items-center gap-3">
              {/* Notifications dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative z-20">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <Badge 
                        variant="destructive" 
                        className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-[10px]"
                      >
                        {unreadCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 z-20">
                  <div className="flex justify-between items-center px-2">
                    <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                    {unreadCount > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead} className="h-8 text-xs">
                        Marcar todas como lidas
                      </Button>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <ScrollArea className="h-[300px]">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <DropdownMenuItem 
                          key={notification.id} 
                          className={`cursor-pointer flex flex-col space-y-1 px-4 py-3 ${!notification.read ? 'bg-muted/50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">{notification.title}</p>
                              {!notification.read && (
                                <Badge variant="secondary" className="ml-2 h-1.5 w-1.5 rounded-full p-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center justify-between mt-1">
                              <Badge 
                                variant="outline" 
                                className={`text-[10px] px-1.5 py-0 ${
                                  notification.type === 'order' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800' 
                                    : notification.type === 'stock'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                                }`}
                              >
                                {notification.source}
                              </Badge>
                              <p className="text-[10px] text-muted-foreground ml-auto">
                                {formatDistanceToNow(notification.timestamp, { 
                                  addSuffix: true, 
                                  locale: ptBR 
                                })}
                              </p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-sm text-muted-foreground">Não há notificações</p>
                      </div>
                    )}
                  </ScrollArea>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full z-30">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-lingerie-200 text-lingerie-700">MR</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-30">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>Perfil</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleSettingsClick}>Configurações</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer text-red-500 focus:text-red-500" 
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    {isLoggingOut ? "Saindo..." : "Sair"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button
                onClick={() => setIsExportDialogOpen(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar Dados
              </Button>
            </div>
          </div>
          
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

          {/* Mobile buttons - hidden on larger screens */}
          <div className="mt-6 sm:hidden grid grid-cols-2 gap-4">
            <Button
              onClick={() => setIsExportDialogOpen(true)}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <Download className="h-4 w-4" />
              Exportar Dados
            </Button>
          </div>

          {/* Dialogs */}
          <ExportDialog 
            isOpen={isExportDialogOpen} 
            onClose={() => setIsExportDialogOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
