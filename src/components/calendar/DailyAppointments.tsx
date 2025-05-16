
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, Clock, User, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/calendar";

interface DailyAppointmentsProps {
  selectedDate: Date;
  appointments: Appointment[];
  onNewAppointment: () => void;
  onEditAppointment: (appointment: Appointment) => void;
  onDeleteAppointment: (id: string) => void;
}

const DailyAppointments = ({ 
  selectedDate, 
  appointments, 
  onNewAppointment,
  onEditAppointment,
  onDeleteAppointment,
}: DailyAppointmentsProps) => {
  return (
    <div className="space-y-4">
      <div className="text-xl flex items-center">
        <CalendarIcon className="mr-2 h-5 w-5" />
        {format(selectedDate, "d 'de' MMMM", { locale: pt })}
      </div>
      
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map(apt => (
            <div key={apt.id} className="border rounded-lg p-3 hover:bg-accent/50">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{apt.title}</h4>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onEditAppointment(apt)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Editar</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onDeleteAppointment(apt.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Excluir</span>
                  </Button>
                </div>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" /> {apt.time}
                </div>
                <div className="flex items-center text-muted-foreground">
                  <User className="h-4 w-4 mr-1" /> {apt.client}
                </div>
                {apt.notes && <p className="text-muted-foreground mt-1">{apt.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum compromisso para esta data</p>
          <Button variant="outline" className="mt-2" onClick={onNewAppointment}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
        </div>
      )}
    </div>
  );
};

export default DailyAppointments;
