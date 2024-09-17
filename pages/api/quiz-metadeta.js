// pages/api/quiz-metadata.js
import connectToDatabase from '../../lib/mongoose';
import QuizMetadata from '../../models/QuizMetadata';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'POST':
      try {
        const { title, description, numberOfQuestions } = req.body;
        const quizMetadata = new QuizMetadata({ title, description, numberOfQuestions });
        await quizMetadata.save();
        res.status(201).json(quizMetadata);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case 'GET':
      try {
        const quizzes = await QuizMetadata.find();
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
