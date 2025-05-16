
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema using zod for validation
const signUpSchema = z.object({
  firstName: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }).optional(),
  lastName: z.string().min(2, { message: "Sobrenome deve ter pelo menos 2 caracteres" }).optional(),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type SignUpValues = z.infer<typeof signUpSchema>;

interface SignUpFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  setMode: (mode: 'login' | 'signup') => void;
}

const SignUpForm = ({ isLoading, setIsLoading, setMode }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Create form with react-hook-form and zod validation
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: SignUpValues) => {
    try {
      setIsLoading(true);
      
      if (!values.email || !values.password) {
        toast.error("Preencha email e senha para se cadastrar");
        return;
      }
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName || "",
            last_name: values.lastName || "",
            full_name: `${values.firstName || ""} ${values.lastName || ""}`.trim()
          },
          emailRedirectTo: window.location.origin + '/dashboard'
        }
      });
      
      if (error) {
        throw error;
      }
      
      if (data.user && data.session) {
        toast.success("Cadastro e login realizados com sucesso!");
        navigate('/dashboard');
      } else {
        toast.success("Cadastro realizado! Verifique seu email para confirmar.");
      }
    } catch (error: any) {
      console.error("Erro ao fazer cadastro:", error);
      
      // Handle specific error messages
      if (error.message.includes("User already registered")) {
        toast.error("Este email já está cadastrado. Tente fazer login.");
        setMode('login');
      } else {
        toast.error(error.message || "Erro ao criar conta");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Nome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Seu nome"
                      className="pl-4 pr-4 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 ml-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Sobrenome</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Seu sobrenome"
                      className="pl-4 pr-4 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                      disabled={isLoading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500 ml-1" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Seu Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    className="pl-4 pr-4 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                    disabled={isLoading}
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500 ml-1" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha secreta"
                    className="pl-4 pr-4 py-10 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                    disabled={isLoading}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lingerie-400 hover:text-lingerie-600 transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-xs text-red-500 ml-1" />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-lingerie-500 hover:bg-lingerie-600 text-white font-montserrat py-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <Sparkles className="h-5 w-5" />
          {isLoading ? "Processando..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
