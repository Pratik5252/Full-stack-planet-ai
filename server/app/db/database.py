from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import MetaData
from databases import Database
import os
from dotenv import load_dotenv
from ..config import DATABASE_URL

load_dotenv()

DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://")

database = Database(DATABASE_URL)
engine = create_async_engine(DATABASE_URL, echo=True)
metadata = MetaData()

Base = declarative_base(metadata=metadata)
async_session_factor = sessionmaker(
    bind = engine,
    expire_on_commit=False,
    class_=AsyncSession,
)

async def get_db_session():
    async with async_session_factor() as session:
        yield session