/**
 * api.ts — cliente centralizado para el backend FastAPI.
 * Cambia VITE_API_URL en tu .env del frontend para apuntar a Railway.
 *
 * Uso local:   VITE_API_URL=http://localhost:8000
 * Uso Railway: VITE_API_URL=https://tu-backend.up.railway.app
 */

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  return res.json();
}

// ── Tipos ────────────────────────────────────────────────────────────────────
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

// ── Llamadas a la API ────────────────────────────────────────────────────────
export const api = {
  obras: {
    listar: ()            => get<ObraResumen[]>("/api/obras/"),
    obtener: (id: string) => get<ObraResumen>(`/api/obras/${id}`),
    crear: (data: Partial<ObraResumen>) => post<ObraResumen>("/api/obras/", data),
  },
  informes: {
    listar:     ()            => get<Informe[]>("/api/informes/"),
    porObra:    (id: string)  => get<Informe[]>(`/api/informes/obra/${id}`),
    crear:      (data: Partial<Informe>) => post<Informe>("/api/informes/", data),
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
};
