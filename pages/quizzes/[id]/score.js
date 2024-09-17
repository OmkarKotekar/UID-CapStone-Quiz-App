// pages/quizzes/[id]/score.js
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import fs from 'fs';
import path from 'path';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function QuizScore({ quiz }) {
  const router = useRouter();
  const { id } = router.query;
  const [score, setScore] = useState(null);
  const [total, setTotal] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);

  useEffect(() => {
    if (router.query.score && router.query.total) {
      const score = parseInt(router.query.score, 10);
      const total = parseInt(router.query.total, 10);
      setScore(score);
      setTotal(total);
      setCorrectAnswers(score);
      setIncorrectAnswers(total - score);
    }

    // Retrieve answers from localStorage
    const savedAnswers = JSON.parse(localStorage.getItem(`quiz-${id}-answers`)) || [];
    setAnswers(savedAnswers);
  }, [router.query, id]);

  if (score === null || total === null) {
    return <div className="min-h-screen bg-gray-100 py-8 text-center">Score not available</div>;
  }

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ['#4ade80', '#f87171'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-8">Quiz Complete</h1>
        <p className="text-2xl mb-4">Your Score: {score} / {total}</p>

        {/* Pie Chart */}
        <div className="flex justify-center items-center mb-8">
          <div className="w-64 h-64">
            <Pie data={data} />
          </div>
        </div>

        {/* Displaying Questions and Answers */}
        <div className="text-left bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold mb-6">Review Your Answers</h2>

          {quiz.questions.map((questionData, index) => {
            const userAnswer = answers[index]?.selected || 'Not answered';
            const isCorrect = userAnswer === questionData.answer;

            return (
              <div key={index} className="mb-6">
                <p className="font-semibold text-lg">
                  {index + 1}. {questionData.question}
                </p>
                <ul className="pl-6 list-disc">
                  {questionData.options.map((option, i) => (
                    <li
                      key={i}
                      className={`
                        ${option === questionData.answer ? 'text-green-600' : ''}
                        ${option === userAnswer ? 'font-semibold' : ''}
                      `}
                    >
                      {option} {option === userAnswer && '(Your answer)'}
                      {option === questionData.answer && ' (Correct answer)'}
                    </li>
                  ))}
                </ul>
                <p className={`mt-2 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                  {isCorrect ? 'Correct' : `Incorrect, Correct answer: ${questionData.answer}`}
                </p>
              </div>
            );
          })}
        </div>

        {/* Back to Quizzes button */}
        <Link href={`/quizzes`}>
          <div className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300">
            Back to Quizzes
          </div>
        </Link>
      </div>
    </div>
  );
}

// Fetch quiz data from JSON file
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);
  const quiz = quizzes[params.id];

  return {
    props: {
      quiz
    }
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);

  const paths = Object.keys(quizzes).map((quizId) => ({
    params: { id: quizId }
  }));

  return {
    paths,
    fallback: false
  };
}
