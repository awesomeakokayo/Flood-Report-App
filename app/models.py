from datetime import datetime
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime,
    ForeignKey,
    Boolean,
    Boolean,
    Index,
    Float
)
from sqlalchemy.orm import relationship

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(200), nullable=True)
    email = Column(String(200), unique=True, index=True, nullable=False)
    phone_number = Column(String(20), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    # Relationships
    reports = relationship(
        "FloodReport",
        back_populates="user",
        cascade="all, delete-orphan"
    )

class FloodReport(Base):
    __tablename__ = "flood_reports"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False
    )
    location = Column(String(500), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    severity = Column(String(50), nullable=False)
    # Example values: "low", "moderate", "severe", "critical"
    water_level = Column(String(100), nullable=False)
    # Example: "ankle", "knee", "waist", "above waist"
    description = Column(Text, nullable=True)
    image_name = Column(String(255), nullable=True)
    image_mime = Column(String(100), nullable=True)
    reported_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    is_verified = Column(Boolean, default=False)
    # Relationships
    user = relationship("User", back_populates="reports")
