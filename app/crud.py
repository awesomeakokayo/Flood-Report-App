from sqlalchemy.orm import Session
from . import models, schemas, auth

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        phone_number=user.phone_number,
        full_name=user.full_name,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_flood_reports(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.FloodReport).offset(skip).limit(limit).all()

def create_flood_report(db: Session, report: schemas.FloodReportCreate, user_id: int, image_name: str = None, image_mime: str = None, is_verified: bool = False):
    db_report = models.FloodReport(
        **report.dict(),
        user_id=user_id,
        image_name=image_name,
        image_mime=image_mime,
        is_verified=is_verified
    )
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report