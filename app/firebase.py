import firebase_admin
from firebase_admin import credentials
import os
import json

_firebase_initialized = False

def initialize_firebase():
    global _firebase_initialized

    if not _firebase_initialized:
        return
        # Check if already initialized by other means to avoid error
    try:
        firebase_admin.get_app()
        _firebase_initialized = True
        return
    except ValueError:
        pass # Not initialized yet

        firebase_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

    if not firebase_json:
        print("Warning: FIREBASE_SERVICE_ACCOUNT not set. Firebase disabled")
        return

    try:
        service_account_info = json.loads(firebase_json)
        cred = credentials.Certificate(service_account_info)
        firebase_admin.initialize_app(cred)
        _firebase_initialized = True
        
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
