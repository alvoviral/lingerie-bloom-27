
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const Settings = () => {
  useEffect(() => {
    document.title = "Configurações | BelleCharm";
  }, []);

  const [storeSettings, setStoreSettings] = useState({
    storeName: "BelleCharm Lingerie",
    email: "contato@bellecharm.com.br",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123 - São Paulo, SP"
  });

  const [notificationSettings, setNotificationSettings] = useState({
    salesNotifications: true,
    lowStockNotifications: true,
    customerMessagesNotifications: false,
    financialReportsNotifications: true
  });

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationToggle = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const saveStoreSettings = () => {
    // Simular salvamento
    toast.success("Configurações da loja atualizadas com sucesso!");
  };

  const saveNotificationSettings = () => {
    // Simular salvamento
    toast.success("Configurações de notificações atualizadas com sucesso!");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Configurações" 
            subtitle="Personalize o sistema de acordo com suas necessidades." 
          />
          
          <div className="mt-8">
            <Tabs defaultValue="store" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="store">Informações da Loja</TabsTrigger>
                <TabsTrigger value="notifications">Notificações</TabsTrigger>
                <TabsTrigger value="integrations">Integrações</TabsTrigger>
                <TabsTrigger value="users">Usuários</TabsTrigger>
              </TabsList>
              
              <TabsContent value="store">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações da Loja</CardTitle>
                    <CardDescription>
                      Atualize as informações básicas da sua loja.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="storeName">Nome da Loja</Label>
                      <Input 
                        id="storeName" 
                        name="storeName"
                        value={storeSettings.storeName} 
                        onChange={handleStoreSettingsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail de Contato</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        value={storeSettings.email} 
                        onChange={handleStoreSettingsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input 
                        id="phone" 
                        name="phone"
                        value={storeSettings.phone} 
                        onChange={handleStoreSettingsChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço</Label>
                      <Input 
                        id="address" 
                        name="address"
                        value={storeSettings.address} 
                        onChange={handleStoreSettingsChange}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={saveStoreSettings}>Salvar Alterações</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de Notificações</CardTitle>
                    <CardDescription>
                      Decida quais notificações você deseja receber.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Notificações de Vendas</p>
                        <p className="text-sm text-muted-foreground">Receba alertas quando houver novas vendas.</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.salesNotifications}
                        onCheckedChange={() => handleNotificationToggle('salesNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Estoque Baixo</p>
                        <p className="text-sm text-muted-foreground">Receba alertas quando produtos estiverem com estoque baixo.</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.lowStockNotifications}
                        onCheckedChange={() => handleNotificationToggle('lowStockNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Mensagens de Clientes</p>
                        <p className="text-sm text-muted-foreground">Receba alertas para novas mensagens de clientes.</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.customerMessagesNotifications}
                        onCheckedChange={() => handleNotificationToggle('customerMessagesNotifications')}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Relatórios Financeiros</p>
                        <p className="text-sm text-muted-foreground">Receba relatórios financeiros periódicos.</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.financialReportsNotifications}
                        onCheckedChange={() => handleNotificationToggle('financialReportsNotifications')}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={saveNotificationSettings}>Salvar Preferências</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="integrations">
                <Card>
                  <CardHeader>
                    <CardTitle>Integrações</CardTitle>
                    <CardDescription>
                      Configure integrações com outros serviços.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                            <span className="font-medium text-lingerie-700">ML</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Mercado Livre</h4>
                            <p className="text-sm text-muted-foreground">Conecte sua conta do Mercado Livre</p>
                          </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                            <span className="font-medium text-lingerie-700">SP</span>
                          </div>
                          <div>
                            <h4 className="font-medium">Shopee</h4>
                            <p className="text-sm text-muted-foreground">Conecte sua conta da Shopee</p>
                          </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                            <span className="font-medium text-lingerie-700">WA</span>
                          </div>
                          <div>
                            <h4 className="font-medium">WhatsApp API</h4>
                            <p className="text-sm text-muted-foreground">Conecte sua API de WhatsApp Business</p>
                          </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Gerenciamento de Usuários</CardTitle>
                    <CardDescription>
                      Gerencie usuários com acesso ao sistema.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                              <span className="font-medium text-lingerie-700">AC</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Ana Carolina</h4>
                              <p className="text-sm text-muted-foreground">ana@bellecharm.com.br (Administrador)</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                              <span className="font-medium text-lingerie-700">MR</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Mariana Ribeiro</h4>
                              <p className="text-sm text-muted-foreground">mariana@bellecharm.com.br (Vendedor)</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">Editar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Adicionar Usuário</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
