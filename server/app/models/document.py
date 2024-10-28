from sqlalchemy import Table, Column, Integer, String, DateTime
from sqlalchemy.sql import func
from ..db.database import metadata

# Schema to store metadata of files
documents = Table(
    "documents",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("filename", String, nullable=False),
    Column("s3_pdf_url", String, nullable=False),
    Column("s3_text_url", String, nullable=False),
    Column("upload_date", DateTime, default=func.now(), nullable=False),
)
