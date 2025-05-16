
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";

interface AutomationItem {
  title: string;
  description: string;
  active: boolean;
}

interface AutomationTabProps {
  connectionStatus: "connected" | "disconnected" | "connecting";
}

const AutomationTab = ({ connectionStatus }: AutomationTabProps) => {
  const automations: AutomationItem[] = [
    {
      title: "Pós-Compra",
      description: "Envie mensagem após a conclusão de uma compra",
      active: true
    },
    {
      title: "Aniversário",
      description: "Envie uma mensagem no aniversário do cliente",
      active: true
    },
    {
      title: "Cliente Inativo",
      description: "Envie uma mensagem para clientes inativos há mais de 30 dias",
      active: false
    },
    {
      title: "Confirmação de Envio",
      description: "Notifique quando o pedido for enviado",
      active: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configurações de Automação</CardTitle>
        <CardDescription>
          Configure mensagens automáticas para diversas situações.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {automations.map((automation, index) => (
            <div key={index} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{automation.title}</h4>
                  <p className="text-sm text-muted-foreground">{automation.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={automation.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} 
                    variant="outline"
                  >
                    {automation.active ? "Ativo" : "Inativo"}
                  </Badge>
                  <Button variant="outline" size="sm" disabled={connectionStatus !== "connected"}>
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button disabled={connectionStatus !== "connected"}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Automação
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AutomationTab;
