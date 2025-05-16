
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  firstName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  lastName: z.string().min(2, "Sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido").optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    }
  });

  // Carregar dados do usuário quando a página é carregada
  useEffect(() => {
    document.title = "Perfil | BelleCharm";
    
    const fetchUserData = async () => {
      setIsLoading(true);
      
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("Usuário não encontrado");
          navigate("/");
          return;
        }
        
        setUser(user);
        
        // Tenta recuperar o perfil do usuário se existir
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("Erro ao buscar perfil:", error);
          toast.error("Erro ao buscar dados do perfil");
          return;
        }
          
        if (profile) {
          form.reset({
            firstName: profile.first_name || "",
            lastName: profile.last_name || "",
            email: user.email || "",
          });
          
          // Se houver um avatar, tentar buscar a URL
          if (profile.avatar_url) {
            try {
              const { data } = await supabase.storage
                .from('avatars')
                .getPublicUrl(profile.avatar_url);
              
              if (data) {
                setAvatarUrl(data.publicUrl);
              }
            } catch (error) {
              console.error("Erro ao buscar avatar:", error);
            }
          }
        } else {
          // Se não houver perfil, preencher apenas com o email
          form.reset({
            firstName: "",
            lastName: "",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        toast.error("Erro ao carregar dados do usuário");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Verifica se o perfil já existe
      const { data: existingProfile, error: checkError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle(); // Usando maybeSingle em vez de single para evitar erros
      
      if (checkError) {
        throw checkError;
      }
      
      if (existingProfile) {
        // Atualiza o perfil existente
        const { error } = await supabase
          .from('profiles')
          .update({
            first_name: values.firstName,
            last_name: values.lastName,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
      } else {
        // Cria um novo perfil
        const { error } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,  // Correção: usar user_id em vez de id
            full_name: `${values.firstName} ${values.lastName}`,
            first_name: values.firstName,
            last_name: values.lastName,
          });
        
        if (error) throw error;
      }
      
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length || !user) {
      return;
    }
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}.${fileExt}`;
    
    setIsLoading(true);
    
    try {
      // Upload do arquivo para o bucket de avatares
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true,
        });
      
      if (uploadError) throw uploadError;
      
      // Atualiza o perfil com a URL do avatar
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          avatar_url: fileName,
        })
        .eq('id', user.id);
      
      if (updateError) throw updateError;
      
      // Recupera a URL pública
      const { data: urlData } = await supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      if (urlData) {
        setAvatarUrl(urlData.publicUrl);
      }
      
      toast.success("Avatar atualizado com sucesso");
    } catch (error: any) {
      console.error("Erro ao fazer upload da imagem:", error);
      let errorMessage = "Erro ao fazer upload da imagem";
      
      // Mensagens de erro mais específicas
      if (error.message?.includes("bucket not found")) {
        errorMessage = "Bucket de armazenamento não encontrado";
      } else if (error.message?.includes("permission")) {
        errorMessage = "Sem permissão para upload de arquivos";
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const userInitials = () => {
    const firstName = form.watch("firstName");
    const lastName = form.watch("lastName");
    
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    
    return "UR"; // User Round como fallback
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="hidden md:block w-64 flex-shrink-0" />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <Header 
            title="Perfil" 
            subtitle="Gerencie suas informações pessoais"
          />
          
          <div className="mt-8 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      {avatarUrl ? (
                        <AvatarImage src={avatarUrl} alt="Foto de perfil" />
                      ) : null}
                      <AvatarFallback className="bg-lingerie-200 text-lingerie-700 text-2xl">
                        {userInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-lingerie-500 text-white p-2 rounded-full cursor-pointer hover:bg-lingerie-600"
                    >
                      <Pencil className="h-4 w-4" />
                      <input 
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={isLoading}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Clique no ícone para alterar sua foto</p>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Seu nome" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sobrenome</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Seu sobrenome" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} disabled placeholder="seu@email.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <Button variant="outline" onClick={() => navigate("/dashboard")}>
                  Voltar ao Dashboard
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
