import apiClient from "./apiClient";

//Connecting to the Upload Endpoint, to upload a file
export const askQuestion = async (question: string, documentId: number) => {
  try {
    const response = await apiClient.post("/ask", {
      question,
      document_id: documentId,
    });
    return response.data;
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
};
