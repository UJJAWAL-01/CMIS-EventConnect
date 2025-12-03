import { Router } from 'express';
import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import studentsRoutes from './students.routes';
import instructorsRoutes from './instructors.routes';
import judgesRoutes from './judges.routes';
import adminRoutes from './admin.routes';
import healthRoutes from './health.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/students', studentsRoutes);
router.use('/instructors', instructorsRoutes);
router.use('/judges', judgesRoutes);
router.use('/admin', adminRoutes);
router.use('/_db', healthRoutes);

export default router;