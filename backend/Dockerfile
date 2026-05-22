# ── Backend: FastAPI + Python ──────────────────────────────────────────────
FROM python:3.12-slim

WORKDIR /app

# Instalar dependencias del sistema para psycopg2
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Puerto que expone el backend (Railway lo mapea automaticamente)
EXPOSE 8000

# Iniciar uvicorn. Railway inyecta PORT como variable de entorno.
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
