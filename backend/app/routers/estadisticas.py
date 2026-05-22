"""
Router: /api/estadisticas
Datos agregados para el dashboard de supervision.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.get("/dashboard", response_model=schemas.EstadisticasOut)
def dashboard(db: Session = Depends(get_db)):
    """Estadisticas generales para los widgets del dashboard."""

    # Obras activas (sin fecha de finalizacion o finalizacion en el futuro)
    obras_activas = (
        db.query(func.count(models.Obra.id_obra))
        .filter(
            (models.Obra.fecha_finalizacion == None) |
            (models.Obra.fecha_finalizacion > date.today())
        )
        .scalar() or 0
    )

    # Obras terminadas
    obras_terminadas = (
        db.query(func.count(models.Obra.id_obra))
        .filter(models.Obra.fecha_finalizacion <= date.today())
        .scalar() or 0
    )

    # Total beneficiarios
    total_beneficiarios = (
        db.query(func.coalesce(func.sum(models.Obra.beneficiarios), 0))
        .scalar() or 0
    )

    # Presupuesto total ejercido (suma de todos los presupuestos)
    presupuesto_total = (
        db.query(func.coalesce(func.sum(models.PresupuestoObra.presupuesto_total), 0))
        .scalar() or 0
    )

    # Informes del mes actual
    hoy = date.today()
    meses_es = ["","Enero","Febrero","Marzo","Abril","Mayo","Junio",
                 "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    mes_actual = meses_es[hoy.month]
    informes_mes = (
        db.query(func.count(models.Informe.id_informe))
        .filter(models.Informe.anio == hoy.year, models.Informe.mes == mes_actual)
        .scalar() or 0
    )

    # Promedio de avance fisico y presupuestario
    avg_fisico = (
        db.query(func.avg(models.Informe.porcentaje_avance_fisico)).scalar() or 0
    )
    avg_presupuesto = (
        db.query(func.avg(models.Informe.porcentaje_avance_presupuestario)).scalar() or 0
    )

    return schemas.EstadisticasOut(
        obras_activas=obras_activas,
        obras_terminadas=obras_terminadas,
        total_beneficiarios=total_beneficiarios,
        presupuesto_total_ejercido=presupuesto_total,
        informes_mes_actual=informes_mes,
        promedio_avance_fisico=round(float(avg_fisico), 1),
        promedio_avance_presupuestario=round(float(avg_presupuesto), 1),
    )


@router.get("/avance-mensual")
def avance_mensual(db: Session = Depends(get_db)):
    """Avance fisico promedio por mes (para grafica lineal)."""
    resultados = (
        db.query(
            models.Informe.anio,
            models.Informe.mes,
            func.avg(models.Informe.porcentaje_avance_fisico).label("avg_fisico"),
            func.avg(models.Informe.porcentaje_avance_presupuestario).label("avg_presupuesto"),
        )
        .group_by(models.Informe.anio, models.Informe.mes)
        .order_by(models.Informe.anio, models.Informe.mes)
        .all()
    )
    return [
        {
            "anio": r.anio,
            "mes": r.mes,
            "avance_fisico": round(float(r.avg_fisico), 1),
            "avance_presupuesto": round(float(r.avg_presupuesto), 1),
        }
        for r in resultados
    ]


@router.get("/obras-por-region")
def obras_por_region(db: Session = Depends(get_db)):
    """Cantidad de obras agrupadas por region (para grafica circular)."""
    resultados = (
        db.query(
            models.Region.comunidad,
            func.count(models.Obra.id_obra).label("total"),
        )
        .join(models.Obra, models.Obra.id_region == models.Region.id_region)
        .group_by(models.Region.comunidad)
        .all()
    )
    return [{"region": r.comunidad, "total": r.total} for r in resultados]
