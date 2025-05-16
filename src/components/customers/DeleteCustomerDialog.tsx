
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";

interface DeleteCustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  customerName: string;
}

const DeleteCustomerDialog = ({
  isOpen,
  onClose,
  onConfirm,
  customerName,
}: DeleteCustomerDialogProps) => {
  return (
    <DeleteConfirmationDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      itemName={customerName}
      itemType="cliente"
    />
  );
};

export default DeleteCustomerDialog;
