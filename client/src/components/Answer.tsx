import React from "react";

interface ChatMessage {
  question: string;
  answer: string;
}

interface AnswerProps {
  chatHistory: ChatMessage[];
}

const loader = (
  <div className="dot-loader flex justify-center items-center">
    <div className="animate-pulse [animation-delay:-0.3s]"></div>
    <div className="animate-pulse [animation-delay:-0.15s]"></div>
    <div className="animate-pulse"></div>
  </div>
);
const Answer: React.FC<AnswerProps> = ({ chatHistory }) => {
  return (
    <div className="fixed top-[72px] bottom-0 left-0 right-0 pr-2 mb-20">
      <div className="h-full overflow-y-auto mb-20 scrollbar-container">
        <div className="flex justify-center items-center mt-10">
          <div className="w-[90vw] px-4">
            {chatHistory.map((message, index) => (
              <div key={index} className="mb-12">
                <div className="flex flex-col gap-y-8">
                  {/* user question */}
                  <div className="flex items-center gap-x-4">
                    <img src="/icons/user_icon.svg" alt="" />
                    <p className="text-gray-600 font-semibold">
                      {message.question}
                    </p>
                  </div>

                  {/* Response */}
                  <div
                    className={`flex gap-x-4 ${
                      message.answer === null ? "items-center" : "items-start"
                    }`}
                  >
                    <img src="/icons/planet_ai_Icon.svg" alt="" />
                    <p className="text-gray-800">
                      {message.answer === null ? loader : message.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Answer;
