
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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2 } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

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
  
  // User management state
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Ana Carolina",
      email: "ana@bellecharm.com.br",
      role: "Administrador",
      initials: "AC"
    },
    {
      id: "2",
      name: "Mariana Ribeiro",
      email: "mariana@bellecharm.com.br",
      role: "Vendedor",
      initials: "MR"
    }
  ]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});

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

  // User management functions
  const openEditDialog = (user: User) => {
    setCurrentUser(user);
    setEditedUser({...user});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: User) => {
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleUserEdit = () => {
    if (!currentUser || !editedUser.name || !editedUser.email || !editedUser.role) return;
    
    // Get initials from name
    const initials = editedUser.name
      .split(' ')
      .slice(0, 2)
      .map(name => name.charAt(0))
      .join('');
    
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === currentUser.id 
          ? { ...user, 
              name: editedUser.name || user.name, 
              email: editedUser.email || user.email, 
              role: editedUser.role || user.role,
              initials: initials
            } 
          : user
      )
    );
    
    setIsEditDialogOpen(false);
    toast.success("Usuário atualizado com sucesso!");
  };

  const handleUserDelete = () => {
    if (!currentUser) return;
    
    setUsers(prevUsers => prevUsers.filter(user => user.id !== currentUser.id));
    setIsDeleteDialogOpen(false);
    toast.success("Usuário excluído com sucesso!");
  };

  const handleEditChange = (field: keyof User, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
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
                      {users.map(user => (
                        <div key={user.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="h-10 w-10 rounded-full bg-lingerie-100 flex items-center justify-center">
                                <span className="font-medium text-lingerie-700">{user.initials}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{user.name}</h4>
                                <p className="text-sm text-muted-foreground">{user.email} ({user.role})</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => openEditDialog(user)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => openDeleteDialog(user)}
                              >
                                <Trash2 className="h-4 w-4 mr-1" />
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
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

      {/* Modal de Edição de Usuário */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="user-name">Nome</Label>
              <Input 
                id="user-name" 
                value={editedUser.name || ''}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-email">Email</Label>
              <Input 
                id="user-email" 
                type="email"
                value={editedUser.email || ''}
                onChange={(e) => handleEditChange('email', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="user-role">Função</Label>
              <Select 
                value={editedUser.role} 
                onValueChange={(value) => handleEditChange('role', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administrador">Administrador</SelectItem>
                  <SelectItem value="Vendedor">Vendedor</SelectItem>
                  <SelectItem value="Estoquista">Estoquista</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleUserEdit}>Salvar Alterações</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Usuário</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário "{currentUser?.name}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleUserDelete} className="bg-red-500 hover:bg-red-600">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
