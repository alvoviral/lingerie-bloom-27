
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/inventory";
import { getStatusColor } from "@/utils/inventoryUtils";

interface ProductTableProps {
  products: Product[];
  searchQuery: string;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductTable = ({ 
  products, 
  searchQuery, 
  onEditProduct, 
  onDeleteProduct 
}: ProductTableProps) => {
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead className="text-right">Preço (R$)</TableHead>
            <TableHead className="text-right">Estoque</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.size}</TableCell>
                <TableCell>{product.color}</TableCell>
                <TableCell className="text-right">
                  {product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(product.status)} variant="outline">
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button onClick={() => onEditProduct(product)} size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => onDeleteProduct(product.id)} size="sm" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <Package className="h-10 w-10 mb-2" />
                  <p>Nenhum produto encontrado</p>
                  {searchQuery && <p className="text-sm">Tente uma busca diferente</p>}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
