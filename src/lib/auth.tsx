import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { connectUser } from "@/lib/store";

const AuthContext = createContext<{ user: User | null; loading: boolean }>({ user: null, loading: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!active) return;
      setUser(data.user);
      void connectUser(data.user?.id ?? null, data.user?.email, data.user?.user_metadata);
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      setUser(session?.user ?? null);
      // Defer database calls outside the auth callback.
      setTimeout(() => { if (active) void connectUser(session?.user.id ?? null, session?.user.email, session?.user.user_metadata); }, 0);
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }