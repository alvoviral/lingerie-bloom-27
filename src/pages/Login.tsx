
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, User } from "lucide-react";
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-lingerie-100 to-lavender-100">
      <div className="w-full max-w-md px-8 py-10 rounded-xl shadow-lg glass-effect backdrop-blur-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-playfair font-bold text-lingerie-700">
            Belle<span className="text-lingerie-500">Charm</span>
          </Link>
          <p className="text-lingerie-600 mt-2 font-montserrat italic">Elegância em cada detalhe</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-lingerie-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="Email"
                className="pl-10 border-lingerie-200 focus:border-lingerie-400 bg-white/70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-lingerie-400 h-4 w-4" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                className="pl-10 border-lingerie-200 focus:border-lingerie-400 bg-white/70"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lingerie-400 hover:text-lingerie-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-lingerie-500 hover:bg-lingerie-600 text-white font-montserrat py-2"
          >
            Entrar
          </Button>
          
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-lingerie-600 hover:text-lingerie-800 underline underline-offset-4">
              Voltar para a página inicial
            </Link>
          </div>
        </form>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-lingerie-600">
          Não tem uma conta? <Link to="/" className="font-medium text-lingerie-700 hover:text-lingerie-800 underline underline-offset-4">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
