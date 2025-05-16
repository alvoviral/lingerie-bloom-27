
import { z } from "zod";

// Define the schema of validation for the customer form
export const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone deve ter pelo menos 10 dígitos" }),
  address: z.string().min(5, { message: "Endereço deve ter pelo menos 5 caracteres" }),
  segment: z.string(),
  notes: z.string().optional()
});

export type CustomerFormValues = z.infer<typeof customerFormSchema>;

// Interface for the customer type
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  segment: string;
  totalSpent: number;
  lastPurchase: string;
  notes?: string;
}
