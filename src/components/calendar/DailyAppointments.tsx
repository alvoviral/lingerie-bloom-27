
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { CalendarIcon, Clock, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/calendar";

interface DailyAppointmentsProps {
  selectedDate: Date;
  appointments: Appointment[];
  onNewAppointment: () => void;
}

const DailyAppointments = ({ selectedDate, appointments, onNewAppointment }: DailyAppointmentsProps) => {
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
              <h4 className="font-medium">{apt.title}</h4>
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
