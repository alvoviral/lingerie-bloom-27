
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesChart } from "./SalesChart";
import { CategoryChart } from "./CategoryChart";
import { MarketplaceChart } from "./MarketplaceChart";
import { InventoryChart } from "./InventoryChart";

export const ReportTabs = () => {
  return (
    <Tabs defaultValue="vendas" className="mt-40">
      <TabsList className="flex overflow-x-auto pb-1 mb-12 md:pb-0 md:mb-8">
        <TabsTrigger value="vendas">Vendas</TabsTrigger>
        <TabsTrigger value="categorias">Categorias</TabsTrigger>
        <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
        <TabsTrigger value="estoque">Estoque</TabsTrigger>
      </TabsList>
      
      <TabsContent value="vendas" className="mt-24">
        <SalesChart />
      </TabsContent>
      
      <TabsContent value="categorias" className="mt-24">
        <CategoryChart />
      </TabsContent>
      
      <TabsContent value="marketplaces" className="mt-24">
        <MarketplaceChart />
      </TabsContent>
      
      <TabsContent value="estoque" className="mt-24">
        <InventoryChart />
      </TabsContent>
    </Tabs>
  );
};
