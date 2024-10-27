import React from "react";

interface AnswerProps {
  answer: string;
}

const Answer: React.FC<AnswerProps> = ({ answer }) => {
  return <div>{answer ? `Answer: ${answer}` : "No answer available"}</div>;
};

export default Answer;
