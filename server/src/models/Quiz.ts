import mongoose, { InferSchemaType, model, Schema } from 'mongoose';

const quizSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, 'Quiz title is required'],
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium',
    },
    timeLimit: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  },
  { timestamps: true }
);

type Quiz = InferSchemaType<typeof quizSchema>

const Quiz = model<Quiz>('Quiz', quizSchema);

export default Quiz;
