import React, { useState } from "react";
import { uploadPDF } from "../api/uploadService";

interface UploadProps {
  setDocumentId: (id: number) => void; // Specify the type for setDocumentId
  setChatHistory: React.Dispatch<
    React.SetStateAction<{ question: string; answer: string | null }[]>
  >;
}

const Upload: React.FC<UploadProps> = ({ setDocumentId, setChatHistory }) => {
  const [file, setFile] = useState<File | null>(null);

  //Handle Upload of a File
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || !files[0]) return;
    const selectedFile = files[0];
    setFile(selectedFile);

    try {
      const { document_id } = await uploadPDF(selectedFile);
      setDocumentId(document_id);
      setChatHistory([]); //clear ChatHistory
      alert("PDF uploaded successfully!");
    } catch (error) {
      alert(`Failed to upload PDF: ${error}`);
    }
  };
  const truncateFileName = (name: string) =>
    name.length > 10 ? `${name.slice(0, 10)}...` : name;

  return (
    <div className="w-full flex justify-between items-center py-4 px-8 shadow-md">
      <div>
        <img src="/AIPlanetLogo.svg" alt="" />
      </div>
      <div className="flex justify-center items-center">
        {file && (
          <div className="flex justify-center items-center">
            <div className="border border-[#0FA958]/40 py-2 px-2 mr-2 rounded-md">
              <img src="/icons/file_icon.svg" alt="" />
            </div>
            <p className="mr-4 text-sm text-[#0FA958] font-medium">
              {truncateFileName(file.name)}
            </p>
          </div>
        )}
        <label
          className="flex border border-black cursor-pointer font-medium py-2 px-2 md:py-2 md:px-10 rounded-lg"
          htmlFor="upload"
        >
          <img src="/icons/gala_add.svg" alt="" className="md:mr-2" />
          <span className="hidden md:inline">Upload PDF</span>
        </label>
        <input
          id="upload"
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Upload;
