"""
Database table schemas (SQLAlchemy models)
"""

from sqlalchemy import Column, ForeignKey, Integer, Float, DateTime, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.sql.sqltypes import Boolean

from database.database import Base


class Driver(Base):
    """
    A driver profile linked to track/lap times
    """
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

    lightControllerSettings = relationship(
        "LightControllerSettings",
        back_populates="driver",
        cascade="all, delete, delete-orphan",
        lazy="subquery"
    )


class ActiveDriver(Base):
    """
    The currently selected driver - saved as a single record in a
    seperate table to efficiently switch drivers. When a new driver
    is selected, the current ActiveDriver is replaced with the new one.
    """
    __tablename__ = "activedriver"

    id = Column(Integer, primary_key=True, index=True)
    driverId = Column(Integer, ForeignKey("drivers.id"))

    driver = relationship(
        "Driver",
        back_populates="active",
        lazy="subquery"
    )


class LapTime(Base):
    """
    A lap time entry. This is populated by the best_time feature from
    the iRacing data stream. When a better time with the same track,
    config and car is entered, it replaces the previous best.
    """
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
    """
    A WLED light controller fixture of a given type
    """
    __tablename__ = "controllers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    ipAddress = Column(String, unique=True)
    universe = Column(Integer, default=1)

    lightControllerSettings = relationship(
        "LightControllerSettings",
        back_populates="lightController",
        cascade="all, delete, delete-orphan",
        lazy="subquery"
    )


class LightControllerSettings(Base):
    """
    Light controller settings tied to a driver profile
    """
    __tablename__ = "controllersettings"

    id = Column(Integer, primary_key=True, index=True)
    driverId = Column(Integer, ForeignKey("drivers.id"))
    controllerId = Column(Integer, ForeignKey("controllers.id"))
    colorThemeId = Column(Integer, ForeignKey("colorthemes.id"))
    autoPower = Column(Boolean, default=False)
    idleEffectId = Column(Integer, default=1)

    driver = relationship(
        "Driver",
        back_populates="lightControllerSettings",
        lazy="subquery"
    )

    lightController = relationship(
        "LightController",
        back_populates="lightControllerSettings",
        lazy="subquery"
    )

    colorTheme = relationship(
        "ColorTheme",
        back_populates="lightControllerSettings",
        lazy="subquery"
    )


class ColorTheme(Base):
    """
    A color theme applied to all light controllers
    """
    __tablename__ = "colorthemes"

    id = Column(Integer, primary_key=True, index=True)
    gradientType = Column(String)
    primaryColorR = Column(Integer)
    primaryColorG = Column(Integer)
    primaryColorB = Column(Integer)
    secondaryColorR = Column(Integer)
    secondaryColorG = Column(Integer)
    secondaryColorB = Column(Integer)

    lightControllerSettings = relationship(
        "LightControllerSettings",
        back_populates="colorTheme",
        lazy="subquery"
    )


class Quote(Base):
    """
    A racing quote, randomly selected and placed on the scoreboard
    """
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    by = Column(String)
