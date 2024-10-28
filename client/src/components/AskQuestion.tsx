import React, { useState } from "react";
import { askQuestion } from "../api/questionService";

interface AskQuestionProps {
  documentId: number;
  addQuestion: (question: string) => void;
  updateAnswer: (index: number, answer: string) => void;
  chatHistory: { question: string; answer: string | null }[];
}

const AskQuestion: React.FC<AskQuestionProps> = ({
  documentId,
  addQuestion,
  updateAnswer,
  chatHistory,
}) => {
  const [question, setQuestion] = useState("");

  const isWaitingForResponse =
    chatHistory.length > 0 &&
    chatHistory[chatHistory.length - 1].answer === null;

  const handleAsk = async () => {
    const currentIndex = chatHistory.length;
    addQuestion(question);
    setQuestion("");
    try {
      const { answer } = await askQuestion(question, documentId);
      updateAnswer(currentIndex, answer);
    } catch (error) {
      updateAnswer(currentIndex, "Failed to get an answer.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isWaitingForResponse) {
      e.preventDefault();
      handleAsk();
    }
  };
  return (
    <div className="absolute bottom-0 w-full h-[10vh] flex justify-center items-start bg-white z-10">
      <div
        className={`flex justify-between items-center w-[90vw] border border-[#E4E8EE] shadow-custom-light mx-10 rounded-lg px-6 py-3 ${
          documentId && !isWaitingForResponse
            ? "bg-white"
            : "bg-[#E4E8EE] opacity-35 border border-zinc-400"
        }`}
      >
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyUp={handleKeyPress}
          placeholder="Send a Message..."
          className="bg-transparent flex-grow text-sm focus:outline-none"
          disabled={!documentId || isWaitingForResponse}
        />
        <button
          onClick={handleAsk}
          className="px-2"
          disabled={!documentId || isWaitingForResponse}
        >
          <img src="/icons/iconoir_send.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default AskQuestion;
