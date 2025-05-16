
export type Appointment = {
  id: string;
  title: string;
  client: string;
  date: string;
  time: string;
  notes?: string;
};

export type AppointmentFormValues = {
  title: string;
  client: string;
  date: string;
  time: string;
  notes?: string;
};
