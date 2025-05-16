
import { format, addDays, startOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { pt } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthlyCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  appointments: Appointment[];
  onDateSelect: (date: Date) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

const MonthlyCalendar = ({ 
  currentDate, 
  selectedDate, 
  appointments, 
  onDateSelect,
  onPreviousMonth,
  onNextMonth
}: MonthlyCalendarProps) => {
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
        <Button variant="outline" onClick={onPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold">
          {format(currentDate, 'MMMM yyyy', { locale: pt })}
        </h2>
        <Button variant="outline" onClick={onNextMonth}>
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
              onClick={() => onDateSelect(day)}
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

export default MonthlyCalendar;
