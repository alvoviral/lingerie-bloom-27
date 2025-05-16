
export type Appointment = {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  notes?: string;
};

// Export AppointmentFormValues directly from the type definition
export type AppointmentFormValues = {
  title: string;
  client: string;
  date: string;
  time: string;
  notes?: string;
};
