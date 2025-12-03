import { Router } from 'express';
import { listUsers, fetchUser, addUser, modifyUser, removeUser } from '../controllers/users.controller';
import { validate } from '../middleware/validate.middleware';
import { userSchema } from '../validation/user.schema';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';

const router = Router();

// Get all users
router.get('/', authMiddleware, roleMiddleware(['admin']), listUsers);

// Get user by ID
router.get('/:id', authMiddleware, roleMiddleware(['admin', 'instructor', 'judge', 'student']), fetchUser);

// Create a new user
router.post('/', validate(userSchema), addUser);

// Update user by ID
router.put('/:id', authMiddleware, roleMiddleware(['admin']), validate(userSchema), modifyUser);

// Delete user by ID
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), removeUser);

export default router;