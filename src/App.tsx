import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Finance from './pages/Finance';
import Marketplaces from './pages/Marketplaces';
import Calendar from './pages/Calendar';
import Whatsapp from './pages/Whatsapp';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { Toaster } from 'sonner';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <NotificationProvider>
          <CustomerProvider>
            <Toaster />
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/vendas" element={<Sales />} />
                <Route path="/dashboard/estoque" element={<Inventory />} />
                <Route path="/dashboard/clientes" element={<Customers />} />
                <Route path="/dashboard/financeiro" element={<Finance />} />
                <Route path="/dashboard/marketplaces" element={<Marketplaces />} />
                <Route path="/dashboard/calendario" element={<Calendar />} />
                <Route path="/dashboard/whatsapp" element={<Whatsapp />} />
                <Route path="/dashboard/relatorios" element={<Reports />} />
                <Route path="/dashboard/configuracoes" element={<Settings />} />
                <Route path="/dashboard/perfil" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </CustomerProvider>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
