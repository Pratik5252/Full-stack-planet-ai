import React, { useState } from "react";
import Upload from "./components/Upload";
import AskQuestion from "./components/AskQuestion";
import Answer from "./components/Answer";

const App: React.FC = () => {
  const [documentId, setDocumentId] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string>("");

  return (
    <div>
      <h1>PDF Question Answering App</h1>
      <Upload setDocumentId={setDocumentId} />
      {documentId && (
        <>
          <AskQuestion documentId={documentId} setAnswer={setAnswer} />
          <Answer answer={answer} />
        </>
      )}
    </div>
  );
};

export default App;
