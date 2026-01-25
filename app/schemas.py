from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    phone_number: Optional[str] = None
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class User(UserBase):
    id: int
    is_active: bool
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True

class FloodReportBase(BaseModel):
    location: str
    latitude: float
    longitude: float
    severity: str
    water_level: str
    description: Optional[str] = None

class FloodReportCreate(FloodReportBase):
    pass

class FloodReport(FloodReportBase):
    id: int
    user_id: int
    image_name: Optional[str] = None
    image_mime: Optional[str] = None
    reported_at: datetime
    is_verified: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
