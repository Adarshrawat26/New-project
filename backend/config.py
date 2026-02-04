"""
Production Configuration
Secure settings for production deployment
"""
import os
from functools import lru_cache

class Settings:
    """Application settings based on environment"""
    
    # Environment
    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")
    
    # Database
    MONGODB_URI = os.getenv(
        "MONGODB_URI",
        "mongodb://localhost:27017/hrms"
    )
    
    # API Configuration
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", 8000))
    
    # CORS Configuration - Restrict in production
    if ENVIRONMENT == "production":
        ALLOWED_ORIGINS = [
            "https://hrmsd.netlify.app",  # Netlify frontend
            "http://localhost:3000",  # Local development
        ]
    else:
        ALLOWED_ORIGINS = ["*"]  # Allow all in development
    
    # Security
    DEBUG = ENVIRONMENT != "production"
    
    @classmethod
    def get_cors_origins(cls):
        """Get allowed CORS origins based on environment"""
        return cls.ALLOWED_ORIGINS
    
    @classmethod
    def is_production(cls):
        """Check if running in production"""
        return cls.ENVIRONMENT == "production"

@lru_cache()
def get_settings():
    """Get application settings"""
    return Settings()
