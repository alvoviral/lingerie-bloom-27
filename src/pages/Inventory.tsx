
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Inventory = () => {
  useEffect(() => {
    document.title = "Estoque | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Estoque" 
            subtitle="Gerencie seu inventário e controle seus produtos." 
          />
          
          <div className="mt-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium">Controle de Estoque</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Aqui você poderá gerenciar seu estoque, cadastrar produtos, 
                  controlar entradas e saídas e muito mais.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
