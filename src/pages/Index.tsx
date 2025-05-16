
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lingerie-50 via-cream-50 to-lavender-50">
      {/* Hero Section */}
      <div className="flex-grow flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center md:items-start justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-lingerie-800 text-center md:text-left animate-fade-in">
            Belle<span className="text-lingerie-600">Charm</span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl font-montserrat text-lingerie-700 max-w-md text-center md:text-left">
            Gestão elegante e eficiente para sua loja de lingerie
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/login">
              <Button 
                className="bg-lingerie-500 hover:bg-lingerie-600 text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Entrar
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button 
                variant="outline"
                className="border-lingerie-400 text-lingerie-600 hover:bg-lingerie-100 px-8 py-6 rounded-full text-lg font-medium transition-all duration-300"
              >
                Conheça o Sistema
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square rounded-full bg-gradient-to-br from-lingerie-300/50 via-lavender-200/50 to-cream-200/50 flex items-center justify-center shadow-xl">
            <div className="absolute inset-0 rounded-full border-2 border-white/30 backdrop-blur-sm"></div>
            <h2 className="font-playfair text-3xl md:text-4xl text-lingerie-700 text-center px-8">
              Sua loja merece o melhor
            </h2>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="p-6 text-center text-lingerie-600">
        <p className="font-montserrat text-sm">
          © 2025 BelleCharm - Sistema de Gestão para Lojas de Lingerie
        </p>
      </footer>
    </div>
  );
};

export default Index;
