
import React from "react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Appointment } from "@/types/calendar";

export interface MonthlyCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  appointments: Appointment[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const MonthlyCalendar = ({
  currentDate,
  selectedDate,
  onDateSelect,
  appointments,
  onPreviousMonth,
  onNextMonth
}: MonthlyCalendarProps) => {

  // Function to get appointments for a specific day
  const getDayAppointments = (day: Date) => {
    return appointments.filter(appointment => {
      const appDate = new Date(appointment.date);
      return (
        appDate.getDate() === day.getDate() &&
        appDate.getMonth() === day.getMonth() &&
        appDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <CardTitle className="text-xl font-bold">
          {format(currentDate, "MMMM yyyy", { locale: pt })}
        </CardTitle>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" onClick={onPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => date && onDateSelect(date)}
          month={currentDate}
          locale={pt}
          modifiers={{
            hasAppointment: (date) => getDayAppointments(date).length > 0,
          }}
          modifiersStyles={{
            hasAppointment: { 
              fontWeight: 'bold', 
              textDecoration: 'underline', 
              color: 'var(--lingerie-600)' 
            },
          }}
          className="rounded"
        />
      </CardContent>
    </Card>
  );
};

export default MonthlyCalendar;
