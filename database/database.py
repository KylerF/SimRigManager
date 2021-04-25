from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

url = "sqlite:///./simrig.db"

engine = create_engine(
    url, connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False, 
    expire_on_commit=False,
    autoflush=False, 
    bind=engine
)

Base = declarative_base()

def get_db():
    '''
    Dependency - get a database connection
    '''
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def generate_database():
    if not database_exists(engine.url):
        create_database(engine.url)
