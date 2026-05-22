"""
Modelos SQLAlchemy.
Cada clase representa exactamente una tabla del schema.sql.
Los nombres de columnas son identicos al DDL para facilitar la explicacion.
"""

from sqlalchemy import (
    Column, String, Integer, SmallInteger, Numeric, Date,
    Boolean, Text, UniqueConstraint, ForeignKey, CheckConstraint
)
from sqlalchemy.orm import relationship
from app.database import Base


class Region(Base):
    __tablename__ = "region"
    id_region   = Column(String(10), primary_key=True)
    comunidad   = Column(String(100), nullable=False)
    barrio      = Column(String(100))
    colonia     = Column(String(100))

    obras = relationship("Obra", back_populates="region")


class Constructora(Base):
    __tablename__ = "constructora"
    id_constructora     = Column(String(10), primary_key=True)
    rfc                 = Column(String(13), unique=True, nullable=False)
    nombre_constructora = Column(String(150), nullable=False)
    empresa             = Column(String(150))
    tipo_ejecutor       = Column(String(50))

    obras      = relationship("Obra", back_populates="constructora")
    opciones   = relationship("OpcionSeleccion", back_populates="constructora")
    proyectistas = relationship("Proyectista", back_populates="constructora")


class Personal(Base):
    __tablename__ = "personal"
    codigo_personal  = Column(String(20), primary_key=True)
    nombre           = Column(String(100), nullable=False)
    apellido_paterno = Column(String(200), nullable=False)
    apellido_materno = Column(String(200))

    supervisor  = relationship("Supervisor",  back_populates="personal", uselist=False)
    proyectista = relationship("Proyectista", back_populates="personal", uselist=False)


