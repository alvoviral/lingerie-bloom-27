
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const AuthHeader = () => {
  return (
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
  );
};

export default AuthHeader;
