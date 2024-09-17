// models/QuizMetadata.js
import mongoose from 'mongoose';

const QuizMetadataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  numberOfQuestions: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.models.QuizMetadata || mongoose.model('QuizMetadata', QuizMetadataSchema);
