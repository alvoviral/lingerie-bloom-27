
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
import { Alert, AlertDescription } from "@/components/ui/alert";

// Form schema using zod for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "Por favor, informe sua senha" }),
});

type LoginValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const LoginForm = ({ isLoading, setIsLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Create form with react-hook-form and zod validation
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginValues) => {
    try {
      setIsLoading(true);
      setLoginError(null);
      
      console.log("Tentando login com:", values.email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error("Erro de autenticação:", error.message);
        throw error;
      }
      
      console.log("Login bem-sucedido:", data);
      toast.success("Login realizado com sucesso!");
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      
      setLoginError("Email ou senha incorretos. Verifique suas credenciais e tente novamente.");
      
      // Handle specific error messages
      if (error.message?.includes("Invalid login credentials")) {
        setLoginError("Email ou senha incorretos. Verifique suas credenciais e tente novamente.");
      } else if (error.message?.includes("Email not confirmed")) {
        setLoginError("Por favor, confirme seu email antes de fazer login");
      } else {
        setLoginError(error.message || "Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
        {loginError && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        
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
                    className="pl-4 pr-10 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
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
          {isLoading ? "Processando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
