
import { useState, useEffect } from "react";
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
import { Calculator, PlusCircle, MinusCircle, DollarSign, Percent, Store } from "lucide-react";
import { Product } from "@/types/inventory";

interface BusinessCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
}

type CalculationType = 'profit' | 'cost' | 'expenses' | 'revenue';
type MarketplaceType = 'shopee' | 'mercadolivre' | 'magalu' | 'casasbahia' | 'lojapropia' | '';

interface MarketplaceConfig {
  name: string;
  feePercentage: number; // Taxa percentual da plataforma
  fixedFee: number; // Taxa fixa por venda
  shippingFee: number; // Contribuição no frete
  icon: JSX.Element;
}

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

// Configurações de cada marketplace
const marketplaceConfigs: Record<MarketplaceType, MarketplaceConfig> = {
  '': { name: "Personalizado", feePercentage: 0, fixedFee: 0, shippingFee: 0, icon: <Calculator className="h-5 w-5" /> },
  'shopee': { name: "Shopee", feePercentage: 18, fixedFee: 2, shippingFee: 15, icon: <Store className="h-5 w-5 text-orange-500" /> },
  'mercadolivre': { name: "Mercado Livre", feePercentage: 16, fixedFee: 5, shippingFee: 20, icon: <Store className="h-5 w-5 text-yellow-500" /> },
  'magalu': { name: "Magazine Luiza", feePercentage: 14, fixedFee: 3, shippingFee: 18, icon: <Store className="h-5 w-5 text-blue-500" /> },
  'casasbahia': { name: "Casas Bahia", feePercentage: 15, fixedFee: 4, shippingFee: 22, icon: <Store className="h-5 w-5 text-red-500" /> },
  'lojapropia': { name: "Loja Própria", feePercentage: 3, fixedFee: 0, shippingFee: 12, icon: <Store className="h-5 w-5 text-green-500" /> },
};

