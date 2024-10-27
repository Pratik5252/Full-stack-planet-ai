from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from ..services.pdf_processing import upload_pdf_to_s3, download_text_from_s3
from ..services.answer_service import generate_answer
from ..db.database import database
from ..models.document import documents


router = APIRouter()


class QuestionRequest(BaseModel):
    question: str
    document_id: int


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")
    filename = file.filename
    result = await upload_pdf_to_s3(file, filename)

    return {
        "filename": filename,
        "s3_pdf_url": result["s3_pdf_url"],
        "document_id": result["document_id"],
    }


@router.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        query = documents.select().where(documents.c.id == request.document_id)
        document = await database.fetch_one(query)

        if not document:
            raise HTTPException(status_code=404, detail="Document not found")

        temp_pdf_url = await download_text_from_s3(document.s3_pdf_url)
        # print(temp_pdf_url)
        answer = await generate_answer(temp_pdf_url, request.question)
        print(answer)
        return {"answer": answer}

    except Exception as e:
        print(f"Error in ask_question: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
