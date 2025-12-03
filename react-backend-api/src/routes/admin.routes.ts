import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { adminGetAllUsers, adminDeleteUser, adminUpdateUser } from '../controllers/admin.controller';

const router = Router();

router.use(authMiddleware, roleMiddleware(['admin']));

router.get('/users', adminGetAllUsers);
router.delete('/users/:id', adminDeleteUser);
router.put('/users/:id', adminUpdateUser);

export default router;