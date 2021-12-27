from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from os import path, remove, getcwd
import shutil

from sqlalchemy.sql.expression import update

from api.exceptions import SecurityException
from api.utils import update_driver_cache
from database.database import get_db
from database import crud, schemas

"""
Router for paths related to managing driver avatar images
"""
router = APIRouter(
    prefix="/avatars",
    tags=["avatars"]
)

@router.get("/{driver_id}")
async def get_avatar(driver_id: int):
    """
    Get a driver's profile picture
    """
    try:
        avatar_path = __get_avatar_path(driver_id)
    except SecurityException:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid request for driver with id {driver_id}"
        )

    if not path.exists(avatar_path):
        raise HTTPException(
            status_code=404, 
            detail=f"No avatar found for driver with id {driver_id}"
        )

    return FileResponse(avatar_path)

@router.post("/{driver_id}")
async def upload_avatar(driver_id: int, profile_pic: UploadFile=File(...)):
    """
    Upload a new driver profile picture
    """
    try:
        file_location = __get_avatar_path(driver_id)
    except SecurityException:
        raise HTTPException(
            status_code=400, 
            detail=f"Invalid request for driver with id {driver_id}"
        )

    # Update driver profile with link to new avatar image
    data = {
        "id": driver_id, 
        "profilePic": f"/avatars/{driver_id}"
    }
    driver = schemas.DriverUpdate(**data)

    db = next(get_db())
    updated_driver = crud.update_driver(db, driver)

    if not updated_driver:
        raise HTTPException(
            status_code=404, 
            detail=f"No driver found with id {driver_id}"
        )

    # Update active driver cache
    update_driver_cache(updated_driver)

    # Save the image file
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(profile_pic.file, file_object)

    return {"success": "image upload completed"}

@router.delete("/{driver_id}")
async def delete_avatar(driver_id: int):
    """
    Delete a driver's profile picture
    """
    try:
        file_location = __get_avatar_path(driver_id)
    except SecurityException:
        raise HTTPException(
            status_code=404, 
            detail=f"No avatar found for driver with id {driver_id}"
        )

    # Update driver profile to clear image URL
    data = {
        "id": driver_id, 
        "profilePic": ""
    }
    driver = schemas.DriverUpdate(**data)

    db = next(get_db())
    updated_driver = crud.update_driver(db, driver)

    if not updated_driver:
        raise HTTPException(
            status_code=404, 
            detail=f"No driver found with id {driver_id}"
        )

    # Update active driver cache
    update_driver_cache(updated_driver)

    # Delete the image file
    remove(file_location)

    return {"success": "image removed"}

def __get_avatar_path(driver_id):
    """
    Retrieve the file path to a driver's avatar image
    """
    current_path = path.abspath(getcwd())
    filename = f"{driver_id}-avatar.png"
    safe_avatar_path = path.normpath(path.join(current_path, filename))

    if not safe_avatar_path.startswith(current_path):
        raise SecurityException()

    return path.join(
        current_path, 
        "userdata", "images", 
        f"{driver_id}-avatar.png"
    )
