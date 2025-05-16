
import { Tag } from "lucide-react";
import { Customer } from "@/types/customer";

interface CustomerSegmentationProps {
  customers: Customer[];
}

const CustomerSegmentation = ({ customers }: CustomerSegmentationProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <Tag className="text-red-600" size={18} />
          </div>
          <h3 className="text-lg font-medium">VIP</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Clientes com alta fidelidade e alto valor de compra.
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold">
            {customers.filter(c => c.segment === "VIP").length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">clientes</span>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Tag className="text-indigo-600" size={18} />
          </div>
          <h3 className="text-lg font-medium">Premium</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Clientes recorrentes com valor médio de compra.
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold">
            {customers.filter(c => c.segment === "Premium").length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">clientes</span>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Tag className="text-green-600" size={18} />
          </div>
          <h3 className="text-lg font-medium">Regular</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Clientes ocasionais com potencial para crescer.
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold">
            {customers.filter(c => c.segment === "Regular").length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">clientes</span>
        </div>
      </div>
      
      <div className="rounded-lg border bg-card p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Tag className="text-amber-600" size={18} />
          </div>
          <h3 className="text-lg font-medium">Novo</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Clientes recentes ainda em fase de avaliação.
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold">
            {customers.filter(c => c.segment === "Novo").length}
          </span>
          <span className="text-sm text-muted-foreground ml-2">clientes</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegmentation;
