"""
Database Connection Manager
Handles MongoDB connection setup and teardown
"""
import os
from mongoengine import connect, disconnect


def connect_database():
    """
    Connect to MongoDB using MongoEngine
    Reads MONGODB_URI from environment variables
    """
    try:
        mongodb_uri = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/hrms')
        print(f"🔗 Attempting to connect to MongoDB with URI: {mongodb_uri}")
        connect(host=mongodb_uri, serverSelectionTimeoutMS=5000)
        print(f"✅ Connected to MongoDB")
        return True
    except Exception as e:
        print(f"❌ Failed to connect to MongoDB: {str(e)}")
        return False


def disconnect_database():
    """
    Disconnect from MongoDB
    Called on application shutdown
    """
    try:
        disconnect()
        print("✅ Disconnected from MongoDB")
        return True
    except Exception as e:
        print(f"⚠️ Error disconnecting from MongoDB: {str(e)}")
        return False
