/**
 * RegisterPage.tsx — Pagina de registro de nuevo usuario
 */

import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Building2 } from "lucide-react";

interface Props {
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onSwitchToLogin }: Props) {
  const { register } = useAuth();
  const [nombre, setNombre]     = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await register(nombre, email, password);
    } catch (err: any) {
      setError(err.message ?? "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", boxSizing: "border-box" as const,
    background: "#020817", border: "1px solid #1e3a5f",
    borderRadius: 10, padding: "12px 14px",
    color: "#e2e8f0", fontSize: 14, outline: "none",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: 420,
        background: "#0f172a", border: "1px solid #1e3a5f",
        borderRadius: 20, padding: "40px 36px",
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52, background: "#0ea5e9",
            borderRadius: 14, display: "flex", alignItems: "center",
            justifyContent: "center", margin: "0 auto 16px",
          }}>
            <Building2 size={28} color="white" />
          </div>
          <h1 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, margin: 0 }}>SIGOP</h1>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 6 }}>
            Sistema de Gestión de Obras Públicas
          </p>
        </div>

        <h2 style={{ color: "#e2e8f0", fontSize: 18, fontWeight: 600, margin: "0 0 24px" }}>
          Crear cuenta
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Nombre completo
            </label>
            <input
              type="text" value={nombre}
              onChange={e => setNombre(e.target.value)}
              required placeholder="Juan Pérez"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Correo electrónico
            </label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              required placeholder="tu@correo.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Contraseña
            </label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)}
              required placeholder="Mínimo 6 caracteres"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ color: "#94a3b8", fontSize: 13, display: "block", marginBottom: 6 }}>
              Confirmar contraseña
            </label>
            <input
              type="password" value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required placeholder="Repite tu contraseña"
              style={inputStyle}
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
            type="submit" disabled={loading}
            style={{
              background: loading ? "#0369a1" : "#0ea5e9",
              color: "white", border: "none", borderRadius: 10,
              padding: "13px", fontSize: 15, fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s", marginTop: 4,
            }}
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>
        </form>

        <p style={{ color: "#475569", fontSize: 13, textAlign: "center", marginTop: 24 }}>
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={onSwitchToLogin}
            style={{
              background: "none", border: "none",
              color: "#38bdf8", cursor: "pointer",
              fontSize: 13, fontWeight: 600,
            }}
          >
            Inicia sesión
          </button>
        </p>
      </div>
    </div>
  );
}