const BusinessCalculator = ({ isOpen, onClose }: BusinessCalculatorProps) => {
  const [calculationType, setCalculationType] = useState<CalculationType>('profit');
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [customPrice, setCustomPrice] = useState<number>(0);
  const [customCost, setCustomCost] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedMarketplace, setSelectedMarketplace] = useState<MarketplaceType>('');
  const [marketplaceDetails, setMarketplaceDetails] = useState<{
    platformFee: number;
    shippingCost: number;
    netProfit: number;
    profitMargin: number;
  } | null>(null);

  // Atualiza os cálculos quando os inputs mudam
  useEffect(() => {
    if (selectedProduct || (customPrice > 0 && customCost > 0)) {
      handleCalculate();
    }
  }, [selectedProduct, quantity, customPrice, customCost, calculationType, selectedMarketplace]);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      try {
        let calculatedResult = 0;
        const selectedProductData = mockProducts.find(p => p.id === selectedProduct);
        const marketplaceConfig = marketplaceConfigs[selectedMarketplace];
        
        // Valores do produto selecionado ou personalizados
        const productPrice = selectedProductData ? selectedProductData.price : customPrice;
        const productCost = selectedProductData ? selectedProductData.cost : customCost;
        
        // Cálculos com base no tipo de cálculo escolhido
        switch (calculationType) {
          case 'profit':
            // Cálculo básico de lucro
            calculatedResult = (productPrice - productCost) * quantity;
            
            // Se um marketplace foi selecionado, aplicar taxas
            if (selectedMarketplace) {
              const platformFee = (productPrice * marketplaceConfig.feePercentage / 100) * quantity;
              const fixedFee = marketplaceConfig.fixedFee * quantity;
              const shippingCost = marketplaceConfig.shippingFee;
              
              calculatedResult = (productPrice * quantity) - (productCost * quantity) - platformFee - fixedFee - shippingCost;
              
              // Detalhes do cálculo para exibição
              setMarketplaceDetails({
                platformFee: platformFee + fixedFee,
                shippingCost: shippingCost,
                netProfit: calculatedResult,
                profitMargin: (calculatedResult / (productPrice * quantity)) * 100
              });
            } else {
              setMarketplaceDetails(null);
            }
            break;
            
          case 'cost':
            calculatedResult = productCost * quantity;
            
            if (selectedMarketplace) {
              const platformFee = (productPrice * marketplaceConfig.feePercentage / 100) * quantity;
              const fixedFee = marketplaceConfig.fixedFee * quantity;
              const shippingCost = marketplaceConfig.shippingFee;
              
              // Custo total = custo de produto + taxas da plataforma + frete
              calculatedResult = (productCost * quantity) + platformFee + fixedFee + shippingCost;
              
              setMarketplaceDetails({
                platformFee: platformFee + fixedFee,
                shippingCost: shippingCost,
                netProfit: (productPrice * quantity) - calculatedResult,
                profitMargin: (((productPrice * quantity) - calculatedResult) / (productPrice * quantity)) * 100
              });
            } else {
              setMarketplaceDetails(null);
            }
            break;
            
          case 'expenses':
            if (selectedMarketplace) {
              const platformFee = (productPrice * marketplaceConfig.feePercentage / 100) * quantity;
              const fixedFee = marketplaceConfig.fixedFee * quantity;
              const shippingCost = marketplaceConfig.shippingFee;
              
              // Despesas = taxas + frete (não incluindo o custo do produto)
              calculatedResult = platformFee + fixedFee + shippingCost;
              
              setMarketplaceDetails({
                platformFee: platformFee + fixedFee,
                shippingCost: shippingCost,
                netProfit: (productPrice * quantity) - (productCost * quantity) - calculatedResult,
                profitMargin: (((productPrice * quantity) - (productCost * quantity) - calculatedResult) / (productPrice * quantity)) * 100
              });
            } else {
              // Para casos sem marketplace, consideramos despesas como 10% do custo total
              calculatedResult = (productCost * quantity) * 0.1;
              setMarketplaceDetails(null);
            }
            break;
            
          case 'revenue':
            // Receita bruta
            calculatedResult = productPrice * quantity;
            
            if (selectedMarketplace) {
              const platformFee = (productPrice * marketplaceConfig.feePercentage / 100) * quantity;
              const fixedFee = marketplaceConfig.fixedFee * quantity;
              
              // Detalhes para receita - quanto vai efetivamente para você após taxas
              setMarketplaceDetails({
                platformFee: platformFee + fixedFee,
                shippingCost: marketplaceConfig.shippingFee,
                netProfit: calculatedResult - platformFee - fixedFee - marketplaceConfig.shippingFee,
                profitMargin: ((calculatedResult - platformFee - fixedFee - marketplaceConfig.shippingFee) / calculatedResult) * 100
              });
            } else {
              setMarketplaceDetails(null);
            }
            break;
        }

        setResult(Number(calculatedResult.toFixed(2)));
        if (calculatedResult > 0) {
          toast.success("Cálculo realizado com sucesso!");
        }
      } catch (error) {
        console.error("Erro ao calcular:", error);
        toast.error("Erro ao realizar o cálculo. Tente novamente.");
        setResult(null);
      } finally {
        setIsCalculating(false);
      }
    }, 300); // Tempo reduzido para simulação
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
            Calcule lucros, custos, despesas e receitas com base nos produtos e plataformas.
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
            <Label htmlFor="marketplace" className="text-right">
              Plataforma:
            </Label>
            <Select
              value={selectedMarketplace}
              onValueChange={(value) => setSelectedMarketplace(value as MarketplaceType)}
            >
              <SelectTrigger id="marketplace" className="col-span-3">
                <SelectValue placeholder="Escolha uma plataforma" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Personalizado</SelectItem>
                <SelectItem value="lojapropia">Loja Própria</SelectItem>
                <SelectItem value="shopee">Shopee</SelectItem>
                <SelectItem value="mercadolivre">Mercado Livre</SelectItem>
                <SelectItem value="magalu">Magazine Luiza</SelectItem>
                <SelectItem value="casasbahia">Casas Bahia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {selectedMarketplace && (
            <div className="bg-muted/30 p-3 rounded-md text-sm">
              <div className="flex items-center gap-2 mb-2">
                {marketplaceConfigs[selectedMarketplace].icon}
                <span className="font-medium">{marketplaceConfigs[selectedMarketplace].name}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                <span>Taxa da plataforma:</span>
                <span>{marketplaceConfigs[selectedMarketplace].feePercentage}% + R${marketplaceConfigs[selectedMarketplace].fixedFee.toFixed(2)}</span>
                
                <span>Custo de envio:</span>
                <span>R${marketplaceConfigs[selectedMarketplace].shippingFee.toFixed(2)}</span>
              </div>
            </div>
          )}
          
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
              
              {marketplaceDetails && (
                <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-sm mb-2">Detalhes do Cálculo:</h4>
                  <div className="text-sm grid grid-cols-2 gap-x-4 gap-y-2">
                    <span className="text-muted-foreground">Taxa da Plataforma:</span>
                    <span className="text-red-500">- R$ {marketplaceDetails.platformFee.toFixed(2)}</span>
                    
                    <span className="text-muted-foreground">Custo de Envio:</span>
                    <span className="text-red-500">- R$ {marketplaceDetails.shippingCost.toFixed(2)}</span>
                    
                    <span className="font-medium">Lucro Líquido:</span>
                    <span className={marketplaceDetails.netProfit < 0 ? "text-red-500" : "text-green-500"}>
                      R$ {marketplaceDetails.netProfit.toFixed(2)}
                    </span>
                    
                    <span className="font-medium">Margem de Lucro:</span>
                    <span className={marketplaceDetails.profitMargin < 0 ? "text-red-500" : "text-green-500"}>
                      {marketplaceDetails.profitMargin.toFixed(2)}%
                    </span>
                  </div>
                </div>
              )}
              
              {calculationType === 'profit' && result > 0 && !marketplaceDetails && (
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
