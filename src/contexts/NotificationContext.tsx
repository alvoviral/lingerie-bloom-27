
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

export type Notification = {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  source: string;
  type: 'order' | 'stock' | 'system' | 'other';
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo pedido recebido",
      message: "Mercado Livre - Conjunto Renda #8023",
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutos atrás
      read: false,
      source: "Mercado Livre",
      type: "order"
    },
    {
      id: "2",
      title: "Estoque baixo",
      message: "Sutiã Rendado Rosa - Tam P",
      timestamp: new Date(Date.now() - 2 * 3600000), // 2 horas atrás
      read: false,
      source: "Sistema",
      type: "stock"
    }
  ]);

  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // Calcular contagem de não lidas
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Simular recebimento de notificações dos marketplaces conectados
  useEffect(() => {
    // Criar um intervalo para simular novas notificações a cada 30-90 segundos (apenas para demonstração)
    const marketplaces = ["Shopee", "Mercado Livre", "Magazine Luiza", "Casas Bahia"];
    const products = [
      "Conjunto Rendado Floral", 
      "Sutiã Push-up", 
      "Body de Renda", 
      "Lingerie Cetim Premium",
      "Kit Calcinhas"
    ];
    
    const intervalId = setInterval(() => {
      // Verificar se há pelo menos um marketplace para simular (em um caso real, isso dependeria de API)
      if (marketplaces.length > 0) {
        // Chance de 20% de gerar uma notificação de venda
        if (Math.random() < 0.2) {
          const randomMarketplace = marketplaces[Math.floor(Math.random() * marketplaces.length)];
          const randomProduct = products[Math.floor(Math.random() * products.length)];
          const randomOrderNumber = Math.floor(10000 + Math.random() * 90000);
          
          const newNotification = {
            title: "Novo pedido recebido",
            message: `${randomMarketplace} - ${randomProduct} #${randomOrderNumber}`,
            source: randomMarketplace,
            type: "order" as const
          };
          
          addNotification(newNotification);
        }
      }
    }, Math.floor(30000 + Math.random() * 60000)); // Entre 30 e 90 segundos
    
    return () => clearInterval(intervalId);
  }, []);

  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
    
    // Exibir toast para novas notificações
    toast(notification.title, {
      description: notification.message,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
