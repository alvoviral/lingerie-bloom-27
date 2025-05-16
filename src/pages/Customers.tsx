
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
import CustomerDetailDialog from "@/components/customers/CustomerDetailDialog";
import DeleteCustomerDialog from "@/components/customers/DeleteCustomerDialog";
import { toast } from "sonner";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Initialize customer data
  useEffect(() => {
    setCustomers(getInitialCustomers());
    document.title = "Clientes | BelleCharm";
  }, []);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    setIsAddDialogOpen(false);
    toast.success("Cliente adicionado", {
      description: `${newCustomer.name} foi adicionado(a) com sucesso à sua base de clientes.`
    });
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    
    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    toast.success("Cliente atualizado", {
      description: `Os dados de ${updatedCustomer.name} foram atualizados com sucesso.`
    });
  };

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;
    
    const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
    const customerName = selectedCustomer.name;
    
    setCustomers(updatedCustomers);
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
    
    toast.success("Cliente excluído", {
      description: `${customerName} foi removido(a) da sua base de clientes.`
    });
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const openEditDialog = () => {
    setIsDetailDialogOpen(false);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setIsDetailDialogOpen(false);
    setIsDeleteDialogOpen(true);
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
              onAddCustomer={() => setIsAddDialogOpen(true)}
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
          </div>
        </div>
      </div>

      {/* Modal de Cadastro de Cliente */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          
          <CustomerForm 
            onSubmit={handleAddCustomer}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Cliente */}
      {selectedCustomer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            
            <CustomerForm 
              customer={selectedCustomer}
              onSubmit={handleEditCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Detalhes do Cliente */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      {/* Modal de Confirmação de Exclusão */}
      {selectedCustomer && (
        <DeleteCustomerDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteCustomer}
          customerName={selectedCustomer.name}
        />
      )}
    </div>
  );
};

export default Customers;
