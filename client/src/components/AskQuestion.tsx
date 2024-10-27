import React, { useState } from "react";
import { askQuestion } from "../api/questionService";

interface AskQuestionProps {
  documentId: number;
  setAnswer: (answer: string) => void;
}

const AskQuestion: React.FC<AskQuestionProps> = ({ documentId, setAnswer }) => {
  const [question, setQuestion] = useState("");

  const handleAsk = async () => {
    try {
      const { answer } = await askQuestion(question, documentId);
      setAnswer(answer);
    } catch (error) {
      alert("Failed to get an answer");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your Question"
      />
      <button onClick={handleAsk}>Ask</button>
    </div>
  );
};

export default AskQuestion;
