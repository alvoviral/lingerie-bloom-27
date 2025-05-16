
import { cn } from "@/lib/utils";
import { Pencil, ShoppingCart, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface SaleItem {
  product: string;
  quantity: number;
  price: number;
}

interface Sale {
  id: string;
  customer: string;
  product: string;
  status: string;
  marketplace: string;
  amount: string;
  date: string;
}

// Reset to empty array
const salesData: Sale[] = [];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pago":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "Em processamento":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "Enviado":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "Entregue":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

const getMarketplaceColor = (marketplace: string) => {
  switch (marketplace) {
    case "Shopee":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300";
    case "Mercado Livre":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "Loja Própria":
    case "Site Próprio":
      return "bg-lingerie-100 text-lingerie-800 dark:bg-lingerie-900/20 dark:text-lingerie-300";
    case "Magazine Luiza":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

const RecentSales = () => {
  const [sales, setSales] = useState(salesData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [saleToDelete, setSaleToDelete] = useState<string | null>(null);
  
  const handleDelete = (id: string) => {
    setSaleToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (saleToDelete) {
      setSales(sales.filter(sale => sale.id !== saleToDelete));
      setDeleteDialogOpen(false);
      setSaleToDelete(null);
      toast.success("Venda removida com sucesso");
    }
  };

  const handleEdit = (id: string) => {
    // Navigate to full sales page for editing
    window.location.href = `/dashboard/vendas?edit=${id}`;
  };
  
  return (
    <Card className="hover-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Vendas Recentes</CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {sales.length > 0 ? (
          <div className="space-y-4">
            {sales.map((sale) => (
              <div key={sale.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{sale.customer}</p>
                  <p className="text-xs text-muted-foreground">{sale.product}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={cn("text-xs font-normal", getStatusColor(sale.status))}>
                      {sale.status}
                    </Badge>
                    <Badge variant="outline" className={cn("text-xs font-normal", getMarketplaceColor(sale.marketplace))}>
                      {sale.marketplace}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right mr-2">
                    <p className="text-sm font-medium">{sale.amount}</p>
                    <p className="text-xs text-muted-foreground">{sale.date}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(sale.id)}>
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(sale.id)}>
                      <Trash2 className="h-3.5 w-3.5 text-red-500" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">Nenhuma venda registrada ainda</p>
            <p className="text-xs text-muted-foreground mt-2">As vendas aparecerão aqui quando começar a registrá-las</p>
          </div>
        )}
      </CardContent>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a venda do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default RecentSales;
