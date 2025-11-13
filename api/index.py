"""
Vercel Serverless Function Entry Point for FastAPI Backend
"""
import sys
import os

# Add the parent directory to Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
sys.path.insert(0, parent_dir)

# Import FastAPI app
from backend.app.main import app

# Use Mangum to wrap FastAPI for AWS Lambda/Vercel
try:
    from mangum import Mangum
    handler = Mangum(app, lifespan="off")
except ImportError:
    # Fallback if mangum not available
    handler = app
