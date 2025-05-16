
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
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Product, NewProduct } from "@/types/inventory";
import { MOCK_PRODUCTS, getProductStatus } from "@/utils/inventoryUtils";
import { supabase } from "@/integrations/supabase/client";

// Chave para armazenamento local
const STORAGE_KEY = 'bellecharm_inventory';

const Inventory = () => {
  useEffect(() => {
    document.title = "Estoque | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

  // Inicializar produtos do armazenamento local ou dos dados mock
  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = localStorage.getItem(STORAGE_KEY);
      if (savedProducts) {
        try {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
          console.log("Produtos carregados do armazenamento local:", parsedProducts.length);
        } catch (error) {
          console.error("Erro ao carregar produtos:", error);
          setProducts(MOCK_PRODUCTS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
        }
      } else {
        console.log("Nenhum produto encontrado, carregando dados mock");
        setProducts(MOCK_PRODUCTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
      }
    };

    loadProducts();
  }, []);

  // Função para salvar produtos no armazenamento local
  const saveProducts = (updatedProducts: Product[]) => {
    try {
      setProducts(updatedProducts);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
      console.log("Produtos salvos no armazenamento local:", updatedProducts.length);
    } catch (error) {
      console.error("Erro ao salvar produtos:", error);
      toast.error("Erro ao salvar produtos");
    }
  };

  const handleAddProduct = (newProductData: NewProduct) => {
    const productStatus = getProductStatus(newProductData.stock);
    
    const productWithId: Product = {
      ...newProductData,
      id: `${Date.now()}`,
      status: productStatus
    };
    
    const updatedProducts = [...products, productWithId];
    saveProducts(updatedProducts);
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

    const updatedProducts = products.map(p => p.id === finalProduct.id ? finalProduct : p);
    saveProducts(updatedProducts);
    setIsEditDialogOpen(false);
    toast.success("Produto atualizado com sucesso!");
  };

  const handleDeleteClick = (productId: string) => {
    const productToDelete = products.find(p => p.id === productId);
    setProductIdToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      const updatedProducts = products.filter(p => p.id !== productIdToDelete);
      saveProducts(updatedProducts);
      setIsDeleteDialogOpen(false);
      setProductIdToDelete(null);
      toast.success("Produto excluído com sucesso!");
      console.log("Produto excluído. Total de produtos restantes:", updatedProducts.length);
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
        itemName={products.find(p => p.id === productIdToDelete)?.name}
        itemType="produto"
      />
    </div>
  );
};

export default Inventory;
