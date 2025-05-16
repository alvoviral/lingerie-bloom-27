
import { useState } from "react";
import { 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NewProduct } from "@/types/inventory";

interface ProductFormProps {
  onAddProduct: (product: NewProduct) => void;
}

const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    sku: "",
    category: "Conjunto",
    size: "M",
    color: "",
    price: 0,
    cost: 0,
    stock: 0
  });

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

  const handleSubmit = () => {
    onAddProduct(newProduct);
    
    // Reset form
    setNewProduct({
      name: "",
      sku: "",
      category: "Conjunto",
      size: "M",
      color: "",
      price: 0,
      cost: 0,
      stock: 0
    });
  };

  return (
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
        <Button onClick={handleSubmit}>Adicionar Produto</Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default ProductForm;
