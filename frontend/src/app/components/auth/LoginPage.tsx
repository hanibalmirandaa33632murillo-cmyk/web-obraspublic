/**
 * LoginPage.tsx — Pagina de inicio de sesion
 */

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Building2 } from "lucide-react";

interface Props {
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onSwitchToRegister }: Props) {
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message ?? "Error al iniciar sesion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: "100%",
        maxWidth: 420,
        background: "#0f172a",
        border: "1px solid #1e3a5f",
        borderRadius: 20,
        padding: "40px 36px",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52,
            background: "#0ea5e9",
            borderRadius: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <Building2 size={28} color="white" />
          </div>
          <h1 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, margin: 0 }}>
            SIGOP
          </h1>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 6 }}>
            Sistema de Gestión de Obras Públicas
          </p>
        </div>

        <h2 style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 600, margin: "0 0 24px" }}>
          Iniciar sesión
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="tu@correo.com"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#020817", border: "1px solid #1e3a5f",
                borderRadius: 10, padding: "12px 14px",
                color: "#e2e8f0", fontSize: 14, outline: "none",
              }}
            />
          </div>

          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "#020817", border: "1px solid #1e3a5f",
                borderRadius: 10, padding: "12px 14px",
                color: "#e2e8f0", fontSize: 14, outline: "none",
              }}
            />
          </div>

          {error && (
            <div style={{
              background: "#1a0a0a", border: "1px solid #7f1d1d",
              borderRadius: 8, padding: "10px 14px",
              color: "#fca5a5", fontSize: 13,
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#0369a1" : "#0ea5e9",
              color: "white", border: "none",
              borderRadius: 10, padding: "13px",
              fontSize: 15, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              marginTop: 4,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p style={{ color: "#475569", fontSize: 13, textAlign: "center", marginTop: 24 }}>
          ¿No tienes cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            style={{
              background: "none", border: "none",
              color: "#38bdf8", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}
