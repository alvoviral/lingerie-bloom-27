
import DeleteDialog from "./DeleteDialog";

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
    <DeleteDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      itemName={customerName}
      itemType="cliente"
    />
  );
};

export default DeleteCustomerDialog;
