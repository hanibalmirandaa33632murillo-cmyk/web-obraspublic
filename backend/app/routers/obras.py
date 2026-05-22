"""
Router: /api/obras
Endpoints CRUD para la entidad central Obra.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List

from app.database import get_db
from app import models, schemas

router = APIRouter()


@router.get("/", response_model=List[schemas.ObraResumen])
def listar_obras(db: Session = Depends(get_db)):
    """Devuelve todas las obras con datos basicos de region y constructora."""
    return (
        db.query(models.Obra)
        .options(
            joinedload(models.Obra.region),
            joinedload(models.Obra.constructora),
        )
        .all()
    )


@router.get("/{id_obra}", response_model=schemas.ObraOut)
def obtener_obra(id_obra: str, db: Session = Depends(get_db)):
    """Devuelve una obra completa con todas sus relaciones."""
    obra = (
        db.query(models.Obra)
        .options(
            joinedload(models.Obra.region),
            joinedload(models.Obra.constructora),
            joinedload(models.Obra.supervisor),
            joinedload(models.Obra.opciones).joinedload(models.OpcionSeleccion.constructora),
            joinedload(models.Obra.presupuesto).joinedload(models.PresupuestoObra.costos),
            joinedload(models.Obra.informes),
            joinedload(models.Obra.permisos),
            joinedload(models.Obra.acta_entrega).joinedload(models.ActaEntrega.firmantes),
        )
        .filter(models.Obra.id_obra == id_obra)
        .first()
    )
    if not obra:
        raise HTTPException(status_code=404, detail="Obra no encontrada")
    return obra


@router.post("/", response_model=schemas.ObraResumen, status_code=201)
def crear_obra(obra_data: schemas.ObraCreate, db: Session = Depends(get_db)):
    """Crea una nueva obra."""
    if db.query(models.Obra).filter(models.Obra.id_obra == obra_data.id_obra).first():
        raise HTTPException(status_code=400, detail="Ya existe una obra con ese ID")
    nueva_obra = models.Obra(**obra_data.model_dump())
    db.add(nueva_obra)
    db.commit()
    db.refresh(nueva_obra)
    return nueva_obra


@router.put("/{id_obra}", response_model=schemas.ObraResumen)
def actualizar_obra(id_obra: str, datos: schemas.ObraCreate, db: Session = Depends(get_db)):
    """Actualiza los datos de una obra existente."""
    obra = db.query(models.Obra).filter(models.Obra.id_obra == id_obra).first()
    if not obra:
        raise HTTPException(status_code=404, detail="Obra no encontrada")
    for campo, valor in datos.model_dump().items():
        setattr(obra, campo, valor)
    db.commit()
    db.refresh(obra)
    return obra


@router.delete("/{id_obra}", status_code=204)
def eliminar_obra(id_obra: str, db: Session = Depends(get_db)):
    """Elimina una obra. Por CASCADE se eliminan informes, permisos, acta, etc."""
    obra = db.query(models.Obra).filter(models.Obra.id_obra == id_obra).first()
    if not obra:
        raise HTTPException(status_code=404, detail="Obra no encontrada")
    db.delete(obra)
    db.commit()
