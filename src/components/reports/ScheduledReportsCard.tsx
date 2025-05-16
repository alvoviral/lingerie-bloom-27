
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export const ScheduledReportsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-xl">
          <Clock className="mr-2 h-5 w-5" />
          Relatórios Agendados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Relatório Mensal de Vendas</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Enviado todo dia 1 do mês - Próximo: 01/06/2025
            </p>
          </div>
          <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Análise de Estoque Semanal</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Enviado toda segunda-feira - Próximo: 19/05/2025
            </p>
          </div>
          <div className="border rounded-lg p-3 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Desempenho de Marketing</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Enviado dia 15 do mês - Próximo: 15/05/2025
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
