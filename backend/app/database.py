"""
Conexion a PostgreSQL usando SQLAlchemy.
La URL de conexion se lee desde la variable de entorno DATABASE_URL.

Formato esperado:
  postgresql://usuario:password@host:puerto/nombre_db

En Railway: se configura automaticamente en las variables de entorno del proyecto.
En local (Docker): usa el valor del archivo .env
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()  # carga el archivo .env en desarrollo local

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://obras_user:obras_pass@localhost:5432/obras_publicas"
)

# SQLAlchemy necesita "postgresql://" no "postgres://" (Railway a veces da el segundo)
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Dependencia de FastAPI: abre y cierra la sesion por request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
