
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
  onClose: () => void;
  onCreate: (values: AppointmentFormValues) => void;
  onUpdate: (values: AppointmentFormValues) => void;
  appointment: Appointment | null;
  isEditing: boolean;
}

const AppointmentDialog = ({ 
  isOpen, 
  onClose, 
  onCreate,
  onUpdate,
  appointment,
  isEditing
}: AppointmentDialogProps) => {
  const handleSubmit = (values: AppointmentFormValues) => {
    if (isEditing && appointment) {
      onUpdate(values);
    } else {
      onCreate(values);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          selectedDate={isEditing && appointment ? new Date(appointment.date) : new Date()} 
          onSubmit={handleSubmit} 
          appointment={appointment}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;
