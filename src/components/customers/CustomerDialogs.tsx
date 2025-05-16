
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import CustomerForm from "./CustomerForm";
import CustomerDetailDialog from "./CustomerDetailDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { useCustomers } from "@/contexts/CustomerContext";

export const CustomerDialogs = () => {
  const {
    selectedCustomer,
    isAddDialogOpen,
    isEditDialogOpen,
    isDetailDialogOpen,
    isDeleteDialogOpen,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsDetailDialogOpen,
    setIsDeleteDialogOpen,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    openEditDialog,
    openDeleteDialog
  } = useCustomers();

  return (
    <>
      {/* Modal de Cadastro de Cliente */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Cliente</DialogTitle>
          </DialogHeader>
          
          <CustomerForm 
            onSubmit={handleAddCustomer}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Modal de Edição de Cliente */}
      {selectedCustomer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            
            <CustomerForm 
              customer={selectedCustomer}
              onSubmit={handleEditCustomer}
              onCancel={() => setIsEditDialogOpen(false)}
              isEditing
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Detalhes do Cliente */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        isOpen={isDetailDialogOpen}
        onClose={() => setIsDetailDialogOpen(false)}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      {/* Modal de Confirmação de Exclusão */}
      {selectedCustomer && (
        <DeleteConfirmationDialog 
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteCustomer}
          itemName={selectedCustomer.name}
          itemType="cliente"
        />
      )}
    </>
  );
};
