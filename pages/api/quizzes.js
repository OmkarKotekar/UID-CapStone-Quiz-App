// pages/api/quizzes.js
import connectToDatabase from '../../lib/mongoose';
import Quiz from '../../models/Quiz';
import Question from '../../models/Question';
import User from '../../models/User';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      try {
        const { userId, title, description, questions } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        const quiz = new Quiz({ title, description, user: userId });
        await quiz.save();
        for (const question of questions) {
          const newQuestion = new Question({ ...question, quiz: quiz._id });
          await newQuestion.save();
        }
        res.status(201).json(quiz);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'GET':
      try {
        const quizzes = await Quiz.find().populate('user', 'username');
        res.status(200).json(quizzes);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
