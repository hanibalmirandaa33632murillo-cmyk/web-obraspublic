"""
Schemas Pydantic: definen la forma de los datos que entran y salen de la API.
Separa la capa de presentacion (JSON) del modelo de base de datos.
"""

from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from decimal import Decimal


# ── REGION ──────────────────────────────────────────────────────────────────
class RegionBase(BaseModel):
    id_region: str
    comunidad: str
    barrio: Optional[str] = None
    colonia: Optional[str] = None

class RegionOut(RegionBase):
    class Config:
        from_attributes = True


# ── CONSTRUCTORA ─────────────────────────────────────────────────────────────
class ConstructoraBase(BaseModel):
    id_constructora: str
    rfc: str
    nombre_constructora: str
    empresa: Optional[str] = None
    tipo_ejecutor: Optional[str] = None

class ConstructoraOut(ConstructoraBase):
    class Config:
        from_attributes = True


# ── PERSONAL / SUPERVISOR / PROYECTISTA ──────────────────────────────────────
class PersonalBase(BaseModel):
    codigo_personal: str
    nombre: str
    apellido_paterno: str
    apellido_materno: Optional[str] = None

class SupervisorOut(PersonalBase):
    telefono: Optional[str] = None
    class Config:
        from_attributes = True

class ProyectistaOut(PersonalBase):
    empresa: Optional[str] = None
    id_constructora: Optional[str] = None
    class Config:
        from_attributes = True


# ── FUENTE PRESUPUESTARIA ────────────────────────────────────────────────────
class FuenteOut(BaseModel):
    id_fuente: str
    grado_nivel: str
    programa: Optional[str] = None
    monto: Optional[Decimal] = None
    class Config:
        from_attributes = True


# ── OPCION DE SELECCION ──────────────────────────────────────────────────────
class OpcionOut(BaseModel):
    id_participante: str
    id_constructora: str
    nombre_constructora: Optional[str] = None
    aprobado: bool
    razones_decision: Optional[str] = None
    porcentaje_propuesta: Optional[Decimal] = None
    costo_propuesto: Optional[Decimal] = None
    experiencia_anios: Optional[int] = None
    tiempo_estimado_dias: Optional[int] = None
    class Config:
        from_attributes = True


# ── COSTO ────────────────────────────────────────────────────────────────────
class CostoOut(BaseModel):
    id_gasto_compuesto: str
    categoria: str
    costo: Decimal
    descripcion: Optional[str] = None
    class Config:
        from_attributes = True


# ── PRESUPUESTO ──────────────────────────────────────────────────────────────
class PresupuestoOut(BaseModel):
    id_presupuesto: str
    presupuesto_total: Decimal
    codigo_proyectista: str
    costos: List[CostoOut] = []
    class Config:
        from_attributes = True


# ── INFORME ──────────────────────────────────────────────────────────────────
class InformeBase(BaseModel):
    id_informe: str
    anio: int
    mes: str
    porcentaje_avance_fisico: int
    porcentaje_avance_presupuestario: int
    descripcion: Optional[str] = None
    id_obra: str
    codigo_supervisor: str

class InformeCreate(BaseModel):
    id_informe: str
    anio: int
    mes: str
    porcentaje_avance_fisico: int
    porcentaje_avance_presupuestario: int
    descripcion: Optional[str] = None
    id_obra: str
    codigo_supervisor: str

class InformeOut(InformeBase):
    class Config:
        from_attributes = True


# ── PERMISO ──────────────────────────────────────────────────────────────────
class PermisoOut(BaseModel):
    id_oficio: str
    nombre_instancia: str
    oficio_acreditacion_permiso: Optional[str] = None
    class Config:
        from_attributes = True


# ── FIRMANTE ─────────────────────────────────────────────────────────────────
class FirmanteOut(BaseModel):
    id_firmante: str
    nombre_completo: Optional[str] = None
    cargo: str
    class Config:
        from_attributes = True


# ── ACTA DE ENTREGA ──────────────────────────────────────────────────────────
class ActaOut(BaseModel):
    id_acta_entrega: str
    fecha_expedicion: date
    firmantes: List[FirmanteOut] = []
    class Config:
        from_attributes = True


# ── OBRA (schema completo con relaciones) ────────────────────────────────────
class ObraBase(BaseModel):
    id_obra: str
    codigo_expediente: str
    nombre_obra: str
    etapa: Optional[int] = 1
    fecha_inicio: date
    fecha_finalizacion: Optional[date] = None
    descripcion: Optional[str] = None
    beneficiarios: Optional[int] = None
    id_region: str
    id_constructora: Optional[str] = None
    codigo_supervisor: str

class ObraCreate(ObraBase):
    pass

class ObraOut(ObraBase):
    region: Optional[RegionOut] = None
    constructora: Optional[ConstructoraOut] = None
    opciones: List[OpcionOut] = []
    presupuesto: Optional[PresupuestoOut] = None
    informes: List[InformeOut] = []
    permisos: List[PermisoOut] = []
    acta_entrega: Optional[ActaOut] = None
    class Config:
        from_attributes = True

class ObraResumen(BaseModel):
    """Esquema ligero para listados."""
    id_obra: str
    nombre_obra: str
    etapa: Optional[int] = 1
    fecha_inicio: date
    fecha_finalizacion: Optional[date] = None
    beneficiarios: Optional[int] = None
    region: Optional[RegionOut] = None
    constructora: Optional[ConstructoraOut] = None
    class Config:
        from_attributes = True


# ── ESTADISTICAS DASHBOARD ───────────────────────────────────────────────────
class EstadisticasOut(BaseModel):
    obras_activas: int
    obras_terminadas: int
    total_beneficiarios: int
    presupuesto_total_ejercido: Decimal
    informes_mes_actual: int
    promedio_avance_fisico: float
    promedio_avance_presupuestario: float
