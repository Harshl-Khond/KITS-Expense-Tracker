import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# Try to load from environment variable first (standard for production/Render)
service_account_info = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

if service_account_info:
    try:
        # If it's a path to a file, load it. If it's a JSON string, parse it.
        if service_account_info.startswith("{"):
            info = json.loads(service_account_info)
            cred = credentials.Certificate(info)
        else:
            cred = credentials.Certificate(service_account_info)
    except Exception as e:
        raise RuntimeError(f"Failed to initialize Firebase from FIREBASE_SERVICE_ACCOUNT: {e}")
else:
    # Fallback to local file for development
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    SERVICE_ACCOUNT_PATH = os.path.join(BASE_DIR, "serviceAccountKey.json")
    
    if not os.path.exists(SERVICE_ACCOUNT_PATH):
        raise RuntimeError("FIREBASE_SERVICE_ACCOUNT env var not set and serviceAccountKey.json not found locally.")
    
    cred = credentials.Certificate(SERVICE_ACCOUNT_PATH)

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()
