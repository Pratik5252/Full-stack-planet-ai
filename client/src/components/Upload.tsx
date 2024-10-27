import React, { useState } from "react";
import { uploadPDF } from "../api/uploadService";

interface UploadProps {
  setDocumentId: (id: number) => void; // Specify the type for setDocumentId
}

const Upload: React.FC<UploadProps> = ({ setDocumentId }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file");

    try {
      const { document_id } = await uploadPDF(file);
      setDocumentId(document_id);
      alert("PDF uploaded successfully!");
    } catch (error) {
      alert("Failed to upload PDF");
    }
  };
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
    </div>
  );
};

export default Upload;
