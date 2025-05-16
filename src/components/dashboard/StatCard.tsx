
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: number;
  className?: string;
  iconClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  iconClassName,
}: StatCardProps) => {
  return (
    <Card className={cn("hover-card overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-2xl font-bold font-playfair">{value}</h3>
            {description && (
              <p className="mt-1 text-xs text-muted-foreground">{description}</p>
            )}
            {typeof trend !== 'undefined' && (
              <div className="mt-2 flex items-center text-xs">
                <span
                  className={cn(
                    "inline-flex items-center",
                    trend > 0 ? "text-green-500" : "text-destructive"
                  )}
                >
                  {trend > 0 ? "▲" : "▼"} {Math.abs(trend)}%
                </span>
                <span className="ml-2 text-muted-foreground">vs mês anterior</span>
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-full bg-lingerie-100 dark:bg-lingerie-900/30", iconClassName)}>
            <Icon className="h-5 w-5 text-lingerie-600 dark:text-lingerie-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
