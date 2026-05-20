import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [devUser, setDevUser] = useState(null);

  async function loadProfile(userOrId) {
    const userId = typeof userOrId === 'string' ? userOrId : userOrId?.id;

    if (!userId) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('*, paroquias(nome, cidade, codigo_acesso, status)')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      setProfile(null);
      return null;
    }

    if (data) {
      setProfile(data);
      return data;
    }

    if (typeof userOrId === 'object') {
      const createdProfile = await ensureUserProfile(userOrId);
      setProfile(createdProfile);
      return createdProfile;
    }

    setProfile(null);
    return null;
  }

  async function ensureUserProfile(user) {
    if (!user?.id) return null;

    const { data, error } = await supabase
      .from('usuarios')
      .upsert({
        id: user.id,
        nome: user.user_metadata?.nome || user.email || 'Novo usuario',
        email: user.email,
        tipo_usuario: user.user_metadata?.tipo_usuario || 'aluno',
        paroquia_id: null,
      })
      .select('*, paroquias(nome, cidade, codigo_acesso, status)')
      .single();

    if (error) {
      return null;
    }

    return data;
  }

  useEffect(() => {
    let active = true;

    async function initSession() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      setSession(data.session);
      if (data.session?.user) {
        await loadProfile(data.session.user);
      }
      setLoading(false);
    }

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession);
      if (newSession?.user) {
        await loadProfile(newSession.user);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  function loginAsDevStudent() {
    const demoUser = {
      id: 'dev-student',
      email: 'admin',
      user_metadata: {
        nome: 'Aluno Demo',
        tipo_usuario: 'aluno',
      },
    };

    setDevUser(demoUser);
    setProfile({
      id: demoUser.id,
      nome: 'Aluno Demo',
      email: 'admin',
      tipo_usuario: 'aluno',
      paroquia_id: 'dev-parish',
      paroquias: {
        nome: 'Paroquia Demo',
        cidade: 'Ambiente local',
        codigo_acesso: 'DEMO',
        status: 'ativa',
      },
    });
  }

  async function signOut() {
    setDevUser(null);
    setProfile(null);
    if (session) {
      await supabase.auth.signOut();
    }
    setSession(null);
  }

  const value = useMemo(() => {
    const activeUser = devUser || session?.user || null;

    return {
      session,
      user: activeUser,
      profile,
      loading,
      isLoggedIn: Boolean(activeUser),
      refreshProfile: loadProfile,
      ensureUserProfile,
      loginAsDevStudent,
      signOut,
      setProfile,
    };
  }, [session, devUser, profile, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa ser usado dentro de AuthProvider');
  }
  return context;
}
