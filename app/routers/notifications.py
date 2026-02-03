from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import database, models, schemas

router = APIRouter(
    prefix="/notifications",
    tags=["notifications"]
)

@router.post("/register-token", status_code=status.HTTP_201_CREATED)
def register_device_token(token_data: schemas.DeviceTokenCreate, db: Session = Depends(database.get_db)):
    # Check if token exists
    existing_token = db.query(models.DeviceToken).filter(models.DeviceToken.token == token_data.token).first()
    if existing_token:
        return {"message": "Token already registered"}
    
    new_token = models.DeviceToken(token=token_data.token)
    db.add(new_token)
    db.commit()
    return {"message": "Token registered successfully"}
