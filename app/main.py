from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv

from .database import engine
from .models import Base

from .routers import auth as auth_router
from .routers import reports as reports_router

load_dotenv()

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Flood Report API")

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Flood Report API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Serve static files if directory exists
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
if os.path.exists(STATIC_DIR):
    app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Include routers
app.include_router(auth_router.router, prefix="/auth", tags=["authentication"])
app.include_router(reports_router.router, prefix="/reports", tags=["reports"])