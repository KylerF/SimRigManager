"""
Database setup via SQLAlchemy and convenience functions to connect and
interact with it
"""
from sqlalchemy_utils import database_exists, create_database
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine

url = "sqlite:///./simrig.db"

engine = create_engine(
    url,
    connect_args={
        "check_same_thread": False
    },
    pool_size=10,
    max_overflow=20
)

SessionLocal = sessionmaker(
    autocommit=False,
    expire_on_commit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    """
    Dependency - get a database connection
    """
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def generate_database():
    """
    Create the SQLite database if it does not yet exist
    """
    if not database_exists(engine.url):
        # Create the database from scratch
        create_database(engine.url)
        return True

    return False
