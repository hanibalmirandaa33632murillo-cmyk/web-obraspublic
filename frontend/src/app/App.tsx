/**
 * App.tsx — Punto de entrada de la aplicacion.
 * Maneja la logica de autenticacion:
 *  - Si NO esta logueado: muestra Login o Registro
 *  - Si ESTA logueado: muestra la app completa
 */

import { useState } from "react";
import { AuthProvider, useAuth } from "./components/auth/AuthContext";
import LoginPage    from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

import HeroSection           from "./components/public-works/HeroSection";
import ProblemaActual        from "./components/public-works/ProblemaActual";
import FlujoProceso          from "./components/public-works/FlujoProceso";
import InformacionObra       from "./components/public-works/InformacionObra";
import ConcursoConstructoras from "./components/public-works/ConcursoConstructoras";
import DashboardSupervision  from "./components/public-works/DashboardSupervision";
import ModeloER              from "./components/public-works/ModeloER";
import ArquitecturaSQL       from "./components/public-works/ArquitecturaSQL";
import RolesUsuario          from "./components/public-works/RolesUsuario";
import DataAnalytics         from "./components/public-works/DataAnalytics";
import Footer                from "./components/public-works/Footer";

// ── App interior (ya sabe si hay usuario) ─────────────────────────────────────
function AppContent() {
  const { user, loading, logout } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  // Pantalla de carga inicial (verifica si habia token guardado)
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#020817",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 44, height: 44,
          border: "3px solid #1e3a5f",
          borderTop: "3px solid #38bdf8",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // No logueado: muestra login o registro
  if (!user) {
    if (showRegister) {
      return <RegisterPage onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <LoginPage onSwitchToRegister={() => setShowRegister(true)} />;
  }

  // Logueado: muestra la app completa con barra de usuario arriba
  return (
    <div className="min-h-screen bg-white">
      {/* Barra de usuario logueado */}
      <div style={{
        background: "#0f172a", borderBottom: "1px solid #1e3a5f",
        padding: "8px 24px", display: "flex",
        alignItems: "center", justifyContent: "flex-end", gap: 16,
      }}>
        <span style={{ color: "#94a3b8", fontSize: 13 }}>
          👤 {user.nombre}
          <span style={{
            marginLeft: 8, background: "#0ea5e91a",
            color: "#38bdf8", border: "1px solid #0ea5e944",
            borderRadius: 99, padding: "2px 10px", fontSize: 11,
          }}>
            {user.rol}
          </span>
        </span>
        <button
          onClick={logout}
          style={{
            background: "transparent", border: "1px solid #1e3a5f",
            borderRadius: 8, color: "#94a3b8",
            padding: "5px 14px", fontSize: 12,
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </div>

      <HeroSection />
      <ProblemaActual />
      <FlujoProceso />
      <InformacionObra />
      <ConcursoConstructoras />
      <DashboardSupervision />
      <ModeloER />
      <ArquitecturaSQL />
      <RolesUsuario />
      <DataAnalytics />
      <Footer />
    </div>
  );
}

// ── Root con el provider ───────────────────────────────────────────────────────
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
