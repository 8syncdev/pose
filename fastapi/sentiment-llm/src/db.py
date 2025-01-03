import os

from sqlmodel import create_engine, SQLModel, Session
from .configs import BASE_DIR
from dotenv import load_dotenv

load_dotenv(BASE_DIR / ".env", override=True)

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session