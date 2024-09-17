// models/QuizQuestion.js
import mongoose from 'mongoose';

const QuizQuestionSchema = new mongoose.Schema({
  quizTitle: { type: String, required: true },
  question: { type: String, required: true },
  options: {
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true }
  },
  correctAnswer: { type: String, required: true }
});

export default mongoose.models.QuizQuestion || mongoose.model('QuizQuestion', QuizQuestionSchema);
