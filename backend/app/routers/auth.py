"""
Router: /api/auth
Endpoints de registro y login de usuarios.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.database import get_db
from app import models
from app.auth import hash_password, verify_password, create_access_token, get_current_user

router = APIRouter()


# ── Schemas de request/response ──────────────────────────────────────────────
class RegisterInput(BaseModel):
    nombre: str
    email: str
    password: str
    rol: str = "viewer"  # viewer | supervisor | admin


class UserOut(BaseModel):
    id: int
    nombre: str
    email: str
    rol: str
    activo: bool

    class Config:
        from_attributes = True


class TokenOut(BaseModel):
    access_token: str
    token_type: str
    user: UserOut


# ── Endpoints ────────────────────────────────────────────────────────────────
@router.post("/register", response_model=TokenOut, status_code=201)
def register(data: RegisterInput, db: Session = Depends(get_db)):
    """Registra un nuevo usuario y devuelve su token JWT."""
    if db.query(models.Usuario).filter(models.Usuario.email == data.email).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe una cuenta con ese correo",
        )
    nuevo = models.Usuario(
        nombre=data.nombre,
        email=data.email,
        password=hash_password(data.password),
        rol=data.rol,
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    token = create_access_token({"sub": nuevo.email, "rol": nuevo.rol})
    return TokenOut(
        access_token=token,
        token_type="bearer",
        user=UserOut.model_validate(nuevo),
    )


@router.post("/login", response_model=TokenOut)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Login con email y password.
    Devuelve un token JWT valido por ACCESS_TOKEN_EXPIRE_MINUTES minutos.
    """
    user = db.query(models.Usuario).filter(models.Usuario.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.activo:
        raise HTTPException(status_code=403, detail="Cuenta desactivada")

    token = create_access_token({"sub": user.email, "rol": user.rol})
    return TokenOut(
        access_token=token,
        token_type="bearer",
        user=UserOut.model_validate(user),
    )


@router.get("/me", response_model=UserOut)
def me(current_user: models.Usuario = Depends(get_current_user)):
    """Devuelve los datos del usuario autenticado."""
    return current_user
