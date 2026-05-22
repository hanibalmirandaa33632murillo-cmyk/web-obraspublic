"""Router: /api/informes"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.InformeOut])
def listar_informes(db: Session = Depends(get_db)):
    return db.query(models.Informe).all()

@router.get("/obra/{id_obra}", response_model=List[schemas.InformeOut])
def informes_por_obra(id_obra: str, db: Session = Depends(get_db)):
    return db.query(models.Informe).filter(models.Informe.id_obra == id_obra).all()

@router.post("/", response_model=schemas.InformeOut, status_code=201)
def crear_informe(data: schemas.InformeCreate, db: Session = Depends(get_db)):
    if db.query(models.Informe).filter(models.Informe.id_informe == data.id_informe).first():
        raise HTTPException(400, "Informe ya existe")
    nuevo = models.Informe(**data.model_dump())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

@router.delete("/{id_informe}", status_code=204)
def eliminar_informe(id_informe: str, db: Session = Depends(get_db)):
    inf = db.query(models.Informe).filter(models.Informe.id_informe == id_informe).first()
    if not inf:
        raise HTTPException(404, "Informe no encontrado")
    db.delete(inf)
    db.commit()
