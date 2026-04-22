import { Types } from "mongoose";
import { Quiz, IQuiz, IQuestion } from "../models/quiz.model";
import { AddQuestionDTO, UpdateQuestionDTO } from "../types/quiz.types";
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
  ConflictError,
} from "../errors/app.errors";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toObjectId(id: string, label = "id"): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw new ValidationError(`Invalid ${label}: "${id}"`);
  }
  return new Types.ObjectId(id);
}

async function fetchQuizAndAssertOrg(
  quizId: string,
  organizationId: string
): Promise<IQuiz> {
  const quiz = await Quiz.findOne({
    _id: toObjectId(quizId, "quizId"),
    organizationId: toObjectId(organizationId, "organizationId"),
  });

  if (!quiz) throw new NotFoundError("Quiz", quizId);
  return quiz;
}

function assertNotArchived(quiz: IQuiz): void {
  if (quiz.status === "archived") {
    throw new ConflictError("Questions on archived quizzes cannot be modified.");
  }
}

function findQuestionOrThrow(quiz: IQuiz, questionId: string): IQuestion & { id: string } {
  const question = quiz.questions.id(toObjectId(questionId, "questionId"));
  if (!question) throw new NotFoundError("Question", questionId);
  return question as IQuestion & { id: string };
}

// ─── Question service ─────────────────────────────────────────────────────────

export const QuestionService = {
  // ── ADD a question ───────────────────────────────────────────────────────────

  /**
   * Append a new question to the quiz's questions array.
   * Order is auto-assigned to the end if not provided.
   * Maps to "Add New Question" / "+ Add another branch of knowledge" in the UI.
   */
  async addQuestion(
    quizId: string,
    dto: AddQuestionDTO,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    // Validate answer options
    const correctCount = dto.options.filter((o) => o.isCorrect).length;
    if (dto.options.length < 2 || dto.options.length > 4) {
      throw new ValidationError("A question must have between 2 and 4 answer options.");
    }
    if (correctCount !== 1) {
      throw new ValidationError("A question must have exactly one correct answer.");
    }

    const order =
      dto.order !== undefined
        ? dto.order
        : quiz.questions.length; // append to end

    quiz.questions.push({
      ...dto,
      order,
    } as any);

    // Re-normalise order to close any gaps
    QuestionService._normaliseOrder(quiz);

    await quiz.save();
    return quiz;
  },

  // ── GET all questions ────────────────────────────────────────────────────────

  /**
   * Return questions for a quiz sorted by their order field.
   * Used by the Question Builder panel.
   */
  async getQuestions(
    quizId: string,
    organizationId: string
  ): Promise<IQuestion[]> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    return [...quiz.questions].sort((a, b) => a.order - b.order);
  },

  // ── GET single question ───────────────────────────────────────────────────────

  async getQuestionById(
    quizId: string,
    questionId: string,
    organizationId: string
  ): Promise<IQuestion> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    return findQuestionOrThrow(quiz, questionId);
  },

  // ── UPDATE a question ────────────────────────────────────────────────────────

  /**
   * Partially update a question's prompt, options, difficulty, or order.
   * When options are provided, the full options array is replaced (not merged)
   * to keep the answer set consistent.
   */
  async updateQuestion(
    quizId: string,
    questionId: string,
    dto: UpdateQuestionDTO,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    const question = findQuestionOrThrow(quiz, questionId);

    if (dto.prompt !== undefined) question.prompt = dto.prompt;
    if (dto.difficulty !== undefined) question.difficulty = dto.difficulty;

    if (dto.options !== undefined) {
      const correctCount = dto.options.filter((o) => o.isCorrect).length;
      if (dto.options.length < 2 || dto.options.length > 4) {
        throw new ValidationError("A question must have between 2 and 4 answer options.");
      }
      if (correctCount !== 1) {
        throw new ValidationError("A question must have exactly one correct answer.");
      }
      question.options = dto.options as any;
    }

    if (dto.order !== undefined) {
      question.order = dto.order;
      QuestionService._normaliseOrder(quiz);
    }

    await quiz.save();
    return quiz;
  },

  // ── REORDER questions ────────────────────────────────────────────────────────

  /**
   * Bulk-reorder questions by providing an ordered array of question ids.
   * Maps to drag-and-drop reorder in the Question Builder.
   *
   * @param orderedIds - all question ids in the desired order (must be exhaustive)
   */
  async reorderQuestions(
    quizId: string,
    orderedIds: string[],
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    if (orderedIds.length !== quiz.questions.length) {
      throw new ValidationError(
        `orderedIds must contain all ${quiz.questions.length} question id(s).`
      );
    }

    // Verify every id exists before mutating
    for (const id of orderedIds) {
      findQuestionOrThrow(quiz, id);
    }

    orderedIds.forEach((id, index) => {
      const question = quiz.questions.id(toObjectId(id, "questionId"))!;
      question.order = index;
    });

    await quiz.save();
    return quiz;
  },

  // ── REMOVE a question ────────────────────────────────────────────────────────

  /**
   * Remove a single question from the quiz.
   * Remaining questions are re-ordered to close the gap.
   * Maps to the trash icon on each question card in the UI.
   */
  async removeQuestion(
    quizId: string,
    questionId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    findQuestionOrThrow(quiz, questionId); // throws if not found

    quiz.questions.pull(toObjectId(questionId, "questionId"));

    QuestionService._normaliseOrder(quiz);

    await quiz.save();
    return quiz;
  },

  // ── DUPLICATE a question ─────────────────────────────────────────────────────

  /**
   * Clone a question and append it immediately after its source.
   * Maps to the copy/duplicate icon on each question card.
   */
  async duplicateQuestion(
    quizId: string,
    questionId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    const source = findQuestionOrThrow(quiz, questionId);

    const clone = {
      prompt: source.prompt,
      options: source.options.map((o) => ({ ...o })),
      difficulty: source.difficulty,
      order: source.order + 1, // insert right after the source
    };

    // Shift everything after the insertion point
    quiz.questions.forEach((q) => {
      if (q.order > source.order) q.order += 1;
    });

    quiz.questions.push(clone as any);
    QuestionService._normaliseOrder(quiz);

    await quiz.save();
    return quiz;
  },

  // ── CLEAR all questions ───────────────────────────────────────────────────────

  /**
   * Remove all questions from a quiz (draft/template reset).
   */
  async clearQuestions(
    quizId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await fetchQuizAndAssertOrg(quizId, organizationId);
    assertNotArchived(quiz);

    if (quiz.status === "published") {
      throw new ConflictError(
        "Cannot clear questions from a published quiz. Archive or duplicate it first."
      );
    }

    quiz.questions.splice(0, quiz.questions.length);
    await quiz.save();
    return quiz;
  },

  // ── Internal helper ───────────────────────────────────────────────────────────

  /**
   * Re-index all question order fields to 0-based contiguous integers
   * after insertions, deletions, or reorders.
   */
  _normaliseOrder(quiz: IQuiz): void {
    const sorted = [...quiz.questions].sort((a, b) => a.order - b.order);
    sorted.forEach((q, i) => {
      q.order = i;
    });
  },
};
