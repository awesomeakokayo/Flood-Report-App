import os
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException, status
from sqlalchemy.orm import Session
from .. import crud, schemas, database, dependencies
from ..verification import verify_flood_media

router = APIRouter(
    prefix="/reports",
    tags=["reports"]
)

@router.get("/", response_model=List[schemas.FloodReport])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    reports = crud.get_flood_reports(db, skip=skip, limit=limit)
    return reports

@router.post("/", response_model=schemas.FloodReport)
async def create_report(
    location: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    severity: str = Form(...),
    water_level: str = Form(...),
    description: Optional[str] = Form(None),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(dependencies.get_current_user)
):
    image_name = None
    image_mime = None
    is_verified = False
    
    if image:
        # Read file content for verification
        contents = await image.read()
        
        # AI Verification
        verification_result = await verify_flood_media(contents, image.content_type)
        
        if not verification_result.get("verified"):
            reason = verification_result.get("reason", "Unknown reason")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Verification failed: {reason}"
            )
        
        # Save image if verified
        image_ext = os.path.splitext(image.filename)[1]
        image_name = f"{uuid.uuid4()}{image_ext}"
        image_mime = image.content_type
        
        # Ensure static/uploads exists
        upload_dir = os.path.join("app", "static", "uploads")
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, image_name)
        with open(file_path, "wb") as f:
            f.write(contents)
            
        is_verified = True

    report_data = schemas.FloodReportCreate(
        location=location,
        latitude=latitude,
        longitude=longitude,
        severity=severity,
        water_level=water_level,
        description=description
    )

    return crud.create_flood_report(
        db=db, 
        report=report_data, 
        user_id=current_user.id,
        image_name=image_name,
        image_mime=image_mime,
        is_verified=is_verified
    )
