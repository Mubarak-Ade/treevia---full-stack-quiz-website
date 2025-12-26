import mongoose, { Schema, Document, Model, Types, InferSchemaType, model } from 'mongoose';

const QuizResultSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  quiz: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz',
    index: true
  },
  score: {
    type: Number,
  },
  correctAnswers: {
    type: [Number],
    min: 0,
    max: 3
  },

}, { timestamps: true });

type Result = InferSchemaType<typeof QuizResultSchema>

const Result = model<Result>('Result', QuizResultSchema);

export default Result;
