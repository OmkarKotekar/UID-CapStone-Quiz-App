import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-lg font-semibold">Loading...</p></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <a href="/login" className="mt-4 text-blue-500 hover:underline">Go to Login</a>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <p className="text-lg font-semibold">No profile data found. Please log in.</p>
        <a href="/login" className="mt-4 text-blue-500 hover:underline">Go to Login</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 lg:p-12">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">User Profile</h1>
          <div className="border-b border-gray-300 pb-4 mb-4">
            <p className="text-lg font-medium"><strong>Username:</strong> {profile.username}</p>
            <p className="text-lg font-medium"><strong>Email:</strong> {profile.email}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Quiz Scores</h2>
            <ul className="list-disc list-inside pl-4">
              {profile.quizScores.length ? (
                profile.quizScores.map((quiz, index) => (
                  <li key={index} className="mb-2">
                    <strong className="font-medium">{quiz.quizName}</strong>: {quiz.score}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No quiz scores available.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
