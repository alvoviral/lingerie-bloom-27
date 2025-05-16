
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchBar = ({ value, onChange, className = "" }: SearchBarProps) => {
  return (
    <div className={`relative w-48 md:w-64 ${className}`}>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Pesquisar..."
        className="pl-8"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;
