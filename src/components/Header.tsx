
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/contexts/NotificationContext";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "sonner";
import UserProfileDropdown from "@/components/dashboard/UserProfileDropdown";

interface HeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  showSearchOnly?: boolean;
  children?: React.ReactNode;
}

const Header = ({ title, subtitle, className = "", showSearchOnly = false, children }: HeaderProps) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center ${className}`}>
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold font-playfair text-lingerie-800 dark:text-lingerie-200">{title}</h1>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        {!showSearchOnly && children}
        
        {/* The search bar is now removed from the Header component since it's in Dashboard */}
        {showSearchOnly ? null : (
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              className="pl-8"
            />
          </div>
        )}
        
        {!showSearchOnly && (
          <>
            {/* Notifications dropdown - z-index 20 */}
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
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
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

            {/* Substituir pelo componente UserProfileDropdown */}
            <UserProfileDropdown />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
