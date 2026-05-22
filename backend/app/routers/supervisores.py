"""Router: /api/supervisores"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session, joinedload
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.SupervisorOut])
def listar(db: Session = Depends(get_db)):
    rows = db.query(models.Supervisor).options(joinedload(models.Supervisor.personal)).all()
    result = []
    for s in rows:
        result.append(schemas.SupervisorOut(
            codigo_personal=s.codigo_personal,
            nombre=s.personal.nombre,
            apellido_paterno=s.personal.apellido_paterno,
            apellido_materno=s.personal.apellido_materno,
            telefono=s.telefono,
        ))
    return result
