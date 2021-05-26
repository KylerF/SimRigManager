import json
import os

from backend.database.database import get_db
from backend.database.models import Quote
from backend.database import crud

def init_quotes():
    '''
    Initialize the quotes table with JSON data
    '''
    db = next(get_db())
    quote_count = db.query(Quote).count()

    if quote_count == 0:
        path = os.path.dirname(os.path.realpath(__file__))
        data = json.load(open(os.path.join(path, 'quotes.json')))

        crud.batch_create_quote(db, data)
