
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MonthlyCalendar from "@/components/calendar/MonthlyCalendar";
import DailyAppointments from "@/components/calendar/DailyAppointments";
import AppointmentDialog from "@/components/calendar/AppointmentDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import { Appointment } from "@/types/calendar";
import { AppointmentFormValues } from "@/components/calendar/AppointmentForm";

const STORAGE_KEY = "bellecharm-appointments";

const initialMockAppointments: Appointment[] = [
  {
    id: "1",
    title: "Consulta de Rotina",
    client: "Maria Silva",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    notes: "Verificar pressão e níveis de glicose.",
  },
  {
    id: "2",
    title: "Design de Sobrancelhas",
    client: "Ana Paula",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "14:30",
    notes: "Trazer referências de design desejado.",
  },
  {
    id: "3",
    title: "Manutenção de Unhas em Gel",
    client: "Carla Zambelli",
    date: format(new Date(new Date().setDate(new Date().getDate() + 1)), "yyyy-MM-dd"),
    time: "16:00",
    notes: "Cor: nude clássico.",
  },
];

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); // For calendar navigation
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Load appointments from localStorage on component mount
    const storedAppointments = localStorage.getItem(STORAGE_KEY);
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      // If no appointments in localStorage, initialize with mock appointments
      setAppointments(initialMockAppointments);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockAppointments));
    }
  }, []);

  useEffect(() => {
    // Save appointments to localStorage whenever the appointments state changes
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const openAppointmentDialog = () => {
    setIsAppointmentDialogOpen(true);
    setIsEditing(false);
  };

  const closeAppointmentDialog = () => {
    setIsAppointmentDialogOpen(false);
    setSelectedAppointment(null);
  };

  const handleCreateAppointment = (values: AppointmentFormValues) => {
    const newAppointment: Appointment = {
      id: uuidv4(),
      title: values.title,
      client: values.client,
      date: format(new Date(values.date), "yyyy-MM-dd"),
      time: values.time,
      notes: values.notes,
    };
    setAppointments([...appointments, newAppointment]);
    closeAppointmentDialog();
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsEditing(true);
    setIsAppointmentDialogOpen(true);
  };

  const handleUpdateAppointment = (values: AppointmentFormValues) => {
    if (!selectedAppointment) return;

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === selectedAppointment.id
        ? { 
            ...appointment, 
            title: values.title,
            client: values.client,
            date: format(new Date(values.date), "yyyy-MM-dd"),
            time: values.time,
            notes: values.notes,
          }
        : appointment
    );
    setAppointments(updatedAppointments);
    closeAppointmentDialog();
  };

  const handleDeleteAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAppointment) {
      setAppointments(appointments.filter((appointment) => appointment.id !== selectedAppointment.id));
      setIsDeleteDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setSelectedAppointment(null);
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
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Agenda" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          <div className="container mx-auto">
            <div className="mb-4">
              <button
                className="bg-lingerie-600 text-white font-bold py-2 px-4 rounded hover:bg-lingerie-800 transition-colors"
                onClick={openAppointmentDialog}
              >
                Novo Agendamento
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MonthlyCalendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                appointments={appointments}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
              />
              <DailyAppointments
                selectedDate={selectedDate}
                appointments={appointments}
                onEdit={handleEditAppointment}
                onDelete={handleDeleteAppointment}
                onNewAppointment={openAppointmentDialog}
              />
            </div>
          </div>
        </main>
        <AppointmentDialog
          isOpen={isAppointmentDialogOpen}
          onClose={closeAppointmentDialog}
          onCreate={handleCreateAppointment}
          onUpdate={handleUpdateAppointment}
          appointment={selectedAppointment}
          isEditing={isEditing}
        />
        {selectedAppointment && (
          <DeleteConfirmationDialog
            isOpen={isDeleteDialogOpen}
            onClose={cancelDelete}
            onConfirm={confirmDelete}
            itemName={selectedAppointment.title}
            itemType="agendamento"
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;
