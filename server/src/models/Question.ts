import { InferSchemaType, model, Schema } from 'mongoose';

const questionSchema = new Schema(
  {
    quizId: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
      index: true,
    },
    questionText: {
      type: String,
      required: [true, 'Question is required'],
    },
    options: {
      type: [String],
      required: [true, 'Options are required'],
      validate: [(arr: string[]) => arr.length === 4, 'Must provide exactly 4 options'],
      min: 0,
      max: 3,
    },
    correctAnswer: {
      type: Number,
      required: [true, 'Correct Answer is required'],
    },
  },
  { timestamps: true }
);

type Question = InferSchemaType<typeof questionSchema>

const Question = model<Question>('Question', questionSchema);

export default Question;
