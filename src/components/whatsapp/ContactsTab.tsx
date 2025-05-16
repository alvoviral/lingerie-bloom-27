
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  lastPurchase?: string;
  tags: string[];
}

interface ContactsTabProps {
  customers: Customer[];
  connectionStatus: "connected" | "disconnected" | "connecting";
}

const ContactsTab = ({ customers, connectionStatus }: ContactsTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Contatos</CardTitle>
        <CardDescription>
          Gerencie seus contatos do WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <Input
              placeholder="Buscar contatos..."
              className="pl-8 w-[300px]"
            />
          </div>
          
          <Button disabled={connectionStatus !== "connected"}>
            <Users className="mr-2 h-4 w-4" />
            Importar Contatos
          </Button>
        </div>
        
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Última Compra</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.lastPurchase || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {customer.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" disabled={connectionStatus !== "connected"}>
                      Enviar Mensagem
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactsTab;
