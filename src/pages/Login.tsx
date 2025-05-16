
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Heart, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulando login para demonstração
    if (email && password) {
      toast.success("Login realizado com sucesso!");
      navigate('/dashboard');
    } else {
      toast.error("Por favor, preencha todos os campos");
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
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Seu Email</label>
            <div className="relative">
              <Input
                type="email"
                placeholder="seuemail@exemplo.com"
                className="pl-4 pr-4 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-lingerie-700 font-montserrat ml-1">Senha</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Sua senha secreta"
                className="pl-4 pr-10 py-3 border-lingerie-200 focus:border-lingerie-400 bg-white/80 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lingerie-400 hover:text-lingerie-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-lingerie-500 hover:bg-lingerie-600 text-white font-montserrat py-6 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="h-5 w-5" />
            Entrar
          </Button>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-lingerie-600 hover:text-lingerie-800 underline underline-offset-4 font-montserrat transition-colors">
              Voltar para a página inicial
            </Link>
          </div>
        </form>
        
        <div className="absolute -bottom-3 right-10 text-lingerie-400">
          <Heart className="h-6 w-6 text-lingerie-400/70" />
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-lingerie-600 font-montserrat">
          Não tem uma conta? <Link to="/" className="font-medium text-lingerie-700 hover:text-lingerie-800 underline underline-offset-4 transition-colors">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
