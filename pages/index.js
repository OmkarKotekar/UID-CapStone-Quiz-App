// pages/index.js
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <section className="bg-gray-800 text-white min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold mb-4">Welcome to Quiz App</h1>
          <p className="text-xl mb-8">Your go-to platform for interactive quizzes and learning.</p>
          <Link href="/quizzes">
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors duration-300">
              Get Started
            </div>
          </Link>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Interactive Quizzes</h3>
                <p>Engage with a variety of quizzes on different topics and test your knowledge.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Real-Time Feedback</h3>
                <p>Get instant feedback on your answers and improve your learning.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-100 p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-2xl font-bold mb-4">Leaderboards</h3>
                <p>Compete with others and see how you rank on our leaderboards.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-xl mb-8">Sign up now and start your journey with Quiz App.</p>
          <Link href="/register">
            <div className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300">
              Register
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
