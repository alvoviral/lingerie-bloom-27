
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Sales = () => {
  useEffect(() => {
    document.title = "Vendas | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Vendas" 
            subtitle="Gerencie suas vendas e acompanhe seus pedidos." 
          />
          
          <div className="mt-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium">Gestão de Vendas</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Aqui você poderá gerenciar suas vendas, acompanhar pedidos,
                  emitir notas fiscais e muito mais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
