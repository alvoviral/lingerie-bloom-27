
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { Customer } from "@/types/customer";
import { formatDate } from "@/utils/customerUtils";

interface PurchaseHistoryProps {
  customers: Customer[];
}

const PurchaseHistory = ({ customers }: PurchaseHistoryProps) => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("all");

  const displayCustomers = selectedCustomerId === "all" 
    ? customers.slice(0, 3) 
    : customers.filter(c => c.id === selectedCustomerId);

  return (
    <div className="rounded-lg border bg-card p-6">
      <div className="flex items-center gap-4 mb-6">
        <Select 
          defaultValue="all" 
          value={selectedCustomerId}
          onValueChange={setSelectedCustomerId}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os clientes</SelectItem>
            {customers.map(customer => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-4">
        {displayCustomers.map((customer) => (
          <Collapsible key={customer.id} className="border rounded-lg">
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Total: R$ {customer.totalSpent.toFixed(2)}
                  </div>
                </div>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4 pt-0 border-t">
              <div className="text-sm">
                <div className="mb-2">
                  <span className="font-medium">Última compra:</span> {formatDate(customer.lastPurchase)}
                </div>
                <div>
                  <span className="font-medium">Observações:</span> {customer.notes || "Sem observações"}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};

export default PurchaseHistory;
