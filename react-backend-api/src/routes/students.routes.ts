import { Router } from 'express';
import { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/students.controller';
import { validate } from '../middleware/validate.middleware';
import { studentSchema } from '../validation/student.schema';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

router.post('/', authMiddleware, roleMiddleware(['admin', 'instructor']), validate(studentSchema), createStudent);
router.get('/', authMiddleware, roleMiddleware(['admin', 'instructor', 'judge']), getAllStudents);
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'instructor', 'judge']), getStudentById);
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'instructor']), validate(studentSchema), updateStudent);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteStudent);

export default router;