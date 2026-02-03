from sqlalchemy.orm import Session
from firebase_admin import messaging
from .. import models

def send_broadcast_notification(title: str, body: str, db: Session):
    # Fetch all tokens
    tokens = db.query(models.DeviceToken.token).all()
    # Flatten list of tuples
    token_list = [t[0] for t in tokens]

    if not token_list:
        return {"sent": 0, "failed": 0}

    # Firebase Multicast (broadcast to all)
    # limit per batch is 500, simple implementation for now
    # If list is > 500, should batch it. Assuming small scale for now.
    
    message = messaging.MulticastMessage(
        notification=messaging.Notification(
            title=title,
            body=body,
        ),
        tokens=token_list,
    )

    try:
        response = messaging.send_multicast(message)
        # Optional: cleanup invalid tokens based on response
        return {
            "sent": response.success_count,
            "failed": response.failure_count,
        }
    except Exception as e:
        print(f"Error sending notification: {e}")
        return {"error": str(e)}
