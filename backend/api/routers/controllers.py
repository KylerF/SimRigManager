from fastapi import APIRouter
from fastapi.exceptions import HTTPException
from typing import List

from database.database import get_db
from database import crud, schemas

"""
Router to WLED light controller management endpoints
"""
router = APIRouter(
    prefix="/controllers",
    tags=["controllers"]
)

@router.get("", response_model=List[schemas.LightController])
async def get_controllers(skip: int = 0, limit: int = -1):
    """
    Get all WLED light controllers
    """
    db = next(get_db())
    controllers = crud.get_light_controllers(db, skip=skip, limit=limit)

    return controllers

@router.post("", response_model=schemas.LightController)
async def create_controller(controller: schemas.LightControllerCreate):
    """
    Create a new WLED light controller
    """
    db = next(get_db())

    # Check if controller already exists
    if crud.get_light_controller_by_name(db, controller.name):
        raise HTTPException(status_code=400, detail="Controller already exists")
    if crud.get_light_controller_by_ip(db, controller.ipAddress):
        raise HTTPException(status_code=400, detail="IP address already in use")

    new_controller = crud.create_light_controller(db, controller)

    return new_controller

@router.patch("", response_model=schemas.LightController)
async def update_controller(controller: schemas.LightControllerUpdate):
    """
    Update controller information
    """
    db = next(get_db())
    updated_controller = crud.update_light_controller(db, controller)

    return updated_controller

@router.delete("", response_model=schemas.LightController)
async def delete_controller(controller: schemas.LightControllerDelete):
    """
    Delete a light controller
    """
    db = next(get_db())
    result = crud.delete_light_controller(db, controller)

    return result

@router.get("/settings", response_model=schemas.LightControllerSettings)
async def get_controller_settings(controllerId: int, driverId: int):
    """
    Get controller settings linked to a driver profile
    """
    db = next(get_db())
    controller_settings = crud.get_controller_settings(db, controllerId, driverId)

    return controller_settings

@router.post("/settings", response_model=schemas.LightControllerSettings)
async def create_controller_settings(controller_settings: schemas.LightControllerSettingsCreate):
    """
    Create a settings profile for a light controller
    """
    db = next(get_db())
    new_controller_settings = crud.create_controller_settings(
        db, 
        controller_settings
    )

    return new_controller_settings

@router.patch("/settings", response_model=schemas.LightControllerSettings)
async def update_controller_settings(db, controller_settings: schemas.LightControllerSettingsUpdate):
    """
    Update settings profile for a light controller
    """
    db = next(get_db())
    new_controller_settings = crud.update_controller_settings(
        db, 
        controller_settings
    )

    return new_controller_settings

@router.delete("/settings", response_model=schemas.LightControllerSettings)
async def delete_controller(settings: schemas.LightControllerSettingsDelete):
    """
    Delete settings for a light controller
    """
    db = next(get_db())
    result = crud.delete_light_controller(db, settings)

    return result
