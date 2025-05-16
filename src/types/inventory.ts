
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  size: string;
  color: string;
  price: number;
  cost: number;
  stock: number;
  status: "Em estoque" | "Estoque baixo" | "Sem estoque";
}

export type NewProduct = Omit<Product, 'id' | 'status'>;
