
import React from 'react';
import { Heart } from 'lucide-react';

const DecorativeElements = () => {
  return (
    <>
      <div className="fixed top-20 left-10 w-20 h-20 rounded-full bg-lingerie-200/40 animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 rounded-full bg-lavender-200/30 animate-pulse" style={{ animationDelay: "1.5s" }}></div>
      <div className="fixed top-1/3 right-20 w-16 h-16 rounded-full bg-cream-100/30 animate-pulse" style={{ animationDelay: "0.8s" }}></div>
      <div className="absolute -bottom-3 right-10 text-lingerie-400">
        <Heart className="h-6 w-6 text-lingerie-400/70" />
      </div>
    </>
  );
};

export default DecorativeElements;
