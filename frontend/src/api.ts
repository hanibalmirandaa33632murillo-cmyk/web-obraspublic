/**
 * api.ts — cliente HTTP centralizado para el backend FastAPI.
 *
 * PRODUCCION: cambia VITE_API_URL en el Secret de GitHub Actions
 *   (Settings → Secrets → Actions → VITE_API_URL)
 *   Valor: la URL publica de Railway, ej: https://web-obraspublic-production.up.railway.app
 *
 * LOCAL: en frontend/.env pon:
 *   VITE_API_URL=http://localhost:8000
 */

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// ── Helpers HTTP ─────────────────────────────────────────────────────────────
function getToken(): string | null {
  return localStorage.getItem("token");
}

async function get<T>(path: string, auth = false): Promise<T> {
  const headers: Record<string, string> = {};
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown, auth = false): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth) {
    const token = getToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `API error ${res.status}`);
  }
  return res.json();
}

// Para el login que usa form-urlencoded (requerido por OAuth2)
async function postForm<T>(path: string, data: Record<string, string>): Promise<T> {
  const body = new URLSearchParams(data);
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `API error ${res.status}`);
  }
  return res.json();
}

// ── Tipos ─────────────────────────────────────────────────────────────────────
export interface Region {
  id_region: string;
  comunidad: string;
  barrio?: string;
  colonia?: string;
}

export interface Constructora {
  id_constructora: string;
  rfc: string;
  nombre_constructora: string;
  empresa?: string;
  tipo_ejecutor?: string;
}

export interface ObraResumen {
  id_obra: string;
  nombre_obra: string;
  etapa: number;
  fecha_inicio: string;
  fecha_finalizacion?: string;
  beneficiarios?: number;
  region?: Region;
  constructora?: Constructora;
}

export interface Informe {
  id_informe: string;
  anio: number;
  mes: string;
  porcentaje_avance_fisico: number;
  porcentaje_avance_presupuestario: number;
  descripcion?: string;
  id_obra: string;
  codigo_supervisor: string;
}

export interface Costo {
  id_gasto_compuesto: string;
  categoria: string;
  costo: number;
  descripcion?: string;
}

export interface Presupuesto {
  id_presupuesto: string;
  presupuesto_total: number;
  codigo_proyectista: string;
  costos: Costo[];
}

export interface Estadisticas {
  obras_activas: number;
  obras_terminadas: number;
  total_beneficiarios: number;
  presupuesto_total_ejercido: number;
  informes_mes_actual: number;
  promedio_avance_fisico: number;
  promedio_avance_presupuestario: number;
}

export interface AvanceMensual {
  anio: number;
  mes: string;
  avance_fisico: number;
  avance_presupuesto: number;
}

export interface ObrasPorRegion {
  region: string;
  total: number;
}

// ── Auth types ────────────────────────────────────────────────────────────────
export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// ── API ───────────────────────────────────────────────────────────────────────
export const api = {
  obras: {
    listar: ()                              => get<ObraResumen[]>("/api/obras/"),
    obtener: (id: string)                   => get<ObraResumen>(`/api/obras/${id}`),
    crear: (data: Partial<ObraResumen>)     => post<ObraResumen>("/api/obras/", data, true),
  },
  informes: {
    listar:  ()           => get<Informe[]>("/api/informes/"),
    porObra: (id: string) => get<Informe[]>(`/api/informes/obra/${id}`),
    crear:   (data: Partial<Informe>) => post<Informe>("/api/informes/", data, true),
  },
  presupuestos: {
    porObra: (id: string) => get<Presupuesto>(`/api/presupuestos/obra/${id}`),
  },
  regiones: {
    listar: () => get<Region[]>("/api/regiones/"),
  },
  constructoras: {
    listar: () => get<Constructora[]>("/api/constructoras/"),
  },
  estadisticas: {
    dashboard:      () => get<Estadisticas>("/api/estadisticas/dashboard"),
    avanceMensual:  () => get<AvanceMensual[]>("/api/estadisticas/avance-mensual"),
    obrasPorRegion: () => get<ObrasPorRegion[]>("/api/estadisticas/obras-por-region"),
  },
  auth: {
    register: (nombre: string, email: string, password: string) =>
      post<AuthResponse>("/api/auth/register", { nombre, email, password }),
    login: (email: string, password: string) =>
      postForm<AuthResponse>("/api/auth/login", { username: email, password }),
    me: () => get<User>("/api/auth/me", true),
  },
};
