import mongoose, { Schema, Document, Model, Types, InferSchemaType, model } from 'mongoose';

const QuizResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  quiz: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz',
  },
  score: {
    type: Number,
  },
  correctAnswers: {
    type: [Number],
  },
  percentage: {
    type: Number,
  }

}, { timestamps: true });

type Result = InferSchemaType<typeof QuizResultSchema>

const Result = model<Result>('Result', QuizResultSchema);

export default Result;
