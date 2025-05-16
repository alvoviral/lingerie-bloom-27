
import { useState, useEffect } from "react";
import { format, addMonths, subMonths } from "date-fns";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Appointment } from "@/types/calendar";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import AppointmentDialog from "@/components/calendar/AppointmentDialog";
import { AppointmentFormValues } from "@/components/calendar/AppointmentForm";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: "1",
      title: "Sessão de fotos",
      client: "Maria Silva",
      date: format(new Date(), 'yyyy-MM-dd'),
      time: "14:00",
      notes: "Trazer as peças da nova coleção"
    },
    {
      id: "2",
      title: "Reunião com fornecedor",
      client: "Fornecedor ABC",
      date: format(addMonths(new Date(), 0), 'yyyy-MM-dd'),
      time: "10:00",
      notes: "Discutir nova remessa de produtos"
    }
  ]);

  useEffect(() => {
    document.title = "Agenda | BelleCharm";
  }, []);

  const handleNewAppointment = () => {
    setIsDialogOpen(true);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const onSubmit = (values: AppointmentFormValues) => {
    // Create a new appointment with required fields defined explicitly
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: values.title,
      client: values.client,
      date: values.date,
      time: values.time,
      notes: values.notes,
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    toast.success("Compromisso adicionado com sucesso!");
  };

  const selectedDateAppointments = appointments.filter(
    apt => apt.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Agenda" 
            subtitle="Organize suas atividades e compromissos." 
          />
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xl">Calendário</CardTitle>
                  <Button onClick={handleNewAppointment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Compromisso
                  </Button>
                </CardHeader>
                <CardContent>
                  <MonthlyCalendar 
                    currentDate={currentDate}
                    selectedDate={selectedDate}
                    appointments={appointments}
                    onDateSelect={setSelectedDate}
                    onPreviousMonth={handlePreviousMonth}
                    onNextMonth={handleNextMonth}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Compromissos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DailyAppointments
                    selectedDate={selectedDate}
                    appointments={selectedDateAppointments}
                    onNewAppointment={handleNewAppointment}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AppointmentDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedDate={selectedDate}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Calendar;
