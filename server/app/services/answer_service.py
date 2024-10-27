from llama_index.core import Document, VectorStoreIndex
from llama_index.core import Settings
from llama_index.llms.gemini import Gemini
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_parse import LlamaParse
from llama_index.core import SimpleDirectoryReader

# from llama_index.llms.openai import OpenAI
from dotenv import load_dotenv
import os, shutil
import tempfile
import nest_asyncio
from ..config import GEMINI_API_KEY

nest_asyncio.apply()

load_dotenv()


async def generate_answer(temp_pdf_path, question):
    """Generate an answer by querying embedded PDF pages."""
    print(temp_pdf_path)
    print(question)
    try:
        temp_dir = tempfile.mkdtemp()

        llamaparse_api_key = os.getenv("LLAMA_CLOUD_API_KEY")
        api_key = GEMINI_API_KEY

        llm = Gemini(model="models/gemini-1.5-flash", api_key=api_key)
        embed_model = GeminiEmbedding(
            model_name="models/embedding-001", api_key=api_key
        )

        Settings.llm = llm
        Settings.embed_model = embed_model

        parser = LlamaParse(api_key=llamaparse_api_key, result_type="markdown")

        # file_extractor = {".pdf",parser}

        # documents = SimpleDirectoryReader(input_files=[temp_pdf_path],file_extractor=file_extractor).load_data()
        documents = parser.load_data(temp_pdf_path)

        if not isinstance(documents, list) or not documents:
            return "No documents parsed from PDF."

        print("Parsed Data:", documents)
        # Initialize the Gemini model and embeddings

        # Create a VectorStoreIndex, which will automatically embed the documents
        index = VectorStoreIndex.from_documents(documents)

        query_engine = index.as_query_engine()

        # Query the index with the question
        response = query_engine.query(question)
        return str(response)

    except Exception as e:
        return f"Error generating answer: {str(e)}"
    finally:
        if temp_dir and os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
