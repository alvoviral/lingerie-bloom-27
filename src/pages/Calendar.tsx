import { useState, useEffect } from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { toast } from "sonner";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import AppointmentDialog from "@/components/calendar/AppointmentDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Appointment } from "@/types/calendar";
import { AppointmentFormValues } from "@/components/calendar/AppointmentForm";

// Chave para armazenamento local
const STORAGE_KEY = 'bellecharm_appointments';

// Dados iniciais de compromissos
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    title: "Atendimento com Maria",
    client: "Maria Silva",
    date: "2025-05-20",
    time: "14:30",
    notes: "Cliente gostaria de ver a nova coleção de lingerie",
  },
  {
    id: "2",
    title: "Reunião com fornecedor",
    client: "Distribuidora Moda Íntima",
    date: "2025-05-22",
    time: "10:00",
    notes: "Negociação de preços para próxima coleção",
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // For calendar navigation
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [appointmentIdToDelete, setAppointmentIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Agenda | BelleCharm";
  }, []);

  // Carregar compromissos do localStorage
  useEffect(() => {
    const loadAppointments = () => {
      const savedAppointments = localStorage.getItem(STORAGE_KEY);
      if (savedAppointments) {
        try {
          const parsedAppointments = JSON.parse(savedAppointments);
          setAppointments(parsedAppointments);
          console.log("Compromissos carregados do armazenamento local:", parsedAppointments.length);
        } catch (error) {
          console.error("Erro ao carregar compromissos:", error);
          setAppointments(INITIAL_APPOINTMENTS);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
        }
      } else {
        console.log("Nenhum compromisso encontrado, carregando dados iniciais");
        setAppointments(INITIAL_APPOINTMENTS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_APPOINTMENTS));
      }
    };

    loadAppointments();
  }, []);

  // Função para salvar compromissos no localStorage
  const saveAppointments = (updatedAppointments: Appointment[]) => {
    try {
      setAppointments(updatedAppointments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAppointments));
      console.log("Compromissos salvos no armazenamento local:", updatedAppointments.length);
    } catch (error) {
      console.error("Erro ao salvar compromissos:", error);
      toast.error("Erro ao salvar compromissos");
    }
  };

  // Filtra os compromissos para a data selecionada
  const dailyAppointments = appointments.filter(
    (apt) => apt.date === format(selectedDate, "yyyy-MM-dd")
  );

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setIsAppointmentDialogOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsAppointmentDialogOpen(true);
  };

  const handleDeleteAppointment = (id: string) => {
    const appointmentToDelete = appointments.find(apt => apt.id === id);
    setAppointmentIdToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (appointmentIdToDelete) {
      const updatedAppointments = appointments.filter(apt => apt.id !== appointmentIdToDelete);
      saveAppointments(updatedAppointments);
      setIsDeleteDialogOpen(false);
      setAppointmentIdToDelete(null);
      toast.success("Compromisso excluído com sucesso!");
      console.log("Compromisso excluído. Total de compromissos restantes:", updatedAppointments.length);
    }
  };

  const handleSaveAppointment = (values: AppointmentFormValues) => {
    const formattedDate = format(values.date, "yyyy-MM-dd");
    
    if (selectedAppointment) {
      // Edição
      const updatedAppointments = appointments.map(apt => 
        apt.id === selectedAppointment.id 
          ? { ...apt, ...values, date: formattedDate } 
          : apt
      );
      saveAppointments(updatedAppointments);
      toast.success("Compromisso atualizado com sucesso!");
    } else {
      // Novo compromisso
      const newAppointment: Appointment = {
        id: `${Date.now()}`,
        title: values.title,
        client: values.client,
        date: formattedDate,
        time: values.time,
        notes: values.notes,
      };
      saveAppointments([...appointments, newAppointment]);
      toast.success("Compromisso adicionado com sucesso!");
    }
    
    setIsAppointmentDialogOpen(false);
  };

  // Functions for calendar navigation
  const handlePreviousMonth = () => {
    const prevMonth = new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Agenda" 
            subtitle="Gerencie seus compromissos e atendimentos." 
          />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr,300px] gap-8">
            <MonthlyCalendar 
              currentDate={currentDate}
              selectedDate={selectedDate} 
              onDateSelect={setSelectedDate} 
              appointments={appointments}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />
            
            <div className="md:border-l pl-0 md:pl-8">
              <DailyAppointments 
                selectedDate={selectedDate}
                appointments={dailyAppointments}
                onNewAppointment={handleNewAppointment}
                onEditAppointment={handleEditAppointment}
                onDeleteAppointment={handleDeleteAppointment}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialog de compromisso */}
      <AppointmentDialog
        isOpen={isAppointmentDialogOpen}
        onOpenChange={setIsAppointmentDialogOpen}
        selectedDate={selectedDate}
        onSubmit={handleSaveAppointment}
        appointment={selectedAppointment}
      />

      {/* Dialog de confirmação de exclusão */}
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={appointments.find(apt => apt.id === appointmentIdToDelete)?.title || ""}
        itemType="compromisso"
      />
    </div>
  );
};

export default Calendar;
