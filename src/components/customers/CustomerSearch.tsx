
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, UserPlus } from "lucide-react";

interface CustomerSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  onAddCustomer: () => void;
}

const CustomerSearch = ({ 
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  onAddCustomer
}: CustomerSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div className="relative mb-4 md:mb-0 md:w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          placeholder="Buscar clientes..." 
          className="pl-10" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <Select 
          value={activeFilter} 
          onValueChange={setActiveFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar segmento" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os segmentos</SelectItem>
            <SelectItem value="VIP">VIP</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Regular">Regular</SelectItem>
            <SelectItem value="Novo">Novo</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onAddCustomer}>
          <UserPlus className="mr-2" size={18} />
          Novo Cliente
        </Button>
      </div>
    </div>
  );
};

export default CustomerSearch;
