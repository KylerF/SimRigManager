from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse, FileResponse
from os import path, remove, getcwd, makedirs
from typing import Optional
from io import BytesIO
from PIL import Image
import shutil

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
async def get_avatar(driver_id: int, width: Optional[int]=0, height: Optional[int]=0):
    """
    Get a driver's profile picture.
    If width is provided, a square image with the width is returned.
    If width and height are both provided, an image with those dimensions 
    is returned.
    If neither width nor height are provided, the original image is returned.
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

    return __create_image_response(avatar_path, width, height)

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
    Retrieve the file path to a driver's avatar image. If the file structure
    does not exist, it will be created.
    """
    current_path = path.abspath(getcwd())
    filename = f"{driver_id}-avatar.png"
    safe_avatar_path = path.normpath(path.join(current_path, filename))

    # Filter out unsafe paths
    if not safe_avatar_path.startswith(current_path):
        raise SecurityException("Unsafe file path requested")

    avatar_directory = path.join(
        current_path, 
        "userdata", "images"
    )

    # Create the file structure if it does not exist
    try:
        makedirs(avatar_directory)
    except FileExistsError:
        pass

    return path.join(
        avatar_directory,
        f"{driver_id}-avatar.png"
    )

def __create_image_response(image_path, width: Optional[int], height: Optional[int]):
    """
    Resize the given image and return either:
        - A FileResponse containing the original image file
        - A StreamingResponse containing the image resized to width x height
    """
    if width or height:
        return StreamingResponse(
            __resize_image_file(image_path, width, height),
            media_type="image/png"
        )

    return FileResponse(image_path)

def __resize_image_file(image_path, width: Optional[int], height: Optional[int]):
    """
    Returns one of:
        - An image resized to width x height
        - An image resized to width x width if only width provided
        - An image resized to height x height if only height provided
        - The original image if neight width nor height are provided
    """
    image = Image.open(image_path)
    format = image.format

    if width:
        width = min(width, 1280)
        if height:
            height = min(height, 720)
            image.thumbnail((width, height), Image.ANTIALIAS)
        else:
            image.thumbnail((width, width), Image.ANTIALIAS)

        # Convert to bytes using original file format
        return __image_to_bytes(image, format)

    if height:
        height = min(height, 720)
        image.thumbnail((height, height), Image.ANTIALIAS)

    return __image_to_bytes(image, format)

def __image_to_bytes(image, format="PNG"):
    """
    Returns the bytes of an image
    """
    image_bytes = BytesIO()
    image.save(image_bytes, format)
    image_bytes.seek(0)

    return image_bytes
