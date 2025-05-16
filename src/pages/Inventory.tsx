
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchBar from "@/components/inventory/SearchBar";
import ProductForm from "@/components/inventory/ProductForm";
import ProductTable from "@/components/inventory/ProductTable";
import { Product, NewProduct } from "@/types/inventory";
import { MOCK_PRODUCTS, getProductStatus } from "@/utils/inventoryUtils";

const Inventory = () => {
  useEffect(() => {
    document.title = "Estoque | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const handleAddProduct = (newProductData: NewProduct) => {
    const productStatus = getProductStatus(newProductData.stock);
    
    const productWithId: Product = {
      ...newProductData,
      id: `${Date.now()}`,
      status: productStatus
    };
    
    setProducts([...products, productWithId]);
    toast.success("Produto adicionado com sucesso!");
  };

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
            <div className="flex justify-between items-center mb-6">
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
                  </Button>
                </DialogTrigger>
                <ProductForm onAddProduct={handleAddProduct} />
              </Dialog>
            </div>

            <ProductTable 
              products={products}
              searchQuery={searchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
