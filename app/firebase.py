import firebase_admin
from firebase_admin import credentials
import os
import json

_firebase_initialized = False


def initialize_firebase():
    global _firebase_initialized

    if _firebase_initialized:
        return

    # Avoid error if already initialized by other means
    try:
        firebase_admin.get_app()
        _firebase_initialized = True
        return
    except ValueError:
        pass  # Not initialized yet

    # Prefer the bundled service account JSON file
    service_account_path = os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "firebase_service.json"
    )

    try:
        if os.path.exists(service_account_path):
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred)
            _firebase_initialized = True
            return

        # Fallback to FIREBASE_SERVICE_ACCOUNT env var (single-line JSON)
        firebase_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT")
        if firebase_json:
            service_account_info = json.loads(firebase_json)
            cred = credentials.Certificate(service_account_info)
            firebase_admin.initialize_app(cred)
            _firebase_initialized = True
            return

        print("Warning: Firebase credentials not found. Push notifications disabled.")
    except Exception as e:
        print(f"Error initializing Firebase: {e}")
