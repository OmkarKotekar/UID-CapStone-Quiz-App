import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function QuizDetails({ quiz }) {
  const router = useRouter();
  const { id } = router.query;

  if (!quiz) {
    return <div className="min-h-screen bg-gray-100 py-8 text-center">Quiz not found</div>;
  }

  const handleStartQuiz = () => {
    const quizStartTime = Date.now();
    localStorage.setItem(`quiz-${id}-startTime`, quizStartTime);
    router.push(`/quizzes/${id}/0?time=${quiz.duration}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">{quiz.title}</h1>
        <p className="text-center mb-8">{quiz.description}</p>
        <p className="text-center mb-4">Time limit: {Math.floor(quiz.duration / 60)} minutes</p>
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

// This function runs at build time to generate quiz pages
export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);
  const quiz = quizzes[params.id] || null;

  return {
    props: {
      quiz
    }
  };
}

// This function defines which quiz pages to generate
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
