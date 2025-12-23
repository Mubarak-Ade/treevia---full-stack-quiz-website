import { Response, Request } from 'express';
import Question from '../models/Question.js';
import Quiz from '../models/Quiz.js';
import { validateQuestion } from '../utils/validator.js';

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
  const { questionText, options, correctAnswer } = req.body;
  const { quizId } = req.params;

  try {
    validateQuestion(questionText, options, correctAnswer);
    const question = new Question({ quizId, questionText, options, correctAnswer });
    await question.save();
    res.status(200).json({ message: 'Question created successfully', question });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  const { questionId } = req.params;

  try {
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
      return;
    }
    res.status(200).json({ message: 'Question deleted successfully', question });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
