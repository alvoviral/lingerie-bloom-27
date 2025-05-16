
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Customer } from "@/types/customer";
import { getInitialCustomers } from "@/utils/customerUtils";
import CustomerForm from "@/components/customers/CustomerForm";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerSegmentation from "@/components/customers/CustomerSegmentation";
import PurchaseHistory from "@/components/customers/PurchaseHistory";
import CustomerSearch from "@/components/customers/CustomerSearch";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Initialize customer data
  useEffect(() => {
    setCustomers(getInitialCustomers());
    document.title = "Clientes | BelleCharm";
  }, []);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    setIsDialogOpen(false);
  };

  // Filter customers based on search and segment filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && customer.segment.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Clientes" 
            subtitle="Gerencie seu relacionamento com clientes." 
          />
          
          <div className="mt-8">
            <CustomerSearch 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              onAddCustomer={() => setIsDialogOpen(true)}
            />

            <Tabs defaultValue="lista" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="lista">Lista de Clientes</TabsTrigger>
                <TabsTrigger value="segmentacao">Segmentação</TabsTrigger>
                <TabsTrigger value="historico">Histórico de Compras</TabsTrigger>
              </TabsList>

              <TabsContent value="lista" className="space-y-6">
                <CustomerTable 
                  customers={filteredCustomers}
                  onViewCustomer={() => {}}
                />
              </TabsContent>

              <TabsContent value="segmentacao">
                <CustomerSegmentation customers={customers} />
              </TabsContent>

              <TabsContent value="historico">
                <PurchaseHistory customers={customers} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro de Cliente */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          
          <CustomerForm 
            onSubmit={handleAddCustomer}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Customers;
