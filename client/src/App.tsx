import React, { useState } from "react";
import Upload from "./components/Upload";
import AskQuestion from "./components/AskQuestion";
import Answer from "./components/Answer";

interface ChatMessage {
  question: string;
  answer: string | null;
}

const App: React.FC = () => {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  const addQuestion = (question: string) => {
    setChatHistory((prev) => [...prev, { question, answer: null }]);
  };

  const updateAnswer = (index: number, answer: string) => {
    setChatHistory((prev) =>
      prev.map((message, i) => (i === index ? { ...message, answer } : message))
    );
  };

  return (
    <div className="w-full h-full">
      {/* <h1 className="text-3xl">PDF Question Answering App</h1> */}
      <div>
        <Upload setDocumentId={setDocumentId} />
        <AskQuestion
          documentId={documentId}
          addQuestion={addQuestion}
          updateAnswer={updateAnswer}
          chatHistory={chatHistory}
        />
        {documentId && (
          <>
            <Answer chatHistory={chatHistory} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
