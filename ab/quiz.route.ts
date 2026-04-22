import { Router, Request, Response, NextFunction } from "express";
import { QuizService } from "../services/quiz.service";
import { QuestionService } from "../services/question.service";
import { AppError } from "../errors/app.errors";
import type {
  CreateQuizDTO,
  UpdateQuizDTO,
  AddQuestionDTO,
  UpdateQuestionDTO,
  QuizFilters,
  PaginationOptions,
} from "../types/quiz.types";

const router = Router();

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Pull userId and orgId from the authenticated request.
 *  Replace with your actual auth middleware shape. */
function getAuthContext(req: Request): { userId: string; organizationId: string } {
  const userId = (req as any).user?.id as string;
  const organizationId = (req as any).user?.organizationId as string;
  return { userId, organizationId };
}

function handleError(err: unknown, res: Response): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, code: "INTERNAL_ERROR", message: "An unexpected error occurred." });
}

// ─── Quiz routes ──────────────────────────────────────────────────────────────

// POST /quizzes — create quiz
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.createQuiz(req.body as CreateQuizDTO, userId, organizationId);
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// GET /quizzes — list quizzes (paginated)
router.get("/", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);

    const filters: QuizFilters = {
      organizationId,
      status: req.query.status as any,
      category: req.query.category as string,
      difficulty: req.query.difficulty as any,
      createdBy: req.query.createdBy as string,
      search: req.query.search as string,
    };

    const pagination: PaginationOptions = {
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 20,
      sortBy: (req.query.sortBy as any) ?? "createdAt",
      sortOrder: (req.query.sortOrder as any) ?? "desc",
    };

    const result = await QuizService.listQuizzes(filters, pagination);
    res.json({ success: true, ...result });
  } catch (err) {
    handleError(err, res);
  }
});

// GET /quizzes/:quizId — get single quiz
router.get("/:quizId", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuizService.getQuizById(req.params.quizId, organizationId);
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// PATCH /quizzes/:quizId — update quiz metadata
router.patch("/:quizId", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.updateQuiz(
      req.params.quizId,
      req.body as UpdateQuizDTO,
      userId,
      organizationId
    );
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/save-draft — explicit Save Draft button
router.post("/:quizId/save-draft", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.saveDraft(
      req.params.quizId,
      req.body as UpdateQuizDTO,
      userId,
      organizationId
    );
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/publish — Publish Quiz button
router.post("/:quizId/publish", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.publishQuiz(req.params.quizId, userId, organizationId);
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/archive — soft-delete
router.post("/:quizId/archive", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.archiveQuiz(req.params.quizId, userId, organizationId);
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/duplicate — clone as draft
router.post("/:quizId/duplicate", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    const quiz = await QuizService.duplicateQuiz(req.params.quizId, userId, organizationId);
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE /quizzes/:quizId — hard delete (drafts/archived only)
router.delete("/:quizId", async (req: Request, res: Response) => {
  try {
    const { userId, organizationId } = getAuthContext(req);
    await QuizService.deleteQuiz(req.params.quizId, userId, organizationId);
    res.status(204).send();
  } catch (err) {
    handleError(err, res);
  }
});

// ─── Question routes (/quizzes/:quizId/questions) ─────────────────────────────

// GET /quizzes/:quizId/questions
router.get("/:quizId/questions", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const questions = await QuestionService.getQuestions(req.params.quizId, organizationId);
    res.json({ success: true, data: questions });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/questions — Add New Question
router.post("/:quizId/questions", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuestionService.addQuestion(
      req.params.quizId,
      req.body as AddQuestionDTO,
      organizationId
    );
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// GET /quizzes/:quizId/questions/:questionId
router.get("/:quizId/questions/:questionId", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const question = await QuestionService.getQuestionById(
      req.params.quizId,
      req.params.questionId,
      organizationId
    );
    res.json({ success: true, data: question });
  } catch (err) {
    handleError(err, res);
  }
});

// PATCH /quizzes/:quizId/questions/:questionId — edit prompt/options/difficulty
router.patch("/:quizId/questions/:questionId", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuestionService.updateQuestion(
      req.params.quizId,
      req.params.questionId,
      req.body as UpdateQuestionDTO,
      organizationId
    );
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// PUT /quizzes/:quizId/questions/reorder — drag-drop reorder
router.put("/:quizId/questions/reorder", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const { orderedIds } = req.body as { orderedIds: string[] };
    const quiz = await QuestionService.reorderQuestions(
      req.params.quizId,
      orderedIds,
      organizationId
    );
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// POST /quizzes/:quizId/questions/:questionId/duplicate — copy icon
router.post("/:quizId/questions/:questionId/duplicate", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuestionService.duplicateQuestion(
      req.params.quizId,
      req.params.questionId,
      organizationId
    );
    res.status(201).json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE /quizzes/:quizId/questions/:questionId — trash icon
router.delete("/:quizId/questions/:questionId", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuestionService.removeQuestion(
      req.params.quizId,
      req.params.questionId,
      organizationId
    );
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

// DELETE /quizzes/:quizId/questions — clear all (reset)
router.delete("/:quizId/questions", async (req: Request, res: Response) => {
  try {
    const { organizationId } = getAuthContext(req);
    const quiz = await QuestionService.clearQuestions(req.params.quizId, organizationId);
    res.json({ success: true, data: quiz });
  } catch (err) {
    handleError(err, res);
  }
});

export default router;
