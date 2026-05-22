"""
Backend: Sistema de Gestion de Obras Publicas - Temascaltepec
Framework: FastAPI (Python)
Base de datos: PostgreSQL (via SQLAlchemy + psycopg2)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import engine, Base
from app.routers import obras, constructoras, supervisores, informes, presupuestos, regiones, estadisticas

# Crear tablas al iniciar (si no existen)
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="API - Obras Publicas Temascaltepec",
    version="1.0.0",
    description="Sistema Integral de Gestion de Obras Publicas",
    lifespan=lifespan
)

# CORS: permite peticiones desde el frontend en GitHub Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # En produccion reemplaza con tu URL de GitHub Pages
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar routers
app.include_router(obras.router,          prefix="/api/obras",          tags=["Obras"])
app.include_router(constructoras.router,  prefix="/api/constructoras",  tags=["Constructoras"])
app.include_router(supervisores.router,   prefix="/api/supervisores",   tags=["Supervisores"])
app.include_router(informes.router,       prefix="/api/informes",       tags=["Informes"])
app.include_router(presupuestos.router,   prefix="/api/presupuestos",   tags=["Presupuestos"])
app.include_router(regiones.router,       prefix="/api/regiones",       tags=["Regiones"])
app.include_router(estadisticas.router,   prefix="/api/estadisticas",   tags=["Estadisticas"])

@app.get("/")
def root():
    return {"mensaje": "API Obras Publicas Temascaltepec - OK"}

@app.get("/health")
def health():
    return {"status": "ok"}
