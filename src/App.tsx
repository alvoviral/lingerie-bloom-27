
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "sonner";
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Calendar from './pages/Calendar';
import Customers from './pages/Customers';
import Inventory from './pages/Inventory';
import Sales from './pages/Sales';
import Finance from './pages/Finance';
import Marketplaces from './pages/Marketplaces';
import Whatsapp from './pages/Whatsapp';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { ThemeProvider } from "./components/ui/theme-provider";
import { NotificationProvider } from "./contexts/NotificationContext";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <NotificationProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/relatorios" element={<Reports />} />
            <Route path="/dashboard/agenda" element={<Calendar />} />
            <Route path="/dashboard/clientes" element={<Customers />} />
            <Route path="/dashboard/estoque" element={<Inventory />} />
            <Route path="/dashboard/vendas" element={<Sales />} />
            <Route path="/dashboard/financas" element={<Finance />} />
            <Route path="/dashboard/marketplaces" element={<Marketplaces />} />
            <Route path="/dashboard/whatsapp" element={<Whatsapp />} />
            <Route path="/dashboard/configuracoes" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster position="top-right" />
        </Router>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
