"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const quizData = [
  {
    question: "What is a common physical sign of drug abuse?",
    answers: [
      "Increased energy",
      "Bloodshot eyes",
      "Improved concentration",
      "Better sleep quality",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which of the following is a potential consequence of drug abuse?",
    answers: [
      "Improved social skills",
      "Legal issues",
      "Better academic performance",
      "Enhanced creativity",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is one of the most effective ways to prevent drug abuse among teenagers?",
    answers: [
      "Ignoring the issue",
      "Open communication about risks",
      "Allowing them to experiment",
      "Social isolation",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which substance is commonly associated with addiction and withdrawal symptoms?",
    answers: ["Caffeine", "Alcohol", "Sugar", "Nicotine"],
    correctAnswer: 3,
  },
  {
    question: "What is a common reason individuals may turn to drug use?",
    answers: [
      "To enhance their health",
      "To cope with stress or trauma",
      "To improve their relationships",
      "To achieve personal goals",
    ],
    correctAnswer: 1,
  },
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleShowResult = () => {
    if (selectedAnswer !== null) {
      const isCorrect =
        selectedAnswer === quizData[currentQuestion].correctAnswer;
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }
      setShowResult(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz finished
      toast({
        title: "Quiz Completed",
        description: `Your final score: ${
          score +
          (showResult &&
          selectedAnswer === quizData[currentQuestion].correctAnswer
            ? 1
            : 0)
        }/5`,
        variant: "default",
      });
    }
  };

  const question = quizData[currentQuestion];

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Question {currentQuestion + 1}: {question.question}
          </h2>
          <div className="space-y-4">
            {question.answers.map((answer, index) => (
              <Button
                key={index}
                className={`w-full justify-start text-left ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correctAnswer
                        ? "bg-green-100 dark:bg-green-900 border-green-500 border-2 dark:border-green-700"
                        : "bg-red-100 dark:bg-red-900 border-red-500 border-2 dark:border-red-700"
                      : "bg-primary/10"
                    : ""
                } ${
                  showResult && index === question.correctAnswer
                    ? "bg-green-100 dark:bg-green-900 border-green-500 border-2 dark:border-green-700"
                    : ""
                }`}
                variant="outline"
                onClick={() => handleAnswerClick(index)}
                disabled={showResult}
              >
                {answer}
              </Button>
            ))}
          </div>
          <div className="mt-6 flex justify-between">
            {!showResult && (
              <Button
                onClick={handleShowResult}
                disabled={selectedAnswer === null}
                className="mr-4"
              >
                Check Answer
              </Button>
            )}
            <Button onClick={handleNextQuestion} disabled={!showResult}>
              {currentQuestion < quizData.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </Button>
          </div>
          {showResult && (
            <div className="mt-4 text-center">
              <p
                className={
                  selectedAnswer === question.correctAnswer
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }
              >
                {selectedAnswer === question.correctAnswer
                  ? "Correct!"
                  : `Incorrect. The correct answer is: ${
                      question.answers[question.correctAnswer]
                    }`}
              </p>
            </div>
          )}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Score: {score}
            {currentQuestion < quizData.length - 1 ? "" : "/5"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
