
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import CustomerSearch from "@/components/customers/CustomerSearch";
import { CustomerProvider, useCustomers } from "@/contexts/CustomerContext";
import { CustomerDialogs } from "@/components/customers/CustomerDialogs";
import { CustomerTabs } from "@/components/customers/CustomerTabs";

// Component that uses the customer context
const CustomersContent = () => {
  const { 
    setSearchQuery, 
    searchQuery, 
    activeFilter, 
    setActiveFilter, 
    setIsAddDialogOpen 
  } = useCustomers();

  useEffect(() => {
    document.title = "Clientes | BelleCharm";
  }, []);

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

            <CustomerTabs />
          </div>
        </div>
      </div>

      <CustomerDialogs />
    </div>
  );
};

// Wrapper component that provides the context
const Customers = () => {
  return (
    <CustomerProvider>
      <CustomersContent />
    </CustomerProvider>
  );
};

export default Customers;
