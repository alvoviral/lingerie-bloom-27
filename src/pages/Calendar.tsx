
import { useState, useEffect } from "react";
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from "date-fns";
import { pt } from "date-fns/locale";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";

// Define validation schema for appointments
const appointmentFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  client: z.string().min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres" }),
  date: z.string().min(1, { message: "A data é obrigatória" }),
  time: z.string().min(1, { message: "O horário é obrigatório" }),
  notes: z.string().optional(),
});

// Define appointment type
type Appointment = {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  notes?: string;
};

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
      date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
      time: "10:00",
      notes: "Discutir nova remessa de produtos"
    }
  ]);

  useEffect(() => {
    document.title = "Agenda | BelleCharm";
  }, []);

  const form = useForm<z.infer<typeof appointmentFormSchema>>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      title: "",
      client: "",
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: "",
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof appointmentFormSchema>) => {
    const newAppointment = {
      id: Date.now().toString(),
      ...values,
    };
    
    setAppointments([...appointments, newAppointment]);
    setIsDialogOpen(false);
    toast.success("Compromisso adicionado com sucesso!");
    form.reset();
  };

  const handleNewAppointment = () => {
    form.setValue("date", format(selectedDate, 'yyyy-MM-dd'));
    setIsDialogOpen(true);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    
    const days = eachDayOfInterval({
      start: startDate,
      end: addDays(monthEnd, 42 - (eachDayOfInterval({ start: startDate, end: monthEnd }).length))
    });

    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy', { locale: pt })}
          </h2>
          <Button variant="outline" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center py-2 font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          
          {days.map((day, idx) => {
            const formattedDate = format(day, 'yyyy-MM-dd');
            const dayAppointments = appointments.filter(apt => apt.date === formattedDate);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isSelected = isSameDay(day, selectedDate);
            
            return (
              <div 
                key={idx} 
                className={`
                  min-h-[100px] border p-1 relative hover:bg-accent/50 transition-colors cursor-pointer
                  ${!isCurrentMonth ? 'text-muted-foreground bg-muted/50' : ''}
                  ${isSelected ? 'bg-accent/70' : ''}
                `}
                onClick={() => setSelectedDate(day)}
              >
                <div className="text-right mb-1">
                  <span className="text-sm">{format(day, 'd')}</span>
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 2).map(apt => (
                    <div key={apt.id} className="text-xs bg-primary/80 text-white p-1 rounded truncate">
                      {apt.time} - {apt.title}
                    </div>
                  ))}
                  {dayAppointments.length > 2 && (
                    <div className="text-xs text-muted-foreground">
                      + {dayAppointments.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
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
                  {renderCalendar()}
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {format(selectedDate, "d 'de' MMMM", { locale: pt })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedDateAppointments.map(apt => (
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
                      <Button variant="outline" className="mt-2" onClick={handleNewAppointment}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Novo Compromisso</DialogTitle>
            <DialogDescription>
              Adicione os detalhes do compromisso. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Sessão de fotos" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detalhes adicionais..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Informações adicionais sobre o compromisso
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Calendar;
