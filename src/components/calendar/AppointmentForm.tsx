
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Appointment } from "@/types/calendar";
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
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useEffect } from "react";

// Define validation schema for appointments
const appointmentFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  client: z.string().min(2, { message: "O nome do cliente deve ter pelo menos 2 caracteres" }),
  date: z.string().min(1, { message: "A data é obrigatória" }),
  time: z.string().min(1, { message: "O horário é obrigatório" }),
  notes: z.string().optional(),
});

export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

interface AppointmentFormProps {
  selectedDate: Date;
  onSubmit: (values: AppointmentFormValues) => void;
  appointment: Appointment | null;
}

export const AppointmentForm = ({ selectedDate, onSubmit, appointment }: AppointmentFormProps) => {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      title: "",
      client: "",
      date: format(selectedDate, 'yyyy-MM-dd'),
      time: "",
      notes: "",
    },
  });
  
  // Reset form when editing appointment changes
  useEffect(() => {
    if (appointment) {
      form.reset({
        title: appointment.title,
        client: appointment.client,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes || "",
      });
    } else {
      form.reset({
        title: "",
        client: "",
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: "",
        notes: "",
      });
    }
  }, [appointment, selectedDate, form]);

  return (
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
          <Button type="submit">{appointment ? 'Salvar alterações' : 'Salvar'}</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AppointmentForm;
