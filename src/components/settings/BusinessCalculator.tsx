
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Calculator, PlusCircle, MinusCircle, DollarSign, Percent } from "lucide-react";
import { Product } from "@/types/inventory";

interface BusinessCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type CalculationType = 'profit' | 'cost' | 'expenses' | 'revenue';
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Sutiã Rendado",
    sku: "SUT001",
    category: "Sutiãs",
    size: "M",
    color: "Preto",
    price: 79.90,
    cost: 35.00,
    stock: 15,
    status: "Em estoque"
  },
  {
    id: "2",
    name: "Calcinha Básica",
    sku: "CAL001",
    category: "Calcinhas",
    size: "M",
    color: "Branco",
    price: 29.90,
    cost: 10.00,
    stock: 25,
    status: "Em estoque"
  },
  {
    id: "3",
    name: "Conjunto Glamour",
    sku: "CON001",
    category: "Conjuntos",
    size: "G",
    color: "Vermelho",
    price: 119.90,
    cost: 55.00,
    stock: 8,
    status: "Em estoque"
  },
];

const BusinessCalculator = ({ isOpen, onClose }: BusinessCalculatorProps) => {
  const [calculationType, setCalculationType] = useState<CalculationType>('profit');
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [customCost, setCustomCost] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      try {
        let calculatedResult = 0;
        const selectedProductData = mockProducts.find(p => p.id === selectedProduct);
        
        switch (calculationType) {
          case 'profit':
            if (selectedProduct) {
              if (selectedProductData) {
                // Lucro por produto = (Preço - Custo) * Quantidade
                calculatedResult = (selectedProductData.price - selectedProductData.cost) * quantity;
              }
            } else {
              // Cálculo com valores personalizados
              calculatedResult = (customPrice - customCost) * quantity;
            }
            break;
          case 'cost':
            if (selectedProduct) {
              if (selectedProductData) {
                // Custo total = Custo unitário * Quantidade
                calculatedResult = selectedProductData.cost * quantity;
              }
            } else {
              calculatedResult = customCost * quantity;
            }
            break;
          case 'expenses':
            if (selectedProduct) {
              if (selectedProductData) {
                // Para fins de exemplo, consideramos despesas como 10% do custo total
                calculatedResult = (selectedProductData.cost * quantity) * 1.1;
              }
            } else {
              calculatedResult = customCost * quantity * 1.1;
            }
            break;
          case 'revenue':
            if (selectedProduct) {
              if (selectedProductData) {
                // Receita total = Preço * Quantidade
                calculatedResult = selectedProductData.price * quantity;
              }
            } else {
              calculatedResult = customPrice * quantity;
            }
            break;
        }

        setResult(Number(calculatedResult.toFixed(2)));
        toast.success("Cálculo realizado com sucesso!");
      } catch (error) {
        console.error("Erro ao calcular:", error);
        toast.error("Erro ao realizar o cálculo. Tente novamente.");
        setResult(null);
      } finally {
        setIsCalculating(false);
      }
    }, 500); // Simula um breve processamento
  };

  const getResultLabel = () => {
    switch (calculationType) {
      case 'profit':
        return "Lucro Estimado";
      case 'cost':
        return "Custo Total";
      case 'expenses':
        return "Despesas Totais";
      case 'revenue':
        return "Receita Total";
    }
  };

  const getCalculationIcon = () => {
    switch (calculationType) {
      case 'profit':
        return <PlusCircle className="h-5 w-5 text-green-500" />;
      case 'cost':
        return <MinusCircle className="h-5 w-5 text-red-500" />;
      case 'expenses':
        return <MinusCircle className="h-5 w-5 text-orange-500" />;
      case 'revenue':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Negócios
          </DialogTitle>
          <DialogDescription>
            Calcule lucros, custos, despesas e receitas com base nos produtos cadastrados.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="calculation-type" className="text-right">
              Tipo de Cálculo:
            </Label>
            <Select
              value={calculationType}
              onValueChange={(value) => setCalculationType(value as CalculationType)}
            >
              <SelectTrigger id="calculation-type" className="col-span-3">
                <SelectValue placeholder="Escolha o tipo de cálculo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">Lucro</SelectItem>
                <SelectItem value="cost">Custo</SelectItem>
                <SelectItem value="expenses">Despesas</SelectItem>
                <SelectItem value="revenue">Receita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Produto:
            </Label>
            <Select
              value={selectedProduct}
              onValueChange={(value) => {
                setSelectedProduct(value);
                // Reseta valores personalizados quando um produto é selecionado
                if (value) {
                  setCustomCost(0);
                  setCustomPrice(0);
                }
              }}
            >
              <SelectTrigger id="product" className="col-span-3">
                <SelectValue placeholder="Escolha um produto ou personalizar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Personalizar Valores</SelectItem>
                {mockProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - {product.size} ({product.sku})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantidade:
            </Label>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          
          {!selectedProduct && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Preço Unitário:
                </Label>
                <Input
                  id="price"
                  type="number"
                  min={0}
                  step={0.01}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Custo Unitário:
                </Label>
                <Input
                  id="cost"
                  type="number"
                  min={0}
                  step={0.01}
                  value={customCost}
                  onChange={(e) => setCustomCost(Number(e.target.value))}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          
          {selectedProduct && (
            <div className="mt-2">
              <p className="text-sm text-muted-foreground mb-1">Detalhes do Produto Selecionado:</p>
              {mockProducts.filter(p => p.id === selectedProduct).map((product) => (
                <div key={product.id} className="text-sm grid grid-cols-2 gap-x-4 gap-y-1">
                  <span className="font-medium">Preço:</span>
                  <span>R$ {product.price.toFixed(2)}</span>
                  
                  <span className="font-medium">Custo:</span>
                  <span>R$ {product.cost.toFixed(2)}</span>
                  
                  <span className="font-medium">Estoque:</span>
                  <span>{product.stock} unidades</span>
                  
                  <span className="font-medium">Margem:</span>
                  <span>{((product.price - product.cost) / product.price * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button 
          onClick={handleCalculate}
          disabled={isCalculating || (!selectedProduct && (customPrice <= 0 || customCost <= 0)) || quantity <= 0}
          className="mt-2"
        >
          {isCalculating ? "Calculando..." : "Calcular"}
        </Button>
        
        {result !== null && (
          <Card className="mt-4 border-2 border-lingerie-200 dark:border-lingerie-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCalculationIcon()}
                  <span className="font-medium">{getResultLabel()}:</span>
                </div>
                <div className="text-xl font-bold">
                  R$ {result.toFixed(2)}
                </div>
              </div>
              
              {calculationType === 'profit' && result > 0 && (
                <div className="mt-2 text-sm flex items-center gap-1 text-green-600">
                  <Percent className="h-3 w-3" />
                  <span>
                    {selectedProduct 
                      ? `Margem de ${((result / (mockProducts.find(p => p.id === selectedProduct)?.price || 1) * quantity * 100)).toFixed(2)}%`
                      : `Margem de ${((result / (customPrice * quantity)) * 100).toFixed(2)}%`
                    }
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BusinessCalculator;
