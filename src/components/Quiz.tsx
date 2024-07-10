import { useState, useEffect } from "react";
import { getQuestions } from "../util/api";
import { Question } from "../interfaces";

interface QuizProps {
  selectedCategory: string;
}

const Quiz: React.FC<QuizProps> = ({ selectedCategory }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const data = await getQuestions(selectedCategory);
      setQuestions(data.slice(0, 10));
    };

    fetchQuestions();
  }, [selectedCategory]);

  const handleAnswerSelection = (answerKey: string) => {
    setSelectedAnswer(answerKey);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer) {
      const isCorrect =
        questions[currentQuestionIndex].correct_answers[selectedAnswer] ===
        "true";
      if (isCorrect) {
        setScore(score + 1);
      }
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-50 w-full md:w-2/3 lg:w-1/2">
        {showScore ? (
          <div className="rounded-lg border-b-4 border-yellow-700 bg-yellow-300 p-6 px-12 py-10 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              Your score: {score} / 10
            </h2>
            <button
              onClick={handleTryAgain}
              className="ml-4 rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
            >
              Try Again
            </button>
          </div>
        ) : currentQuestion ? (
          <>
            <div className="rounded-lg border-b-4 border-yellow-700 bg-yellow-300 p-6 px-12 py-10 shadow-lg">
              <h2 className="mb-4 font-bold text-yellow-500">
                Question {currentQuestionIndex + 1} of 10
              </h2>
              <h3 className="mb-2 font-bold">{currentQuestion.question}</h3>
              {currentQuestion.answers &&
                Object.entries(currentQuestion.answers)
                  .filter(([_, answer]) => answer !== null)
                  .map(([key, answer], index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        id={key}
                        name="answer"
                        value={key}
                        checked={selectedAnswer === key}
                        onChange={() => handleAnswerSelection(key)}
                      />
                      <label htmlFor={key}>{answer}</label>
                    </div>
                  ))}
              <button
                onClick={handleNextQuestion}
                disabled={!selectedAnswer}
                className="ml-4 mt-4 rounded border-b-4 border-blue-700 bg-blue-500 px-4 py-2 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
