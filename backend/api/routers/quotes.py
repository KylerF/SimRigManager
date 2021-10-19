from fastapi import APIRouter
from typing import List

from database.database import get_db
from database import crud, schemas

"""
Router for paths related to inspirational driving quotes, providing CRUD 
functionality for quotes and an endpoint to get a random quote
"""
router = APIRouter(
    prefix="/quotes",
    tags=["quotes"]
)

@router.get("", response_model=List[schemas.Quote])
async def get_quotes(skip: int = 0, limit: int = -1):
    """
    Get all racing quotes
    """
    db = next(get_db())
    quotes = crud.get_quotes(db, skip=skip, limit=limit)

    return quotes

@router.get("/random", response_model=schemas.Quote)
async def get_random_quote():
    """
    Get a random racing quote
    """
    db = next(get_db())
    quote = crud.get_random_quote(db)

    return quote

@router.post("", response_model=schemas.Quote)
async def create_quote(quote: schemas.QuoteCreate):
    """
    Create a new quote
    """
    db = next(get_db())
    new_quote = crud.create_quote(db, quote)

    return new_quote

@router.put("", response_model=schemas.Quote)
async def update_quote(quote: schemas.Quote):
    """
    Update a quote
    """
    db = next(get_db())
    updated_quote = crud.update_quote(db, quote)

    return updated_quote

@router.patch("", response_model=schemas.Quote)
async def partial_update_quote(quote: schemas.QuoteUpdate):
    """
    Update a quote (partial update)
    """
    db = next(get_db())
    updated_quote = crud.update_quote(db, quote)

    return updated_quote

@router.delete("", response_model=schemas.Quote)
async def delete_quote(quote: schemas.QuoteDelete):
    """
    Delete a quote
    """
    db = next(get_db())
    result = crud.delete_quote(db, quote)

    return result
