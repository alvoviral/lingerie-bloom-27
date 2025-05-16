
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserSearch } from "lucide-react";
import { Customer } from "@/types/customer";
import { formatDate } from "@/utils/customerUtils";

interface CustomerTableProps {
  customers: Customer[];
  onViewCustomer: (customer: Customer) => void;
}

const CustomerTable = ({ customers, onViewCustomer }: CustomerTableProps) => {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Segmento</TableHead>
              <TableHead>Total Gasto</TableHead>
              <TableHead>Última Compra</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="font-medium">{customer.name}</div>
                  </TableCell>
                  <TableCell>
                    <div>{customer.email}</div>
                    <div className="text-sm text-muted-foreground">{customer.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-opacity-10"
                          style={{ 
                            backgroundColor: 
                              customer.segment === "VIP" ? "rgba(220, 38, 38, 0.1)" : 
                              customer.segment === "Premium" ? "rgba(79, 70, 229, 0.1)" : 
                              customer.segment === "Regular" ? "rgba(16, 185, 129, 0.1)" : "rgba(245, 158, 11, 0.1)",
                            color: 
                              customer.segment === "VIP" ? "rgb(220, 38, 38)" : 
                              customer.segment === "Premium" ? "rgb(79, 70, 229)" : 
                              customer.segment === "Regular" ? "rgb(16, 185, 129)" : "rgb(245, 158, 11)"
                          }}>
                      {customer.segment}
                    </div>
                  </TableCell>
                  <TableCell>
                    R$ {customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {formatDate(customer.lastPurchase)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => onViewCustomer(customer)}>
                      <UserSearch size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Nenhum cliente encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomerTable;
