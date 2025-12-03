import { Router } from 'express';
import { createJudge, getAllJudges, getJudgeById, updateJudge, deleteJudge } from '../controllers/judges.controller';
import { validate } from '../middleware/validate.middleware';
import { judgeSchema } from '../validation/judge.schema';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), validate(judgeSchema), createJudge);
router.get('/', authMiddleware, getAllJudges);
router.get('/:id', authMiddleware, getJudgeById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), validate(judgeSchema), updateJudge);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteJudge);

export default router;