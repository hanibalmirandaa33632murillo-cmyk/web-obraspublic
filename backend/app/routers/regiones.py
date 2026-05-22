"""Router: /api/regiones"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.RegionOut])
def listar(db: Session = Depends(get_db)):
    return db.query(models.Region).all()
