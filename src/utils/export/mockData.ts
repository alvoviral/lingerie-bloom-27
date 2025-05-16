
import { supabase } from "@/integrations/supabase/client";

// Helper function to get mock data when no real data exists
export const getMockData = (section: ExportSection) => {
  switch (section) {
    case 'inventory':
      return [
        { id: 1, name: 'Sutiã Rendado', sku: 'SUT001', price: 79.90, stock: 15 },
        { id: 2, name: 'Calcinha Básica', sku: 'CAL001', price: 29.90, stock: 25 },
        { id: 3, name: 'Conjunto Glamour', sku: 'CON001', price: 119.90, stock: 8 },
      ];
    case 'finances':
      return [
        { id: 1, description: 'Vendas Mensais', value: 5490.50, date: '2023-05-01', type: 'income' },
        { id: 2, description: 'Custos de Operação', value: 1250.00, date: '2023-05-05', type: 'expense' },
        { id: 3, description: 'Investimento em Marketing', value: 800.00, date: '2023-05-10', type: 'expense' },
      ];
    case 'sales':
      return [
        { id: 1, customer: 'Maria Silva', products: 'Conjunto Glamour', total: 119.90, date: '2023-05-12' },
        { id: 2, customer: 'Ana Oliveira', products: 'Sutiã Rendado, Calcinha Básica', total: 109.80, date: '2023-05-14' },
        { id: 3, customer: 'Carla Santos', products: 'Camisola Cetim', total: 149.90, date: '2023-05-15' },
      ];
    case 'customers':
      return [
        { id: 1, name: 'Maria Silva', email: 'maria@exemplo.com', phone: '(11) 98765-4321', purchases: 3 },
        { id: 2, name: 'Ana Oliveira', email: 'ana@exemplo.com', phone: '(21) 97654-3210', purchases: 2 },
        { id: 3, name: 'Carla Santos', email: 'carla@exemplo.com', phone: '(31) 96543-2109', purchases: 1 },
      ];
    case 'whatsapp':
      return [
        { id: 1, contact: 'Maria Silva', lastMessage: 'Olá, meu pedido chegou?', date: '2023-05-15', status: 'Lida' },
        { id: 2, contact: 'Ana Oliveira', lastMessage: 'Qual o horário de funcionamento?', date: '2023-05-14', status: 'Não lida' },
      ];
    case 'marketplaces':
      return [
        { id: 1, platform: 'Shopee', orders: 15, revenue: 1500.00, status: 'Ativo' },
        { id: 2, platform: 'Mercado Livre', orders: 8, revenue: 950.00, status: 'Ativo' },
      ];
    case 'calendar':
      return [
        { id: 1, title: 'Reunião com fornecedor', date: '2023-05-20', time: '14:00', notes: 'Discutir novos modelos' },
        { id: 2, title: 'Sessão de fotos', date: '2023-05-22', time: '10:00', notes: 'Nova coleção verão' },
      ];
    case 'reports':
      return [
        { id: 1, title: 'Relatório de Vendas Mensais', period: 'Maio 2023', created: '2023-06-01', format: 'PDF' },
        { id: 2, title: 'Análise de Estoque', period: 'Q2 2023', created: '2023-07-01', format: 'XLSX' },
      ];
    case 'settings':
      return [
        { id: 1, section: 'Perfil', lastUpdated: '2023-05-10' },
        { id: 2, section: 'Notificações', lastUpdated: '2023-05-15' },
        { id: 3, section: 'Integrações', lastUpdated: '2023-05-12' },
      ];
    default:
      return [];
  }
};

// Import type from the types file
import { ExportSection } from './types';

// Fetch data based on section
export const fetchDataForSection = async (section: ExportSection) => {
  try {
    // Since we don't have actual tables in Supabase for these sections yet,
    // we'll return mock data for all sections for now
    
    if (section === 'all') {
      // For 'all', combine data from all sections
      return {
        inventory: getMockData('inventory'),
        finances: getMockData('finances'),
        sales: getMockData('sales'),
        customers: getMockData('customers'),
        whatsapp: getMockData('whatsapp'),
        marketplaces: getMockData('marketplaces'),
        calendar: getMockData('calendar'),
        reports: getMockData('reports'),
        settings: getMockData('settings')
      };
    } else {
      // For specific section, return mock data for that section
      return getMockData(section);
    }
  } catch (error) {
    console.error(`Error fetching data for ${section}:`, error);
    return getMockData(section); // Fallback to mock data
  }
};
