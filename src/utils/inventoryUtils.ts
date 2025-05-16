
import { Product } from "@/types/inventory";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Em estoque": return "bg-green-100 text-green-800";
    case "Estoque baixo": return "bg-amber-100 text-amber-800";
    case "Sem estoque": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const getProductStatus = (stock: number): "Em estoque" | "Estoque baixo" | "Sem estoque" => {
  if (stock === 0) return "Sem estoque";
  if (stock <= 5) return "Estoque baixo";
  return "Em estoque";
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Conjunto Renda Floral",
    sku: "CRF-001",
    category: "Conjunto",
    size: "M",
    color: "Preto",
    price: 129.90,
    cost: 45.50,
    stock: 23,
    status: "Em estoque"
  },
  {
    id: "2",
    name: "Sutiã Push Up Delicado",
    sku: "SPD-002",
    category: "Sutiã",
    size: "42",
    color: "Rosa",
    price: 89.90,
    cost: 32.75,
    stock: 15,
    status: "Em estoque"
  },
  {
    id: "3",
    name: "Calcinha Fio Dental Renda",
    sku: "CFR-003",
    category: "Calcinha",
    size: "M",
    color: "Vermelho",
    price: 49.90,
    cost: 15.20,
    stock: 4,
    status: "Estoque baixo"
  },
  {
    id: "4",
    name: "Body Transparente Bordado",
    sku: "BTB-004",
    category: "Body",
    size: "G",
    color: "Branco",
    price: 159.90,
    cost: 58.30,
    stock: 8,
    status: "Em estoque"
  },
  {
    id: "5",
    name: "Camisola Cetim Luxo",
    sku: "CCL-005",
    category: "Camisola",
    size: "P",
    color: "Azul Céu",
    price: 119.90,
    cost: 42.60,
    stock: 0,
    status: "Sem estoque"
  }
];
