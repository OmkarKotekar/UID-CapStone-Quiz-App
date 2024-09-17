// pages/api/quizzes/[id].js
import connectToDatabase from '../../../lib/mongoose';
import Quiz from '../../../models/Quiz';
import Question from '../../../models/Question';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const quiz = await Quiz.findById(id).populate('user', 'username');
        const questions = await Question.find({ quiz: id });
        if (!quiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json({ quiz, questions });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'PUT':
      try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedQuiz) {
          return res.status(404).json({ error: 'Quiz not found' });
        }
        res.status(200).json(updatedQuiz);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        await Quiz.findByIdAndDelete(id);
        await Question.deleteMany({ quiz: id });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
