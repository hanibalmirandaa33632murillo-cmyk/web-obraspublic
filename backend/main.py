"""
Backend: Sistema de Gestion de Obras Publicas - Temascaltepec
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from app.database import engine, Base
from app.routers import obras, constructoras, supervisores, informes, presupuestos, regiones, estadisticas
from app.routers import auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Crea tablas solo si la BD esta disponible
    try:
        Base.metadata.create_all(bind=engine)
    except Exception as e:
        print(f"[WARNING] No se pudo conectar a la BD al arrancar: {e}")
    yield

app = FastAPI(
    title="API - Obras Publicas Temascaltepec",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(obras.router,         prefix="/api/obras",         tags=["Obras"])
app.include_router(constructoras.router, prefix="/api/constructoras", tags=["Constructoras"])
app.include_router(supervisores.router,  prefix="/api/supervisores",  tags=["Supervisores"])
app.include_router(informes.router,      prefix="/api/informes",      tags=["Informes"])
app.include_router(presupuestos.router,  prefix="/api/presupuestos",  tags=["Presupuestos"])
app.include_router(regiones.router,      prefix="/api/regiones",      tags=["Regiones"])
app.include_router(estadisticas.router,  prefix="/api/estadisticas",  tags=["Estadisticas"])
app.include_router(auth.router,          prefix="/api/auth",          tags=["Autenticacion"])

@app.get("/")
def root():
    return {"mensaje": "API Obras Publicas - OK"}

# Este endpoint es el que Railway llama para verificar que el servidor vive
# NO debe tocar la base de datos, solo responder rapido
@app.get("/health")
def health():
    return {"status": "ok"}
