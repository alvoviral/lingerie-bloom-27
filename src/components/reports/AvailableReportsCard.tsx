
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const AvailableReportsCard = () => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Calendar className="mr-2 h-5 w-5" />
          Relatórios Disponíveis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          <div className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Análise de Lucratividade</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Comparativo de custos e receitas por produto
            </p>
          </div>
          <div className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Desempenho de Vendedores</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Métricas individuais da equipe de vendas
            </p>
          </div>
          <div className="border rounded-lg p-4 hover:bg-accent/50 cursor-pointer">
            <h4 className="font-medium">Retenção de Clientes</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Taxa de retorno e fidelidade dos clientes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
