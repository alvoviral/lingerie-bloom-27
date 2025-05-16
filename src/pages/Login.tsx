
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/auth/LoginForm';
import SignUpForm from '@/components/auth/SignUpForm';
import FormToggle from '@/components/auth/FormToggle';
import AuthHeader from '@/components/auth/AuthHeader';
import DecorativeElements from '@/components/auth/DecorativeElements';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-lingerie-50 to-lavender-100">
      <DecorativeElements />
      
      <div className="w-full max-w-md px-10 py-12 rounded-2xl shadow-xl glass-effect backdrop-blur-md border border-white/30 animate-fade-in relative">
        <AuthHeader />
        <FormToggle mode={mode} setMode={setMode} />
        
        {mode === 'login' ? (
          <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
        ) : (
          <SignUpForm 
            isLoading={isLoading} 
            setIsLoading={setIsLoading}
            setMode={setMode}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
