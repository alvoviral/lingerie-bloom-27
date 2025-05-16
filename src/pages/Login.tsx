
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
import { useAuth } from '@/contexts/AuthContext';

// Form schema using zod for validation
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { user } = useAuth();

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
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

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
        toast.error("Email ou senha incorretos. Você já tem cadastro? Se não, clique em Cadastrar.");
      } else if (error.message.includes("Email not confirmed")) {
        toast.error("Por favor, confirme seu email antes de fazer login");
      } else {
        toast.error(error.message || "Erro ao fazer login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (values: LoginValues) => {
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
            first_name: "",
            last_name: ""
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

        {/* Toggle between login and signup */}
        <div className="flex mb-6 bg-white/20 p-1 rounded-lg">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${mode === 'login' ? 'bg-lingerie-500 text-white' : 'text-lingerie-600 hover:bg-lingerie-100/50'}`}
          >
            Entrar
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`flex-1 py-2 px-4 rounded-md transition-all ${mode === 'signup' ? 'bg-lingerie-500 text-white' : 'text-lingerie-600 hover:bg-lingerie-100/50'}`}
          >
            Cadastrar
          </button>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(mode === 'login' ? handleLogin : handleSignUp)} className="space-y-6">
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
              {isLoading ? "Processando..." : (mode === 'login' ? "Entrar" : "Cadastrar")}
            </Button>
            
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
