/**
 * DashboardSupervision.tsx
 * Panel de supervisión con datos reales de la API.
 * Usa: GET /api/estadisticas/dashboard, /api/obras/, /api/informes/
 */

import { useEffect, useState } from "react";
import { api, Estadisticas, ObraResumen, Informe } from "../../../api";

// ── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);
}

function badge(obra: ObraResumen) {
  if (!obra.fecha_finalizacion) return { label: "Activa", color: "#22d3ee" };
  const hoy = new Date();
  const fin = new Date(obra.fecha_finalizacion);
  return fin <= hoy
    ? { label: "Terminada", color: "#4ade80" }
    : { label: "En proceso", color: "#facc15" };
}

// ── Widget card ───────────────────────────────────────────────────────────────
function Widget({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: "#0f172a",
        border: "1px solid #1e3a5f",
        borderRadius: 16,
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 28 }}>{icon}</span>
      <p style={{ color: "#94a3b8", fontSize: 13, margin: 0 }}>{label}</p>
      <p
        style={{
          color: accent ?? "#e2e8f0",
          fontSize: 28,
          fontWeight: 700,
          margin: 0,
          letterSpacing: "-0.5px",
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ color: "#475569", fontSize: 12, margin: 0 }}>{sub}</p>
      )}
    </div>
  );
}

