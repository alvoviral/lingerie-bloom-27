
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Package, Plus, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  size: string;
  color: string;
  price: number;
  cost: number;
  stock: number;
  status: "Em estoque" | "Estoque baixo" | "Sem estoque";
}

const Inventory = () => {
  useEffect(() => {
    document.title = "Estoque | BelleCharm";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Conjunto Renda Floral",
      sku: "CRF-001",
      category: "Conjunto",
      size: "M",
      color: "Preto",
      price: 129.90,
      cost: 45.50,
      stock: 23,
      status: "Em estoque"
    },
    {
      id: "2",
      name: "Sutiã Push Up Delicado",
      sku: "SPD-002",
      category: "Sutiã",
      size: "42",
      color: "Rosa",
      price: 89.90,
      cost: 32.75,
      stock: 15,
      status: "Em estoque"
    },
    {
      id: "3",
      name: "Calcinha Fio Dental Renda",
      sku: "CFR-003",
      category: "Calcinha",
      size: "M",
      color: "Vermelho",
      price: 49.90,
      cost: 15.20,
      stock: 4,
      status: "Estoque baixo"
    },
    {
      id: "4",
      name: "Body Transparente Bordado",
      sku: "BTB-004",
      category: "Body",
      size: "G",
      color: "Branco",
      price: 159.90,
      cost: 58.30,
      stock: 8,
      status: "Em estoque"
    },
    {
      id: "5",
      name: "Camisola Cetim Luxo",
      sku: "CCL-005",
      category: "Camisola",
      size: "P",
      color: "Azul Céu",
      price: 119.90,
      cost: 42.60,
      stock: 0,
      status: "Sem estoque"
    }
  ]);

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'status'>>({
    name: "",
    sku: "",
    category: "Conjunto",
    size: "M",
    color: "",
    price: 0,
    cost: 0,
    stock: 0
  });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    // Fix: Explicitly type the status as one of the allowed values
    const productStatus: "Em estoque" | "Estoque baixo" | "Sem estoque" = 
      newProduct.stock === 0 
        ? "Sem estoque" 
        : newProduct.stock <= 5 
          ? "Estoque baixo" 
          : "Em estoque";
    
    const productWithId: Product = {
      ...newProduct,
      id: `${Date.now()}`,
      status: productStatus
    };
    
    setProducts([...products, productWithId]);
    toast.success("Produto adicionado com sucesso!");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: name === 'price' || name === 'cost' || name === 'stock'
        ? parseFloat(value) || 0
        : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em estoque": return "bg-green-100 text-green-800";
      case "Estoque baixo": return "bg-amber-100 text-amber-800";
      case "Sem estoque": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
              <div className="relative max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  className="pl-8 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Produto</DialogTitle>
                    <DialogDescription>
                      Cadastre um novo produto no estoque.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Nome</Label>
                      <Input
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">SKU</Label>
                      <Input
                        name="sku"
                        value={newProduct.sku}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Categoria</Label>
                      <Select 
                        value={newProduct.category}
                        onValueChange={(value) => handleSelectChange("category", value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Conjunto">Conjunto</SelectItem>
                          <SelectItem value="Sutiã">Sutiã</SelectItem>
                          <SelectItem value="Calcinha">Calcinha</SelectItem>
                          <SelectItem value="Body">Body</SelectItem>
                          <SelectItem value="Camisola">Camisola</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Tamanho</Label>
                      <Select 
                        value={newProduct.size}
                        onValueChange={(value) => handleSelectChange("size", value)}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PP">PP</SelectItem>
                          <SelectItem value="P">P</SelectItem>
                          <SelectItem value="M">M</SelectItem>
                          <SelectItem value="G">G</SelectItem>
                          <SelectItem value="GG">GG</SelectItem>
                          <SelectItem value="38">38</SelectItem>
                          <SelectItem value="40">40</SelectItem>
                          <SelectItem value="42">42</SelectItem>
                          <SelectItem value="44">44</SelectItem>
                          <SelectItem value="46">46</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Cor</Label>
                      <Input
                        name="color"
                        value={newProduct.color}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Preço (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        name="price"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Custo (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        name="cost"
                        value={newProduct.cost}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Estoque</Label>
                      <Input
                        type="number"
                        name="stock"
                        value={newProduct.stock}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddProduct}>Adicionar Produto</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

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
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-10">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
