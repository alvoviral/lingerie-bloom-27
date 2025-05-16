
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
import EditProductForm from "@/components/inventory/EditProductForm";
import DeleteConfirmationDialog from "@/components/inventory/DeleteConfirmationDialog";
import { Product, NewProduct } from "@/types/inventory";
import { MOCK_PRODUCTS, getProductStatus } from "@/utils/inventoryUtils";
import { supabase } from "@/integrations/supabase/client";

const Inventory = () => {
  useEffect(() => {
    document.title = "Estoque | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

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

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    // Update status based on current stock
    const updatedStatus = getProductStatus(updatedProduct.stock);
    const finalProduct = { ...updatedProduct, status: updatedStatus };

    setProducts(products.map(p => p.id === finalProduct.id ? finalProduct : p));
    setIsEditDialogOpen(false);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteClick = (productId: string) => {
    setProductIdToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      setProducts(products.filter(p => p.id !== productIdToDelete));
      setIsDeleteDialogOpen(false);
      setProductIdToDelete(null);
      toast.success("Produto excluído com sucesso!");
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setProductIdToDelete(null);
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
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteClick}
            />
          </div>
        </div>
      </div>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <EditProductForm 
          product={selectedProduct} 
          onUpdateProduct={handleUpdateProduct} 
          onCancel={() => setIsEditDialogOpen(false)} 
        />
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog 
        isOpen={isDeleteDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default Inventory;
