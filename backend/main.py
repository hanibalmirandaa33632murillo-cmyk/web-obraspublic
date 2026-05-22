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
from app.routers import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crea todas las tablas (incluyendo 'usuarios') si no existen
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="API - Obras Publicas Temascaltepec",
    version="1.0.0",
    description="Sistema Integral de Gestion de Obras Publicas",
    lifespan=lifespan
)

# CORS: permite peticiones desde GitHub Pages y localhost
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers existentes
app.include_router(obras.router,          prefix="/api/obras",          tags=["Obras"])
app.include_router(constructoras.router,  prefix="/api/constructoras",  tags=["Constructoras"])
app.include_router(supervisores.router,   prefix="/api/supervisores",   tags=["Supervisores"])
app.include_router(informes.router,       prefix="/api/informes",       tags=["Informes"])
app.include_router(presupuestos.router,   prefix="/api/presupuestos",   tags=["Presupuestos"])
app.include_router(regiones.router,       prefix="/api/regiones",       tags=["Regiones"])
app.include_router(estadisticas.router,   prefix="/api/estadisticas",   tags=["Estadisticas"])

# Nuevo router de autenticacion
app.include_router(auth.router,           prefix="/api/auth",           tags=["Autenticacion"])

@app.get("/")
def root():
    return {"mensaje": "API Obras Publicas Temascaltepec - OK"}

@app.get("/health")
def health():
    return {"status": "ok"}
