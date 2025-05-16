
import { Customer } from "@/types/customer";

// Generate initial mock customer data
export const getInitialCustomers = (): Customer[] => {
  return [
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@email.com",
      phone: "(11) 98765-4321",
      address: "Av. Paulista, 1000, São Paulo, SP",
      segment: "VIP",
      totalSpent: 2500.50,
      lastPurchase: "2024-05-02",
      notes: "Cliente fidelizada, prefere peças em tons pastéis."
    },
    {
      id: "2",
      name: "João Santos",
      email: "joao.santos@email.com",
      phone: "(11) 91234-5678",
      address: "Rua Augusta, 500, São Paulo, SP",
      segment: "Regular",
      totalSpent: 850.00,
      lastPurchase: "2024-04-25",
      notes: "Costuma comprar presentes para esposa."
    },
    {
      id: "3",
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "(11) 99876-5432",
      address: "Rua Oscar Freire, 200, São Paulo, SP",
      segment: "Premium",
      totalSpent: 1350.75,
      lastPurchase: "2024-05-10",
      notes: "Prefere ser contatada por WhatsApp."
    }
  ];
};

export const formatDate = (dateString: string): string => {
  return dateString === "Nenhuma compra" 
    ? dateString 
    : new Date(dateString).toLocaleDateString('pt-BR');
};
