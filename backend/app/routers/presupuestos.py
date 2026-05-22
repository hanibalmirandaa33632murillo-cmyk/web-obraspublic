"""Router: /api/presupuestos"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.PresupuestoOut])
def listar(db: Session = Depends(get_db)):
    return (
        db.query(models.PresupuestoObra)
        .options(joinedload(models.PresupuestoObra.costos))
        .all()
    )

@router.get("/obra/{id_obra}", response_model=schemas.PresupuestoOut)
def por_obra(id_obra: str, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    p = (
        db.query(models.PresupuestoObra)
        .options(joinedload(models.PresupuestoObra.costos))
        .filter(models.PresupuestoObra.id_obra == id_obra)
        .first()
    )
    if not p:
        raise HTTPException(404, "Presupuesto no encontrado")
    return p
