
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

interface UserAvatarProps {
  userId?: string;
  fallbackInitials?: string;
  className?: string;
}

export const UserAvatar = ({ userId, fallbackInitials = "UR", className = "" }: UserAvatarProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState<string>(fallbackInitials);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        // Tentar obter o usuário atual se não for fornecido um ID
        const { data } = await supabase.auth.getUser();
        if (!data.user) return;
        
        fetchProfileData(data.user.id);
      } else {
        fetchProfileData(userId);
      }
    };

    const fetchProfileData = async (id: string) => {
      try {
        // Buscar o perfil do usuário
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name, last_name, avatar_url')
          .eq('id', id)
          .single();

        if (error) {
          console.error("Erro ao buscar perfil:", error);
          return;
        }

        if (profile) {
          // Definir iniciais com base no nome e sobrenome
          if (profile.first_name && profile.last_name) {
            setInitials(`${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase());
          }

          // Buscar URL do avatar se existir
          if (profile.avatar_url) {
            const { data } = await supabase.storage
              .from('avatars')
              .getPublicUrl(profile.avatar_url);
            
            if (data) {
              setAvatarUrl(data.publicUrl);
            }
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      }
    };

    fetchUserData();
  }, [userId, fallbackInitials]);

  return (
    <Avatar className={className}>
      {avatarUrl && <AvatarImage src={avatarUrl} alt="Avatar do usuário" />}
      <AvatarFallback className="bg-lingerie-200 text-lingerie-700">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
