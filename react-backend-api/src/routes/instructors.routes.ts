import { Router } from 'express';
import {
  createInstructor,
  getInstructors,
  getInstructorById,
  updateInstructor,
  deleteInstructor,
} from '../controllers/instructors.controller';
import { instructorSchema } from '../validation/instructor.schema';
import { validate } from '../middleware/validate.middleware';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['admin']), validate(instructorSchema), createInstructor);
router.get('/', authMiddleware, getInstructors);
router.get('/:id', authMiddleware, getInstructorById);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), validate(instructorSchema), updateInstructor);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteInstructor);

export default router;