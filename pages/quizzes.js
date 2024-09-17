import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export default function Quizzes({ quizzes }) {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Quizzes</h1>
        <div className="space-y-8">
          {Object.keys(quizzes).map((quizId) => (
            <div key={quizId} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">{quizzes[quizId].title}</h2>
              <p className="mb-4">{quizzes[quizId].description}</p>
              <Link href={`/quizzes/${quizId}`}>
                <div className="bg-blue-600 text-white px-4 py-2 w-[105px] rounded-lg hover:bg-blue-500 transition-colors duration-300 cursor-pointer">
                  Start Quiz
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Fetch quiz data at build time
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'quizzes.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const quizzes = JSON.parse(jsonData);

  return {
    props: {
      quizzes
    }
  };
}
