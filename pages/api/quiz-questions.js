// pages/api/quiz-questions.js
import connectToDatabase from '../../lib/mongoose';
import QuizQuestion from '../../models/QuizQuestion';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      try {
        const { quizTitle, question, options, correctAnswer } = req.body;
        const quizQuestion = new QuizQuestion({ quizTitle, question, options, correctAnswer });
        await quizQuestion.save();
        res.status(201).json(quizQuestion);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'GET':
      try {
        const { quizTitle } = req.query;
        const questions = await QuizQuestion.find({ quizTitle });
        res.status(200).json(questions);
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
