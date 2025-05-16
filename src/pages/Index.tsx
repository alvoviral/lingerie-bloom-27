
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lingerie-50 to-lavender-100">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center md:items-start justify-center">
          <div className="mb-2 flex items-center gap-2 animate-fade-in">
            <Sparkles className="h-6 w-6 text-lingerie-500" />
            <span className="font-montserrat text-sm text-lingerie-600">Gestão elegante para sua loja</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-lingerie-800 text-center md:text-left animate-fade-in relative">
            Belle<span className="text-lingerie-600">Charm</span>
            <span className="absolute -top-4 right-0 text-lingerie-400 text-lg italic font-montserrat md:right-auto md:left-full md:ml-2">
              ✨
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl font-montserrat text-lingerie-700 max-w-md text-center md:text-left">
            Transforme sua loja de lingerie com a gestão mais <span className="italic">elegante</span> e <span className="italic">sofisticada</span> do mercado
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-6">
            <Link to="/login">
              <Button 
                className="bg-lingerie-500 hover:bg-lingerie-600 text-white px-10 py-7 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex gap-2 items-center"
              >
                <Heart className="w-5 h-5" />
                Entrar
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant="outline"
                className="border-lingerie-300 text-lingerie-600 hover:bg-lingerie-100 px-10 py-7 rounded-full text-lg font-medium transition-all duration-300 flex gap-2 items-center"
              >
                <Sparkles className="w-5 h-5" />
                Conheça o Sistema
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square animate-fade-in">
            {/* Decorative circles */}
            <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-lavender-200/50 -top-6 -left-6 animate-pulse"></div>
            <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-lingerie-300/30 bottom-12 right-8 animate-pulse" style={{ animationDelay: "1s" }}></div>
            
            {/* Main image container */}
            <div className="relative w-full h-full rounded-full overflow-hidden glass-effect border-2 border-white/50 flex items-center justify-center z-10 shadow-2xl">
              <div className="text-center p-10 z-20">
                <h2 className="font-playfair text-3xl md:text-4xl text-lingerie-700 mb-4">
                  Sua loja merece o melhor
                </h2>
                <p className="font-montserrat text-lingerie-600">
                  Controle, elegância e simplicidade para o seu negócio florescer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="p-6 text-center text-lingerie-600">
        <div className="flex items-center justify-center gap-2">
          <Heart className="h-4 w-4 text-lingerie-400" />
          <p className="font-montserrat text-sm">
            © 2025 BelleCharm - Sistema de Gestão para Lojas de Lingerie
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
