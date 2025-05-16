
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AppointmentForm, { AppointmentFormValues } from "./AppointmentForm";
import { Appointment } from "@/types/calendar";

interface AppointmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onSubmit: (values: AppointmentFormValues) => void;
  appointment: Appointment | null;
}

const AppointmentDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedDate, 
  onSubmit, 
  appointment 
}: AppointmentDialogProps) => {
  const isEditing = !!appointment;
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar Compromisso' : 'Novo Compromisso'}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? 'Edite os detalhes do compromisso. Clique em salvar quando terminar.'
              : 'Adicione os detalhes do compromisso. Clique em salvar quando terminar.'
            }
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm 
          selectedDate={selectedDate} 
          onSubmit={onSubmit} 
          appointment={appointment}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
