/**
 * AuthContext.tsx
 * Contexto global de autenticacion.
 * Envuelve toda la app para que cualquier componente pueda
 * saber si el usuario esta logueado y quien es.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api, User } from "../../../api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (nombre: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser]     = useState<User | null>(null);
  const [token, setToken]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, revisa si ya habia un token guardado
  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      api.auth.me()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem("token");
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  async function login(email: string, password: string) {
    const res = await api.auth.login(email, password);
    localStorage.setItem("token", res.access_token);
    setToken(res.access_token);
    setUser(res.user);
  }

  async function register(nombre: string, email: string, password: string) {
    const res = await api.auth.register(nombre, email, password);
    localStorage.setItem("token", res.access_token);
    setToken(res.access_token);
    setUser(res.user);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
}
