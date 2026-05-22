"""
Configuracion de la conexion a PostgreSQL via SQLAlchemy.
Lee DATABASE_URL del entorno (Railway la inyecta automaticamente).
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

# Railway a veces da URLs que empiezan con "postgres://" (viejo formato)
# SQLAlchemy necesita "postgresql://"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

if not DATABASE_URL:
    print("[WARNING] DATABASE_URL no esta configurada. La BD no funcionara.")
    DATABASE_URL = "postgresql://user:pass@localhost/obras"

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,      # verifica la conexion antes de usarla
    pool_recycle=300,        # recicla conexiones cada 5 minutos
    connect_args={}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
