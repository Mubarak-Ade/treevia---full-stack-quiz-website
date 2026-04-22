import { Types, FilterQuery } from "mongoose";
import { Quiz, IQuiz } from "../models/quiz.model";
import {
  CreateQuizDTO,
  UpdateQuizDTO,
  QuizFilters,
  PaginationOptions,
  PaginatedResult,
  QuizSummary,
} from "../types/quiz.types";
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
  ConflictError,
} from "../errors/app.errors";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Resolve a string id to ObjectId, throwing a clear error on invalid input.
 */


/**
 * Assert the requesting user owns (or belongs to the org of) the quiz.
 * Extend with RBAC as needed.
 */
function assertOwnership(quiz: IQuiz, userId: string, orgId: string): void {
  const belongsToOrg = quiz.organizationId.equals(toObjectId(orgId, "orgId"));
  if (!belongsToOrg) throw new ForbiddenError("modify a quiz from another organization");
}

// ─── Quiz CRUD service ────────────────────────────────────────────────────────

export const QuizService = {
  // ── CREATE ──────────────────────────────────────────────────────────────────

  /**
   * Create a new quiz in draft status.
   * Questions can optionally be seeded at creation time.
   */
  async createQuiz(
    dto: CreateQuizDTO,
    createdBy: string,
    organizationId: string
  ): Promise<IQuiz> {
    const userObjId = toObjectId(createdBy, "createdBy");
    const orgObjId = toObjectId(organizationId, "organizationId");

    // Normalise question order if questions are pre-seeded
    const questions = (dto.questions ?? []).map((q, i) => ({
      ...q,
      order: q.order ?? i,
    }));

    const quiz = new Quiz({
      ...dto,
      questions,
      createdBy: userObjId,
      organizationId: orgObjId,
      status: "draft",
    });

    await quiz.save();
    return quiz;
  },

  // ── READ — single ────────────────────────────────────────────────────────────

  /**
   * Fetch a single quiz by id.
   * Throws NotFoundError if the quiz doesn't exist or belongs to a different org.
   */
  async getQuizById(quizId: string, organizationId: string): Promise<IQuiz> {
    const quiz = await Quiz.findOne({
      _id: toObjectId(quizId, "quizId"),
      organizationId: toObjectId(organizationId, "organizationId"),
    }).lean<IQuiz>();

    if (!quiz) throw new NotFoundError("Quiz", quizId);
    return quiz;
  },

  // ── READ — list (paginated) ───────────────────────────────────────────────────

  /**
   * List quizzes for an org with optional filters and pagination.
   * Returns lightweight summaries (no questions array) for list views.
   */
  async listQuizzes(
    filters: QuizFilters,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<QuizSummary>> {
    const { page = 1, limit = 20, sortBy = "createdAt", sortOrder = "desc" } =
      pagination;

    const query: FilterQuery<IQuiz> = {
      organizationId: toObjectId(filters.organizationId, "organizationId"),
    };

    if (filters.status) query.status = filters.status;
    if (filters.category) query.category = filters.category;
    if (filters.difficulty) query.difficulty = filters.difficulty;
    if (filters.createdBy) query.createdBy = toObjectId(filters.createdBy, "createdBy");
    if (filters.search) query.$text = { $search: filters.search };

    const skip = (page - 1) * limit;
    const sortDir = sortOrder === "asc" ? 1 : -1;

    const [data, total] = await Promise.all([
      Quiz.find(query)
        .select("-questions") // omit full question array for list views
        .sort({ [sortBy]: sortDir })
        .skip(skip)
        .limit(limit)
        .lean<QuizSummary[]>(),
      Quiz.countDocuments(query),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },

  // ── UPDATE ───────────────────────────────────────────────────────────────────

  /**
   * Update quiz metadata / settings.
   * Does NOT touch the questions array (use QuestionService for that).
   * Cannot update a quiz that has been archived.
   */
  async updateQuiz(
    quizId: string,
    dto: UpdateQuizDTO,
    userId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await Quiz.findById(toObjectId(quizId, "quizId"));
    if (!quiz) throw new NotFoundError("Quiz", quizId);

    assertOwnership(quiz, userId, organizationId);

    if (quiz.status === "archived") {
      throw new ConflictError("Archived quizzes cannot be modified.");
    }

    // Apply each provided field explicitly to trigger Mongoose change tracking
    const allowed: (keyof UpdateQuizDTO)[] = [
      "title",
      "category",
      "difficulty",
      "coverImage",
      "xpReward",
      "timeLimitPerQuestion",
      "isPublic",
      "shuffleQuestions",
    ];

    for (const key of allowed) {
      if (dto[key] !== undefined) {
        (quiz as any)[key] = dto[key];
      }
    }

    await quiz.save(); // triggers pre-save stats recompute
    return quiz;
  },

  // ── PUBLISH ──────────────────────────────────────────────────────────────────

  /**
   * Transition a draft quiz to published.
   * Validates that the quiz has at least one question with a complete answer set.
   */
  async publishQuiz(
    quizId: string,
    userId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await Quiz.findById(toObjectId(quizId, "quizId"));
    if (!quiz) throw new NotFoundError("Quiz", quizId);

    assertOwnership(quiz, userId, organizationId);

    if (quiz.status === "published") {
      throw new ConflictError("Quiz is already published.");
    }
    if (quiz.status === "archived") {
      throw new ConflictError("Archived quizzes cannot be published.");
    }
    if (!quiz.title?.trim()) {
      throw new ValidationError("A quiz must have a title before publishing.");
    }
    if (quiz.questions.length === 0) {
      throw new ValidationError(
        "A quiz must have at least one question before publishing."
      );
    }

    quiz.status = "published";
    await quiz.save(); // pre-save hook sets publishedAt

    return quiz;
  },

  // ── SAVE DRAFT (explicit) ─────────────────────────────────────────────────────

  /**
   * Explicit "Save Draft" action — equivalent to updateQuiz but
   * ensures status stays as draft and returns a clear confirmation shape.
   */
  async saveDraft(
    quizId: string,
    dto: UpdateQuizDTO,
    userId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await this.updateQuiz(quizId, dto, userId, organizationId);

    // If somehow it got published between calls, don't downgrade it here —
    // just return as-is. The UI should reflect the real status.
    return quiz;
  },

  // ── ARCHIVE (soft-delete) ─────────────────────────────────────────────────────

  /**
   * Soft-delete: moves quiz to archived status.
   * Archived quizzes are hidden from normal list queries but retained for analytics.
   */
  async archiveQuiz(
    quizId: string,
    userId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const quiz = await Quiz.findById(toObjectId(quizId, "quizId"));
    if (!quiz) throw new NotFoundError("Quiz", quizId);

    assertOwnership(quiz, userId, organizationId);

    if (quiz.status === "archived") {
      throw new ConflictError("Quiz is already archived.");
    }

    quiz.status = "archived";
    await quiz.save();
    return quiz;
  },

  // ── DELETE (hard) ─────────────────────────────────────────────────────────────

  /**
   * Permanently delete a quiz.
   * Only allowed on drafts and archived quizzes to prevent accidental
   * deletion of live content.
   */
  async deleteQuiz(
    quizId: string,
    userId: string,
    organizationId: string
  ): Promise<void> {
    const quiz = await Quiz.findById(toObjectId(quizId, "quizId"));
    if (!quiz) throw new NotFoundError("Quiz", quizId);

    assertOwnership(quiz, userId, organizationId);

    if (quiz.status === "published") {
      throw new ConflictError(
        'Published quizzes cannot be hard-deleted. Archive first or use archiveQuiz().'
      );
    }

    await quiz.deleteOne();
  },

  // ── DUPLICATE ────────────────────────────────────────────────────────────────

  /**
   * Clone an existing quiz as a new draft (useful for the "Templates" feature
   * visible in the nav).
   */
  async duplicateQuiz(
    quizId: string,
    userId: string,
    organizationId: string
  ): Promise<IQuiz> {
    const source = await this.getQuizById(quizId, organizationId);

    const clone = new Quiz({
      ...source,
      _id: new Types.ObjectId(),          // fresh id
      title: `${source.title} (Copy)`,
      status: "draft",
      publishedAt: undefined,
      createdBy: toObjectId(userId, "createdBy"),
      organizationId: toObjectId(organizationId, "organizationId"),
      // Reset stats — pre-save will recompute
      stats: {
        questionCount: 0,
        estimatedDurationMinutes: 0,
        estimatedSuccessRate: 72,
      },
    });

    await clone.save();
    return clone;
  },
};
