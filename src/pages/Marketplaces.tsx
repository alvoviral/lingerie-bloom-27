
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShoppingBag, Store, Link, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Define the validation schema for API credentials
const apiFormSchema = z.object({
  apiKey: z.string().min(1, {
    message: "A chave API é obrigatória.",
  }),
  apiSecret: z.string().optional(),
});

type MarketplaceType = {
  id: string;
  name: string;
  logo: React.ReactNode;
  description: string;
  connected: boolean;
  stats?: {
    sales?: number;
    revenue?: number;
    orders?: number;
  };
};

const Marketplaces = () => {
  const [marketplaces, setMarketplaces] = useState<MarketplaceType[]>([
    {
      id: "shopee",
      name: "Shopee",
      logo: <ShoppingBag className="h-6 w-6 text-orange-500" />,
      description: "Conecte-se à maior plataforma de e-commerce do Sudeste Asiático.",
      connected: false,
    },
    {
      id: "mercadolivre",
      name: "Mercado Livre",
      logo: <ShoppingBag className="h-6 w-6 text-yellow-500" />,
      description: "Integre com o maior marketplace da América Latina.",
      connected: false,
    },
    {
      id: "magalu",
      name: "Magazine Luiza",
      logo: <Store className="h-6 w-6 text-blue-500" />,
      description: "Conecte-se a uma das maiores redes varejistas do Brasil.",
      connected: false,
    },
    {
      id: "casasbahia",
      name: "Casas Bahia",
      logo: <Store className="h-6 w-6 text-red-500" />,
      description: "Integre-se com uma das maiores redes de varejo do país.",
      connected: false,
    },
  ]);

  const [openItems, setOpenItems] = useState<string[]>([]);
  const [syncing, setSyncing] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  // Initialize form for handling API key submissions
  const form = useForm<z.infer<typeof apiFormSchema>>({
    resolver: zodResolver(apiFormSchema),
    defaultValues: {
      apiKey: "",
      apiSecret: "",
    },
  });

  // Handle API connection submission
  const onSubmit = (values: z.infer<typeof apiFormSchema>, marketplaceId: string) => {
    // In a real app, this would send the API key to your backend
    console.log(`Connecting to ${marketplaceId} with:`, values);
    
    toast.success(`Marketplace ${marketplaceId} conectado com sucesso!`);
    
    // Update marketplace connection status
    setMarketplaces(
      marketplaces.map((marketplace) => {
        if (marketplace.id === marketplaceId) {
          return {
            ...marketplace,
            connected: true,
            stats: {
              sales: Math.floor(Math.random() * 100),
              revenue: Math.floor(Math.random() * 10000),
              orders: Math.floor(Math.random() * 50),
            },
          };
        }
        return marketplace;
      })
    );
    
    // Close the collapsible after connecting
    setOpenItems((current) => current.filter((item) => item !== marketplaceId));
    
    // Reset form
    form.reset();
  };

  const handleSync = (marketplaceId: string) => {
    // In a real app, this would trigger a synchronization with the marketplace API
    setSyncing(marketplaceId);
    
    // Simulate API call delay
    setTimeout(() => {
      setSyncing(null);
      toast.success(`Dados do ${marketplaces.find(m => m.id === marketplaceId)?.name} sincronizados com sucesso!`);
      
      // Update stats with new random data to simulate sync
      setMarketplaces(
        marketplaces.map((marketplace) => {
          if (marketplace.id === marketplaceId) {
            return {
              ...marketplace,
              stats: {
                sales: Math.floor(Math.random() * 100),
                revenue: Math.floor(Math.random() * 10000),
                orders: Math.floor(Math.random() * 50),
              },
            };
          }
          return marketplace;
        })
      );
    }, 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Marketplaces" 
            subtitle="Integre e gerencie suas vendas em marketplaces." 
          />
          
          <div className="mt-8 grid gap-6">
            {marketplaces.map((marketplace) => (
              <Card key={marketplace.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-2">
                    {marketplace.logo}
                    <CardTitle>{marketplace.name}</CardTitle>
                  </div>
                  {marketplace.connected && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSync(marketplace.id)}
                      disabled={syncing === marketplace.id}
                    >
                      {syncing === marketplace.id ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Sincronizando...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Sincronizar
                        </>
                      )}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <CardDescription>{marketplace.description}</CardDescription>
                  
                  {marketplace.connected && marketplace.stats && (
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm font-medium">Vendas</p>
                        <p className="text-2xl font-bold">{marketplace.stats.sales}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm font-medium">Faturamento</p>
                        <p className="text-2xl font-bold">R$ {marketplace.stats.revenue?.toLocaleString('pt-BR')}</p>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-md">
                        <p className="text-sm font-medium">Pedidos</p>
                        <p className="text-2xl font-bold">{marketplace.stats.orders}</p>
                      </div>
                    </div>
                  )}
                  
                  {!marketplace.connected && (
                    <Collapsible
                      open={openItems.includes(marketplace.id)}
                      onOpenChange={() => toggleItem(marketplace.id)}
                      className="mt-4"
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Link className="mr-2 h-4 w-4" />
                          Conectar API
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-4">
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit((values) => onSubmit(values, marketplace.id))} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="apiKey"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Chave API</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Digite sua chave API" {...field} />
                                  </FormControl>
                                  <FormDescription>
                                    Você pode encontrar sua chave API no painel do {marketplace.name}.
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="apiSecret"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Secret (Opcional)</FormLabel>
                                  <FormControl>
                                    <Input type="password" placeholder="Digite seu secret" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button type="submit">Conectar</Button>
                          </form>
                        </Form>
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
                {marketplace.connected && (
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                      onClick={() => {
                        setMarketplaces(
                          marketplaces.map((m) => {
                            if (m.id === marketplace.id) {
                              return {
                                ...m,
                                connected: false,
                                stats: undefined,
                              };
                            }
                            return m;
                          })
                        );
                        toast.info(`${marketplace.name} desconectado.`);
                      }}
                    >
                      Desconectar
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplaces;
