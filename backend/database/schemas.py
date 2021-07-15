'''
Pydantic wrappers to transform and validate data models
for the API

Schemas are provided for CRUD operations on all models
'''

from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class Availability(BaseModel):
    active: bool


class DriverBase(BaseModel):
    name: str
    nickname: str
    profilePic: str


class DriverCreate(DriverBase):
    pass


class DriverUpdate(DriverBase):
    id: int
    name: Optional[str] = None
    nickname: Optional[str] = None
    profilePic: Optional[str] = None
    trackTime: Optional[int] = None


class DriverDelete(DriverUpdate):
    pass


class Driver(DriverBase):
    id: int
    trackTime: int

    class Config:
        orm_mode = True

class ActiveDriverBase(BaseModel):
    driverId: int


class ActiveDriverCreate(ActiveDriverBase):
    pass


class ActiveDriver(ActiveDriverBase):
    id: int
    driver: Driver

    class Config:
        orm_mode = True


class LapTimeBase(BaseModel):
    car: str
    trackName: str
    trackConfig: str
    time: float


class LapTimeCreate(LapTimeBase):
    driverId: int


class LapTime(LapTimeBase):
    id: int
    driver: Driver
    setAt: datetime

    class Config:
        orm_mode = True


class LightControllerBase(BaseModel):
    name: str
    ipAddress: str
    universe: int


class LightControllerCreate(LightControllerBase):
    name: str
    ipAddress: str
    universe: int


class LightControllerUpdate(LightControllerBase):
    id: int
    name: Optional[str] = None
    ipAddress: Optional[str] = None
    universe: Optional[int] = None


class LightControllerDelete(LightControllerUpdate):
    pass


class LightController(LightControllerBase):
    id: int

    class Config:
        orm_mode = True


class LightControllerSettingsBase(BaseModel):
    driverId: int
    controllerId: int
    colorThemeId: int
    autoPower: bool
    idleEffectId: int


class LightControllerSettingsGet(BaseModel):
    driverId: int
    controllerId: int


class LightControllerSettingsCreate(LightControllerSettingsBase):
    driverId: int
    controllerId: int
    colorThemeId: int
    autoPower: bool
    idleEffectId: int


class LightControllerSettingsUpdate(LightControllerSettingsBase):
    id: int
    driverId: int
    controllerId: int
    colorThemeId: Optional[int] = None
    autoPower: Optional[bool] = None
    idleEffectId: Optional[int] = None


class LightControllerSettingsDelete(LightControllerSettingsUpdate):
    id: int
    driverId: Optional[int] = None
    controllerId: Optional[int] = None
    colorThemeId: Optional[int] = None
    autoPower: Optional[bool] = None
    idleEffectId: Optional[int] = None


class LightControllerSettings(LightControllerSettingsBase):
    id: int

    class Config:
        orm_mode = True


class QuoteBase(BaseModel):
    text: str
    by: str


class QuoteCreate(QuoteBase):
    text: str
    by: str


class QuoteUpdate(QuoteBase):
    id: int
    text: Optional[str] = None
    by: Optional[str] = None


class QuoteDelete(QuoteUpdate):
    pass


class Quote(QuoteBase):
    id: int

    class Config:
        orm_mode = True
