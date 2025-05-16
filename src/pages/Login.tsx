
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema using zod for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Create form with react-hook-form and zod validation
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/dashboard');
      }
    };
    
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate('/dashboard');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (values: LoginValues) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Login realizado com sucesso!");
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      
      // Handle specific error messages
      if (error.message.includes("Invalid login credentials")) {
        toast.error("Email ou senha incorretos");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Por favor, confirme seu email antes de fazer login");
      } else {
        toast.error(error.message || "Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const values = form.getValues();
      
      if (!values.email || !values.password) {
        toast.error("Preencha email e senha para se cadastrar");
        return;
      }
      
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: "",
            last_name: ""
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Cadastro realizado com sucesso! Verifique seu email para confirmar.");
    } catch (error: any) {
      console.error("Erro ao fazer cadastro:", error);
      
      // Handle specific error messages
      if (error.message.includes("User already registered")) {
        toast.error("Este email já está cadastrado");
      } else {
        toast.error(error.message || "Erro ao criar conta");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lingerie-50 to-lavender-100">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 rounded-full bg-lingerie-200/40 animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 rounded-full bg-lavender-200/30 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      <div className="fixed top-1/3 right-20 w-16 h-16 rounded-full bg-cream-100/30 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      
      <div className="w-full max-w-md px-10 py-12 rounded-2xl shadow-xl glass-effect backdrop-blur-md border border-white/30 animate-fade-in relative">
        {/* Logo and Title */}
        <div className="text-center mb-8 relative">
          <div className="absolute -top-4 -left-4 text-lingerie-400 transform -rotate-12">
            <Heart className="h-8 w-8 text-lingerie-400/70" />
          </div>
          
          <Link to="/" className="text-4xl font-playfair font-bold text-lingerie-700 tracking-wide">
            Belle<span className="text-lingerie-500">Charm</span>
          </Link>
          
          <div className="mt-3 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-lingerie-300/50"></div>
            <p className="text-lingerie-600 font-montserrat italic text-sm">Elegância em cada detalhe</p>
            <div className="h-px w-12 bg-lingerie-300/50"></div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
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
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                type="submit" 
                className="flex-1 bg-lingerie-500 hover:bg-lingerie-600 text-white font-montserrat py-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <Sparkles className="h-5 w-5" />
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
              
              <Button 
                type="button"
                variant="outline"
                className="flex-1 border-lingerie-300 text-lingerie-600 hover:bg-lingerie-100 font-montserrat py-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                <Heart className="h-5 w-5" />
                {isLoading ? "Processando..." : "Cadastrar"}
              </Button>
            </div>
            
            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-lingerie-600 hover:text-lingerie-800 underline underline-offset-4 font-montserrat transition-colors">
                Voltar para a página inicial
              </Link>
            </div>
          </form>
        </Form>
        
        <div className="absolute -bottom-3 right-10 text-lingerie-400">
          <Heart className="h-6 w-6 text-lingerie-400/70" />
        </div>
      </div>
    </div>
  );
};

export default Login;
