
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryChart } from "./CategoryChart";
import { MarketplaceChart } from "./MarketplaceChart";

export const ReportTabs = () => {
  return (
    <Tabs defaultValue="categorias" className="mt-6">
      <TabsList className="flex overflow-x-auto pb-1 mb-2 md:pb-0 md:mb-4">
        <TabsTrigger value="categorias">Categorias</TabsTrigger>
        <TabsTrigger value="marketplaces">Marketplaces</TabsTrigger>
      </TabsList>
      
      <TabsContent value="categorias" className="mt-3">
        <CategoryChart />
      </TabsContent>
      
      <TabsContent value="marketplaces" className="mt-3">
        <MarketplaceChart />
      </TabsContent>
    </Tabs>
  );
};
