
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeframeSelectorProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export const TimeframeSelector = ({ 
  defaultValue = "anual", 
  onValueChange 
}: TimeframeSelectorProps) => {
  const [timeframe, setTimeframe] = useState<string>(defaultValue);

  const handleValueChange = (value: string) => {
    setTimeframe(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <div className="flex items-center">
      <span className="mr-2 text-sm text-muted-foreground">Período:</span>
      <Select 
        defaultValue={timeframe} 
        onValueChange={handleValueChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecione o período" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mensal">Mensal</SelectItem>
          <SelectItem value="trimestral">Trimestral</SelectItem>
          <SelectItem value="semestral">Semestral</SelectItem>
          <SelectItem value="anual">Anual</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
