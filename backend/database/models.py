from sqlalchemy import Boolean, ForeignKey, Column, Integer, Float, DateTime, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime

from .database import Base


class Driver(Base):
    __tablename__ = "drivers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    nickname = Column(String, unique=True)
    trackTime = Column(Integer, default=0)
    profilePic = Column(String)

    laptimes = relationship(
        "LapTime", 
        back_populates="driver", 
        cascade="all, delete, delete-orphan", 
        lazy="subquery"
    )

    active = relationship(
        "ActiveDriver", 
        back_populates="driver", 
        cascade="all, delete, delete-orphan", 
        lazy="subquery" 
    )


class ActiveDriver(Base):
    __tablename__ = "activedriver"

    id = Column(Integer, primary_key=True, index=True)
    driverId = Column(Integer, ForeignKey("drivers.id"))

    driver = relationship(
        "Driver", 
        back_populates="active", 
        lazy="subquery"
    )


class LapTime(Base):
    __tablename__ = "laptimes"

    id = Column(Integer, primary_key=True, index=True)
    driverId = Column(Integer, ForeignKey("drivers.id"))
    car = Column(String)
    trackName = Column(String)
    trackConfig = Column(String)
    time = Column(Float)
    setAt = Column(DateTime(timezone=True), server_default=func.now())

    driver = relationship(
        "Driver", 
        back_populates="laptimes", 
        lazy="subquery"
    )


class LightController(Base):
    __tablename__ = "controllers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    ipAddress = Column(String, unique=True)
    universe = Column(Integer, default=1)
