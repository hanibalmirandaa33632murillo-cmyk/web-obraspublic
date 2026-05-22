# Sistema de Gestion de Obras Publicas — Temascaltepec

**Autores:** Gonzalez Casiano Uriel / Maldonado Mejia Marco Tulio  
**Materia:** Bases de Datos

---

## Arquitectura del proyecto

```
obras_publicas/
├── db/
│   └── schema.sql          # DDL completo PostgreSQL + datos de ejemplo
├── backend/                # API REST Python + FastAPI
│   ├── main.py
│   ├── app/
│   │   ├── database.py     # conexion SQLAlchemy
│   │   ├── models.py       # tablas como clases Python
│   │   ├── schemas.py      # validacion de datos (Pydantic)
│   │   └── routers/        # endpoints por entidad
│   ├── requirements.txt
│   ├── Dockerfile
│   └── railway.toml
├── frontend/               # React + Vite (GitHub Pages)
│   └── src/
│       ├── api.ts          # cliente HTTP centralizado
│       └── DashboardSupervision.tsx  # dashboard conectado a la BD
├── docker-compose.yml      # levanta todo en local
└── .github/workflows/
    └── deploy-frontend.yml # CI/CD automatico a GitHub Pages
```

---

## Donde corre cada parte

| Componente   | Local (desarrollo)      | Produccion                        |
|--------------|-------------------------|-----------------------------------|
| PostgreSQL   | Docker (puerto 5432)    | Railway (Plugin PostgreSQL)       |
| pgAdmin      | Docker (puerto 5050)    | No necesario en produccion        |
| Backend API  | Docker (puerto 8000)    | Railway (servicio Backend)        |
| Frontend     | `npm run dev` (5173)    | GitHub Pages (estatico)           |

> GitHub Pages solo sirve archivos estaticos (HTML/CSS/JS).
> El backend Python y la base de datos NUNCA van a GitHub Pages.

---

## 1. Correr en local (desarrollo)

### Requisitos
- Docker Desktop instalado y corriendo
- Node.js 20+ (para el frontend)

### Pasos

```bash
# 1. Clonar el repo
git clone https://github.com/TU_USUARIO/obras-publicas.git
cd obras-publicas

# 2. Levantar PostgreSQL + pgAdmin + Backend con Docker
docker compose up -d

# Espera ~15 segundos para que la BD inicialice
# Puedes ver los logs con:
docker compose logs -f

# 3. Verificar que el backend responde
curl http://localhost:8000/health
# Respuesta esperada: {"status": "ok"}

# 4. Ver documentacion interactiva de la API
# Abre en el navegador: http://localhost:8000/docs

# 5. Abrir pgAdmin para ver las tablas
# Abre: http://localhost:5050
# Email:    admin@obras.mx
# Password: admin123
# Conectar a: host=postgres, puerto=5432, user=obras_user, pass=obras_pass

# 6. Correr el frontend
cd frontend
cp .env.example .env      # ya apunta a localhost:8000
npm install
npm run dev
# Abre: http://localhost:5173
```

---

## 2. Deploy en produccion

### Backend → Railway

1. Crea una cuenta en [railway.app](https://railway.app)
2. Crea un nuevo proyecto → "Deploy from GitHub repo"
3. Selecciona la carpeta `backend/` como root directory
4. Railway detecta el `Dockerfile` automaticamente
5. Agrega un **Plugin PostgreSQL** desde el panel de Railway
6. Railway inyecta `DATABASE_URL` automaticamente como variable de entorno
7. Copia la URL publica del backend (ej: `https://obras-backend.up.railway.app`)
8. En Railway, ve a Settings → corre el schema:
   ```sql
   -- Copia el contenido de db/schema.sql en el editor SQL de Railway
   ```

### Frontend → GitHub Pages

1. En tu repo de GitHub: **Settings → Secrets → Actions**
2. Agrega el secret:
   - Nombre: `VITE_API_URL`
   - Valor: `https://obras-backend.up.railway.app` (tu URL de Railway)
3. En GitHub: **Settings → Pages → Source: GitHub Actions**
4. Cada `git push` a `main` despliega el frontend automaticamente

---

## 3. Estructura de la base de datos

### Entidades fuertes (independientes)
| Tabla | Descripcion |
|-------|-------------|
| `region` | Comunidad/barrio donde se ubica la obra |
| `constructora` | Empresa ejecutora o H. Ayuntamiento |
| `personal` | Superclase de Supervisor y Proyectista (herencia solapada) |
| `supervisor` | Hereda de personal; asignado a obras |
| `proyectista` | Hereda de personal; elabora presupuestos |
| `fuente_presupuestaria` | Origen del financiamiento (federal/estatal/municipal) |

### Entidad central
| Tabla | Descripcion |
|-------|-------------|
| `obra` | Nucleo del sistema; referenciada por todas las entidades debiles |

### Tabla intermedia N:M
| Tabla | Descripcion |
|-------|-------------|
| `financia` | Una obra puede tener N fuentes; una fuente puede financiar N obras |

### Entidades debiles (dependen de `obra`)
| Tabla | Descripcion |
|-------|-------------|
| `opcion_seleccion` | Concurso de constructoras (min. 3 propuestas) |
| `presupuesto_obra` | Unico por obra (relacion 1:1 con UNIQUE) |
| `costos` | Desglose por categoria del presupuesto |
| `informes` | Libro mensual de avance fisico y presupuestario |
| `permisos` | Oficios de CFE, CONAGUA, SCT, etc. |
| `acta_entrega` | Unica por obra (relacion 1:1 con UNIQUE); requiere 5 firmas |
| `firmantes` | Los 5 firmantes del acta de entrega |

### Relaciones clave
- **1:1** — `obra` ↔ `presupuesto_obra` (garantizado con `UNIQUE`)
- **1:1** — `obra` ↔ `acta_entrega` (garantizado con `UNIQUE`)
- **1:N** — `region` → `obras`
- **1:N** — `supervisor` → `informes`
- **N:M** — `obra` ↔ `fuente_presupuestaria` (via tabla `financia`)
- **CASCADE** — Eliminar una obra elimina automaticamente todos sus registros dependientes

---

## 4. Endpoints de la API

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | `/api/obras/` | Listar todas las obras |
| GET | `/api/obras/{id}` | Obra completa con todas sus relaciones |
| POST | `/api/obras/` | Crear obra |
| PUT | `/api/obras/{id}` | Actualizar obra |
| DELETE | `/api/obras/{id}` | Eliminar obra (cascade) |
| GET | `/api/informes/` | Todos los informes |
| GET | `/api/informes/obra/{id}` | Informes de una obra |
| POST | `/api/informes/` | Crear informe |
| GET | `/api/presupuestos/obra/{id}` | Presupuesto con costos de una obra |
| GET | `/api/estadisticas/dashboard` | Widgets del dashboard |
| GET | `/api/estadisticas/avance-mensual` | Datos para grafica lineal |
| GET | `/api/estadisticas/obras-por-region` | Datos para grafica circular |
| GET | `/api/regiones/` | Listar regiones |
| GET | `/api/constructoras/` | Listar constructoras |

Documentacion interactiva (Swagger): `http://localhost:8000/docs`

---

## 5. Detener el ambiente local

```bash
docker compose down          # detiene los contenedores
docker compose down -v       # detiene Y borra la base de datos
```
