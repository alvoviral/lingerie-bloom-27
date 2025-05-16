
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentForm, { AppointmentFormValues } from "./AppointmentForm";

interface AppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onSubmit: (values: AppointmentFormValues) => void;
}

const AppointmentDialog = ({ isOpen, onOpenChange, selectedDate, onSubmit }: AppointmentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Novo Compromisso</DialogTitle>
          <DialogDescription>
            Adicione os detalhes do compromisso. Clique em salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm selectedDate={selectedDate} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