class Supervisor(Base):
    __tablename__ = "supervisor"
    codigo_personal = Column(String(20), ForeignKey("personal.codigo_personal", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    telefono        = Column(String(15))

    personal = relationship("Personal", back_populates="supervisor")
    obras    = relationship("Obra",     back_populates="supervisor")
    informes = relationship("Informe",  back_populates="supervisor")


class Proyectista(Base):
    __tablename__ = "proyectista"
    codigo_personal = Column(String(20), ForeignKey("personal.codigo_personal", ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    empresa         = Column(String(150))
    id_constructora = Column(String(10), ForeignKey("constructora.id_constructora"))

    personal      = relationship("Personal",      back_populates="proyectista")
    constructora  = relationship("Constructora",  back_populates="proyectistas")
    presupuestos  = relationship("PresupuestoObra", back_populates="proyectista")


class FuentePresupuestaria(Base):
    __tablename__ = "fuente_presupuestaria"
    id_fuente   = Column(String(10), primary_key=True)
    grado_nivel = Column(String(50),  nullable=False)
    programa    = Column(String(150))
    monto       = Column(Numeric(15, 2))

    financiamientos = relationship("Financia", back_populates="fuente")


class Obra(Base):
    __tablename__ = "obra"
    id_obra             = Column(String(20), primary_key=True)
    id_constructora     = Column(String(10), ForeignKey("constructora.id_constructora"))
    id_region           = Column(String(10), ForeignKey("region.id_region", onupdate="CASCADE"), nullable=False)
    codigo_supervisor   = Column(String(20), ForeignKey("supervisor.codigo_personal", onupdate="CASCADE"), nullable=False)
    codigo_expediente   = Column(String(50), unique=True, nullable=False)
    nombre_obra         = Column(String(200), nullable=False)
    etapa               = Column(SmallInteger, default=1)
    fecha_inicio        = Column(Date, nullable=False)
    fecha_finalizacion  = Column(Date)
    descripcion         = Column(Text)
    beneficiarios       = Column(Integer)

    region       = relationship("Region",       back_populates="obras")
    constructora = relationship("Constructora", back_populates="obras")
    supervisor   = relationship("Supervisor",   back_populates="obras")
    financiamientos  = relationship("Financia",        back_populates="obra")
    opciones         = relationship("OpcionSeleccion", back_populates="obra")
    presupuesto      = relationship("PresupuestoObra", back_populates="obra", uselist=False)
    informes         = relationship("Informe",         back_populates="obra")
    permisos         = relationship("Permiso",         back_populates="obra")
    acta_entrega     = relationship("ActaEntrega",     back_populates="obra", uselist=False)


class Financia(Base):
    """Tabla intermedia N:M entre Obra y FuentePresupuestaria."""
    __tablename__ = "financia"
    id_obra   = Column(String(20), ForeignKey("obra.id_obra",                    ondelete="CASCADE", onupdate="CASCADE"), primary_key=True)
    id_fuente = Column(String(10), ForeignKey("fuente_presupuestaria.id_fuente", onupdate="CASCADE"), primary_key=True)

    obra   = relationship("Obra",               back_populates="financiamientos")
    fuente = relationship("FuentePresupuestaria", back_populates="financiamientos")


class OpcionSeleccion(Base):
    __tablename__ = "opcion_seleccion"
    id_participante      = Column(String(20), primary_key=True)
    id_obra              = Column(String(20), ForeignKey("obra.id_obra", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    id_constructora      = Column(String(10), ForeignKey("constructora.id_constructora"), nullable=False)
    aprobado             = Column(Boolean, nullable=False, default=False)
    razones_decision     = Column(Text)
    porcentaje_propuesta = Column(Numeric(5, 2))
    costo_propuesto      = Column(Numeric(15, 2))
    experiencia_anios    = Column(SmallInteger)
    tiempo_estimado_dias = Column(Integer)

    obra         = relationship("Obra",         back_populates="opciones")
    constructora = relationship("Constructora", back_populates="opciones")


class PresupuestoObra(Base):
    __tablename__ = "presupuesto_obra"
    __table_args__ = (UniqueConstraint("id_obra", name="uq_pres_obra"),)

    id_presupuesto    = Column(String(20), primary_key=True)
    presupuesto_total = Column(Numeric(15, 2), nullable=False)
    codigo_proyectista = Column(String(20), ForeignKey("proyectista.codigo_personal", onupdate="CASCADE"), nullable=False)
    id_obra           = Column(String(20), ForeignKey("obra.id_obra", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)

    proyectista = relationship("Proyectista",  back_populates="presupuestos")
    obra        = relationship("Obra",         back_populates="presupuesto")
    costos      = relationship("Costo",        back_populates="presupuesto")


class Costo(Base):
    __tablename__ = "costos"
    id_gasto_compuesto = Column(String(20), primary_key=True)
    id_presupuesto     = Column(String(20), ForeignKey("presupuesto_obra.id_presupuesto", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    categoria          = Column(String(100), nullable=False)
    costo              = Column(Numeric(15, 2), nullable=False)
    descripcion        = Column(Text)

    presupuesto = relationship("PresupuestoObra", back_populates="costos")


class Informe(Base):
    __tablename__ = "informes"
    id_informe                    = Column(String(20), primary_key=True)
    anio                          = Column(Integer, nullable=False)
    mes                           = Column(String(30), nullable=False)
    porcentaje_avance_fisico      = Column(SmallInteger, nullable=False)
    porcentaje_avance_presupuestario = Column(SmallInteger, nullable=False)
    documento_informe             = Column(Text)
    descripcion                   = Column(Text)
    id_obra                       = Column(String(20), ForeignKey("obra.id_obra", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    codigo_supervisor             = Column(String(20), ForeignKey("supervisor.codigo_personal", onupdate="CASCADE"), nullable=False)

    obra       = relationship("Obra",       back_populates="informes")
    supervisor = relationship("Supervisor", back_populates="informes")


class Permiso(Base):
    __tablename__ = "permisos"
    id_oficio                  = Column(String(20), primary_key=True)
    id_obra                    = Column(String(20), ForeignKey("obra.id_obra", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    nombre_instancia           = Column(String(150), nullable=False)
    oficio_acreditacion_permiso = Column(Text)

    obra = relationship("Obra", back_populates="permisos")


class ActaEntrega(Base):
    __tablename__ = "acta_entrega"
    __table_args__ = (UniqueConstraint("id_obra", name="uq_acta_obra"),)

    id_acta_entrega = Column(String(20), primary_key=True)
    id_obra         = Column(String(20), ForeignKey("obra.id_obra", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    fecha_expedicion = Column(Date, nullable=False)
    acta_entrega    = Column(Text)

    obra      = relationship("Obra",     back_populates="acta_entrega")
    firmantes = relationship("Firmante", back_populates="acta")


class Firmante(Base):
    __tablename__ = "firmantes"
    id_firmante     = Column(String(20), primary_key=True)
    id_acta_entrega = Column(String(20), ForeignKey("acta_entrega.id_acta_entrega", ondelete="CASCADE", onupdate="CASCADE"), nullable=False)
    nombre          = Column(String(100), nullable=False)
    apellido_paterno = Column(String(200), nullable=False)
    apellido_materno = Column(String(200))
    nombre_completo = Column(String(400))
    cargo           = Column(String(100), nullable=False)

    acta = relationship("ActaEntrega", back_populates="firmantes")
