
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Customer } from "@/types/customer";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/customerUtils";

interface CustomerDetailDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const CustomerDetailDialog = ({
  customer,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: CustomerDetailDialogProps) => {
  if (!customer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div>
            <p className="font-medium text-lg">{customer.name}</p>
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-10"
                style={{ 
                  backgroundColor: 
                    customer.segment === "VIP" ? "rgba(220, 38, 38, 0.1)" : 
                    customer.segment === "Premium" ? "rgba(79, 70, 229, 0.1)" : 
                    customer.segment === "Regular" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                  color: 
                    customer.segment === "VIP" ? "rgb(220, 38, 38)" : 
                    customer.segment === "Premium" ? "rgb(79, 70, 229)" : 
                    customer.segment === "Regular" ? "rgb(16, 185, 129)" : "rgb(245, 158, 11)"
                }}>
                {customer.segment}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">E-mail</p>
              <p>{customer.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Telefone</p>
              <p>{customer.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Endereço</p>
              <p>{customer.address}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Gasto</p>
              <p>R$ {customer.totalSpent.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Última Compra</p>
              <p>{formatDate(customer.lastPurchase)}</p>
            </div>
          </div>

          {customer.notes && (
            <div className="pt-2">
              <p className="text-sm font-medium text-muted-foreground">Observações</p>
              <p className="text-sm mt-1">{customer.notes}</p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Fechar
            </Button>
            <Button variant="secondary" onClick={onEdit}>
              Editar
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Excluir
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
