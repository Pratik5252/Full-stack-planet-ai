import os
import boto3
from dotenv import load_dotenv

load_dotenv()

# AWS Configuration
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

S3_BUCKET_NAME = os.getenv("AWS_S3_BUCKET_NAME")

# Databae Configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# Gemini api key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
