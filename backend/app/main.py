"""
FastAPI Main Application
Entry point for HRMS Lite backend server
"""
from fastapi import FastAPI # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware # pyright: ignore[reportMissingImports]
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import configuration
from config import get_settings

# Import database and routes
from app.utils import connect_database, disconnect_database
from app.routes import employee_router, attendance_router

# Get settings
settings = get_settings()

# Create FastAPI application
app = FastAPI(
    title="HRMS Lite API",
    description="Human Resource Management System - Backend API",
    version="1.0.0"
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(employee_router)
app.include_router(attendance_router)


# Startup Event
@app.on_event("startup")
async def startup_event():
    """Initialize database connection on startup"""
    print(" Starting HRMS Lite Backend...")
    connect_database()


# Shutdown Event
@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    print("Shutting down HRMS Lite Backend...")
    disconnect_database()


# Health Check Endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "HRMS Lite API",
        "version": "1.0.0"
    }


# Root Endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "HRMS Lite Backend API",
        "documentation": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    
    # Get configuration from environment
    host = os.getenv("API_HOST", "0.0.0.0")
    port = int(os.getenv("API_PORT", 8000))
    
    # Run the server
    uvicorn.run(
        "app.main:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