// ── Barra de progreso ─────────────────────────────────────────────────────────
function Barra({
  label,
  valor,
  color,
}: {
  label: string;
  valor: number;
  color: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#94a3b8",
          fontSize: 13,
          marginBottom: 6,
        }}
      >
        <span>{label}</span>
        <span style={{ color }}>{valor}%</span>
      </div>
      <div
        style={{
          height: 8,
          background: "#1e293b",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${valor}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            borderRadius: 99,
            transition: "width 1s ease",
          }}
        />
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────
export default function DashboardSupervision() {
  const [stats, setStats] = useState<Estadisticas | null>(null);
  const [obras, setObras] = useState<ObraResumen[]>([]);
  const [informes, setInformes] = useState<Informe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      api.estadisticas.dashboard(),
      api.obras.listar(),
      api.informes.listar(),
    ])
      .then(([s, o, i]) => {
        setStats(s);
        setObras(o);
        setInformes(i);
        setLoading(false);
      })
      .catch((e) => {
        setError(
          "No se pudo conectar con el backend. Verifica que esté corriendo.",
        );
        console.error(e);
        setLoading(false);
      });
  }, []);

  // ── Estados de carga / error ─────────────────────────────────────────────
  if (loading) {
    return (
      <section
        style={{
          background: "#020817",
          padding: "80px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "3px solid #1e3a5f",
            borderTop: "3px solid #38bdf8",
            borderRadius: "50%",
            margin: "0 auto 20px",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <p style={{ color: "#475569" }}>Conectando con la base de datos…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </section>
    );
  }

  if (error) {
    return (
      <section style={{ background: "#020817", padding: "80px 40px" }}>
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            background: "#1a0a0a",
            border: "1px solid #7f1d1d",
            borderRadius: 16,
            padding: 32,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 32, marginBottom: 12 }}>⚠️</p>
          <p style={{ color: "#fca5a5", fontWeight: 600, marginBottom: 8 }}>
            Error de conexión
          </p>
          <p style={{ color: "#6b7280", fontSize: 14 }}>{error}</p>
          <code
            style={{
              display: "block",
              marginTop: 16,
              background: "#0d0d0d",
              padding: "12px 16px",
              borderRadius: 8,
              color: "#38bdf8",
              fontSize: 13,
            }}
          >
            docker compose up -d
          </code>
        </div>
      </section>
    );
  }

  // ── Render principal ──────────────────────────────────────────────────────
  return (
    <section
      id="dashboard"
      style={{
        background: "#020817",
        padding: "100px 40px",
        fontFamily: "'Manrope', 'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <span
            style={{
              background: "#0ea5e91a",
              color: "#38bdf8",
              border: "1px solid #0ea5e944",
              borderRadius: 99,
              padding: "4px 14px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Dashboard en vivo
          </span>
          <h2
            style={{
              color: "#e2e8f0",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              margin: "12px 0 4px",
            }}
          >
            Panel de Supervisión
          </h2>
          <p style={{ color: "#475569", fontSize: 16 }}>
            Datos conectados directamente a PostgreSQL vía FastAPI
          </p>
        </div>

        {/* Widgets */}
        {stats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
              marginBottom: 40,
            }}
          >
            <Widget
              icon="🏗️"
              label="Obras Activas"
              value={stats.obras_activas}
              accent="#38bdf8"
            />
            <Widget
              icon="✅"
              label="Obras Terminadas"
              value={stats.obras_terminadas}
              accent="#4ade80"
            />
            <Widget
              icon="👥"
              label="Beneficiarios"
              value={stats.total_beneficiarios.toLocaleString("es-MX")}
              accent="#a78bfa"
            />
            <Widget
              icon="💰"
              label="Presupuesto Ejercido"
              value={fmt(Number(stats.presupuesto_total_ejercido))}
              accent="#facc15"
            />
            <Widget
              icon="📋"
              label="Informes Este Mes"
              value={stats.informes_mes_actual}
              accent="#fb923c"
            />
            <Widget
              icon="📈"
              label="Avance Físico Promedio"
              value={`${stats.promedio_avance_fisico}%`}
              accent="#38bdf8"
              sub={`Presupuestal: ${stats.promedio_avance_presupuestario}%`}
            />
          </div>
        )}

        {/* Barras de avance + Tabla */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 24,
            marginBottom: 40,
          }}
        >
          {/* Avance general */}
          {stats && (
            <div
              style={{
                background: "#0f172a",
                border: "1px solid #1e3a5f",
                borderRadius: 16,
                padding: 28,
              }}
            >
              <p
                style={{
                  color: "#e2e8f0",
                  fontWeight: 700,
                  marginBottom: 24,
                  fontSize: 15,
                }}
              >
                Avance General Promedio
              </p>
              <Barra
                label="Avance Físico"
                valor={stats.promedio_avance_fisico}
                color="#38bdf8"
              />
              <Barra
                label="Avance Presupuestal"
                valor={stats.promedio_avance_presupuestario}
                color="#a78bfa"
              />
            </div>
          )}

          {/* Tabla de obras */}
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e3a5f",
              borderRadius: 16,
              padding: 28,
              overflowX: "auto",
            }}
          >
            <p
              style={{
                color: "#e2e8f0",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              Obras Registradas
            </p>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {["Obra", "Región", "Constructora", "Inicio", "Estado"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          color: "#475569",
                          padding: "8px 12px",
                          borderBottom: "1px solid #1e293b",
                          fontWeight: 600,
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {obras.map((o) => {
                  const { label, color } = badge(o);
                  return (
                    <tr key={o.id_obra}>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#e2e8f0",
                          borderBottom: "1px solid #0f172a",
                        }}
                      >
                        {o.nombre_obra}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#94a3b8",
                          borderBottom: "1px solid #0f172a",
                        }}
                      >
                        {o.region?.comunidad ?? "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#94a3b8",
                          borderBottom: "1px solid #0f172a",
                        }}
                      >
                        {o.constructora?.nombre_constructora ??
                          "H. Ayuntamiento"}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          color: "#94a3b8",
                          borderBottom: "1px solid #0f172a",
                        }}
                      >
                        {new Date(o.fecha_inicio).toLocaleDateString("es-MX")}
                      </td>
                      <td
                        style={{
                          padding: "10px 12px",
                          borderBottom: "1px solid #0f172a",
                        }}
                      >
                        <span
                          style={{
                            background: `${color}22`,
                            color,
                            border: `1px solid ${color}44`,
                            borderRadius: 99,
                            padding: "2px 10px",
                            fontSize: 11,
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Últimos informes */}
        {informes.length > 0 && (
          <div
            style={{
              background: "#0f172a",
              border: "1px solid #1e3a5f",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <p
              style={{
                color: "#e2e8f0",
                fontWeight: 700,
                marginBottom: 20,
                fontSize: 15,
              }}
            >
              Informes Recientes
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              {informes.slice(0, 6).map((inf) => (
                <div
                  key={inf.id_informe}
                  style={{
                    background: "#020817",
                    border: "1px solid #1e293b",
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{
                        color: "#38bdf8",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {inf.mes} {inf.anio}
                    </span>
                    <span style={{ color: "#475569", fontSize: 12 }}>
                      {inf.id_obra}
                    </span>
                  </div>
                  <Barra
                    label="Físico"
                    valor={inf.porcentaje_avance_fisico}
                    color="#38bdf8"
                  />
                  <Barra
                    label="Presupuestal"
                    valor={inf.porcentaje_avance_presupuestario}
                    color="#a78bfa"
                  />
                  {inf.descripcion && (
                    <p style={{ color: "#475569", fontSize: 12, marginTop: 8 }}>
                      {inf.descripcion.slice(0, 80)}…
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
