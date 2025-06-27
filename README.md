# PDF Processing Application

## Overview

This repository contains the backend and fronted for the application, built using FastAPI adn React. The server is responsible for handling API requests, processing uploaded PDFs and generating response to the questions based on that PDF while the frontend is responsible for for user to upload PDF file and ask question related to PDF.

# Server (FastAPI)

## Features

- PDF upload and processing
- NLP capabilities for question answering
- Integration with external services (e.g., GEMINI AI)

## Getting Started

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd server

   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. **Install dependencies:**
   pip install -r requirements.txt

4. **Set environment variables:**
   Create a .env file in the root directory and set the required environment variables. (server/.env)

   DATABASE_URL="postgresql://username:password@hostname:port/databasename"

   AWS_ACCESS_KEY_ID

   AWS_SECRET_ACCESS_KEY

   AWS_S3_BUCKET_NAME

   GEMINI_API_KEY

   LLAMA_CLOUD_API_KEY

   - To get Gemini api key -> [https://aistudio.google.com/apikey]
   - To get LLama aou key api key -> [https://cloud.llamaindex.ai/landing]
   - AWS S3 Doc -> [https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html]

5. **Run the server:**
   ```bash
       uvicorn main:app --reload
   ```

# Client (React)

## Getting Started

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Installation

```bash
    cd client
    npm install or yarn install
    npm run dev
```
