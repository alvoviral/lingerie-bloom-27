
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomerTable from "./CustomerTable";
import CustomerSegmentation from "./CustomerSegmentation";
import PurchaseHistory from "./PurchaseHistory";
import { useCustomers } from "@/contexts/CustomerContext";

export const CustomerTabs = () => {
  const { 
    customers, 
    filteredCustomers, 
    handleViewCustomer, 
    setSelectedCustomer, 
    setIsEditDialogOpen, 
    setIsDeleteDialogOpen 
  } = useCustomers();

  return (
    <Tabs defaultValue="lista" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
        <TabsTrigger value="segmentacao">Segmentação</TabsTrigger>
        <TabsTrigger value="historico">Histórico de Compras</TabsTrigger>
      </TabsList>

      <TabsContent value="lista" className="space-y-6">
        <CustomerTable 
          customers={filteredCustomers}
          onViewCustomer={handleViewCustomer}
          onEditCustomer={(customer) => {
            setSelectedCustomer(customer);
            setIsEditDialogOpen(true);
          }}
          onDeleteCustomer={(customer) => {
            setSelectedCustomer(customer);
            setIsDeleteDialogOpen(true);
          }}
        />
      </TabsContent>

      <TabsContent value="segmentacao">
        <CustomerSegmentation customers={customers} />
      </TabsContent>

      <TabsContent value="historico">
        <PurchaseHistory customers={customers} />
      </TabsContent>
    </Tabs>
  );
};
