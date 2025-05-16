
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useLocation, useNavigate } from 'react-router-dom';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // First set up the auth state listener to prevent deadlocks
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);
        
        if (event === 'SIGNED_OUT') {
          console.log("Usuário deslogado, redirecionando para página inicial");
          navigate('/', { replace: true });
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          // Only navigate if not already on a protected route
          console.log("Usuário logado, verificando rota atual:", location.pathname);
          if (location.pathname === '/' || location.pathname === '/login') {
            console.log("Redirecionando para dashboard");
            navigate('/dashboard', { replace: true });
          }
        }
      }
    );
    
    // Then check for existing session
    const getInitialSession = async () => {
      try {
        setIsLoading(true);
        console.log("Verificando sessão existente...");
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        console.log("Sessão inicial:", initialSession?.user?.email || "nenhuma");
        setSession(initialSession);
        setUser(initialSession?.user ?? null);
        
        // Initial redirect if session exists
        if (initialSession && (location.pathname === '/' || location.pathname === '/login')) {
          console.log("Sessão ativa encontrada, redirecionando para dashboard");
          navigate('/dashboard', { replace: true });
        }
      } catch (error) {
        console.error('Erro ao obter sessão inicial:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);
  
  const signOut = async () => {
    console.log("Realizando logout");
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    signOut,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
