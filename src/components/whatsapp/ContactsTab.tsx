
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, MessageSquare } from "lucide-react";
import ChatDialog from "./ChatDialog";

import { Customer, ConnectionState } from "./types";

interface ContactsTabProps {
  customers: Customer[];
  connectionState: ConnectionState;
}

const ContactsTab = ({ customers, connectionState }: ContactsTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

  const filteredCustomers = searchTerm 
    ? customers.filter(customer => 
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phoneNumber.includes(searchTerm)
      )
    : customers;

  const handleOpenChat = (customer: Customer) => {
    setSelectedCustomer(customer);
    setChatOpen(true);
  };

  return (
    <>
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button disabled={connectionState.status !== "connected"}>
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
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      Nenhum contato encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((customer) => (
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={connectionState.status !== "connected"}
                          onClick={() => handleOpenChat(customer)}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <ChatDialog 
        open={chatOpen} 
        onOpenChange={setChatOpen} 
        customer={selectedCustomer} 
        connectionState={connectionState}
      />
    </>
  );
};

export default ContactsTab;
