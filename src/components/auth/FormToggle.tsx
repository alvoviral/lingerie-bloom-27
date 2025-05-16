
import React from 'react';

interface FormToggleProps {
  mode: 'login' | 'signup';
  setMode: (mode: 'login' | 'signup') => void;
}

const FormToggle = ({ mode, setMode }: FormToggleProps) => {
  return (
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
  );
};

export default FormToggle;
