from fastapi import HTTPException
from ..config import s3_client, S3_BUCKET_NAME
from ..db.database import database
from ..models.document import documents
import os
import tempfile
from pathlib import Path


# This function uploads the file to S3 Bucket
async def upload_pdf_to_s3(file, filename):
    """Uploading original PDF and extracted text to S3, then save metadata in Postgres"""
    file.file.seek(0)
    s3_client.upload_fileobj(file.file, S3_BUCKET_NAME, filename)
    s3_pdf_url = f"https://{S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/{filename}"

    query = documents.insert().values(
        filename=filename,
        s3_pdf_url=s3_pdf_url,
    )
    document_id = await database.execute(query)
    return {"document_id": document_id, "s3_pdf_url": s3_pdf_url}


# This function helps to download pdf file from S3 bucket
async def download_pdf_from_s3(s3_pdf_url):
    """Download the pdf file from S3 and return its contents."""
    try:
        temp_dir = tempfile.mkdtemp()
        pdf_key = s3_pdf_url.split("/")[-1]
        temp_pdf_path = Path(temp_dir) / pdf_key
        with open(temp_pdf_path, "wb") as f:
            s3_client.download_fileobj(Bucket=S3_BUCKET_NAME, Key=pdf_key, Fileobj=f)

        return str(temp_pdf_path)

    except Exception as e:
        if os.path.exists(temp_dir):
            os.rmdir(temp_dir)
        raise HTTPException(status_code=500, detail=f"Error downloading PDF: {str(e)}")
