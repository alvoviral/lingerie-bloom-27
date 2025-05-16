
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Finance from "./pages/Finance";
import Sales from "./pages/Sales";
import Customers from "./pages/Customers";
import Whatsapp from "./pages/Whatsapp";
import Marketplaces from "./pages/Marketplaces";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/estoque" element={<Inventory />} />
          <Route path="/dashboard/financas" element={<Finance />} />
          <Route path="/dashboard/vendas" element={<Sales />} />
          <Route path="/dashboard/clientes" element={<Customers />} />
          <Route path="/dashboard/whatsapp" element={<Whatsapp />} />
          <Route path="/dashboard/marketplaces" element={<Marketplaces />} />
          <Route path="/dashboard/agenda" element={<Calendar />} />
          <Route path="/dashboard/relatorios" element={<Reports />} />
          <Route path="/dashboard/configuracoes" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
