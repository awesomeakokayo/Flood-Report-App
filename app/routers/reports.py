from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import crud, schemas, database, dependencies

router = APIRouter(
    prefix="/reports",
    tags=["reports"]
)

@router.get("/", response_model=List[schemas.FloodReport])
def read_reports(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    reports = crud.get_flood_reports(db, skip=skip, limit=limit)
    return reports

@router.post("/", response_model=schemas.FloodReport)
def create_report(
    report: schemas.FloodReportCreate, 
    db: Session = Depends(database.get_db),
    current_user: schemas.User = Depends(dependencies.get_current_user)
):
    return crud.create_flood_report(db=db, report=report, user_id=current_user.id)
