
import { useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const Settings = () => {
  useEffect(() => {
    document.title = "Configurações | BelleCharm";
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Configurações" 
            subtitle="Personalize o sistema de acordo com suas necessidades." 
          />
          
          <div className="mt-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6">
                <h3 className="text-lg font-medium">Configurações do Sistema</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Aqui você poderá personalizar o sistema, definir preferências,
                  configurar usuários e outras configurações importantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
