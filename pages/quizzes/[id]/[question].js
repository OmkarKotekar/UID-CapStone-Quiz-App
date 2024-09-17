import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function QuizQuestion({ quiz, questionIndex, initialTime }) {
  const router = useRouter();
  const { id, question, time } = router.query;
  const [timeRemaining, setTimeRemaining] = useState(time || initialTime);
  const [answers, setAnswers] = useState([]);
  const [viewedQuestions, setViewedQuestions] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    if (timeRemaining <= 0) {
      clearInterval(interval);
      handleSubmitQuiz();
    }

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`quiz-${id}-answers`)) || [];
    const savedViewedQuestions = JSON.parse(localStorage.getItem(`quiz-${id}-viewedQuestions`)) || [];
    setAnswers(savedAnswers);
    setViewedQuestions(savedViewedQuestions);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`quiz-${id}-answers`, JSON.stringify(answers));
    localStorage.setItem(`quiz-${id}-viewedQuestions`, JSON.stringify(viewedQuestions));
  }, [answers, viewedQuestions, id]);

  useEffect(() => {
    if (!viewedQuestions.includes(parseInt(question))) {
      setViewedQuestions([...viewedQuestions, parseInt(question)]);
    }
  }, [question, viewedQuestions]);

  const currentQuestion = quiz.questions[questionIndex];
  const nextQuestion = questionIndex + 1;
  const hasNextQuestion = quiz.questions[nextQuestion];

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = { question: currentQuestion.question, selected: option, correct: currentQuestion.answer };
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitted(true);
    const score = answers.reduce((total, answer) => total + (answer.selected === answer.correct ? 1 : 0), 0);
  
    try {
      // Get the JWT token from localStorage
      const token = localStorage.getItem('token');
  
      // Submit the quiz score with the JWT token in headers
      const response = await fetch('/api/quizScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Use JWT token for user identity
        },
        body: JSON.stringify({
          quizName: quiz.title,
          score: score,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
  
      const data = await response.json();
      console.log('Score submitted:', data);
    } catch (error) {
      console.error('Error submitting score:', error);
    }
  
    router.push({
      pathname: `/quizzes/${id}/score`,
      query: { score, total: quiz.questions.length },
    });
  };
  
  

  const getNavigationButtonColor = (index) => {
    if (answers[index]) {
      return 'bg-green-300';
    } else if (viewedQuestions.includes(index)) {
      return 'bg-red-300';
    } else {
      return 'bg-gray-200 hover:bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">{quiz.title}</h1>
        <p className="text-center mb-4">Time Remaining: {Math.floor(timeRemaining / 60)}:{timeRemaining % 60}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
            <ul className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <li
                  key={index}
                  className={`p-4 rounded-lg shadow-lg cursor-pointer transition-colors duration-300 ${
                    answers[questionIndex] && answers[questionIndex].selected === option ? 'bg-blue-200' : 'bg-white hover:bg-gray-200'
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-between items-center">
              {hasNextQuestion && !isSubmitted && (
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300"
                  onClick={() => router.push(`/quizzes/${id}/${nextQuestion}?time=${timeRemaining}`)}
                >
                  Next Question
                </button>
              )}
              {!hasNextQuestion && !isSubmitted && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  onClick={handleSubmitQuiz}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Navigate Questions</h2>
            <div className="grid grid-cols-3 gap-2">
              {quiz.questions.map((_, index) => (
                <Link key={index} href={`/quizzes/${id}/${index}?time=${timeRemaining}`}>
                  <div
                    className={`p-4 rounded-lg cursor-pointer text-center transition-colors duration-300 ${getNavigationButtonColor(index)}`}
                  >
                    {index + 1}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fetch quiz data and pass it to the component
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);
  const quiz = quizzes[params.id];
  const questionIndex = parseInt(params.question, 10);

  return {
    props: {
      quiz,
      questionIndex,
      initialTime: quiz.duration
    }
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);

  let paths = [];
  Object.keys(quizzes).forEach((quizId) => {
    const quiz = quizzes[quizId];
    quiz.questions.forEach((_, index) => {
      paths.push({ params: { id: quizId, question: index.toString() } });
    });
  });

  return {
    paths,
    fallback: false
  };
}
