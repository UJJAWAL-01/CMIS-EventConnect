import { Router } from 'express';
import { User } from '../models/User';
import { Student } from '../models/Student';
import { Instructor } from '../models/Instructor';
import { Judge } from '../models/Judge';

const router = Router();

// Dev-only guard: block in production
router.use((req, res, next) => {
  if ((process.env.NODE_ENV || 'development') === 'production') {
    return res.status(403).json({ error: 'Forbidden in production' });
  }
  next();
});

router.get('/overview', async (_req, res) => {
  try {
    const [users, students, instructors, judges] = await Promise.all([
      User.estimatedDocumentCount(),
      Student.estimatedDocumentCount(),
      Instructor.estimatedDocumentCount(),
      Judge.estimatedDocumentCount(),
    ]);

    res.json({
      database: process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/cmis_event_connect',
      counts: { users, students, instructors, judges },
      note: 'Dev-only endpoint. Use Compass or VS Code extension for full browsing.'
    });
  } catch (e) {
    res.status(500).json({ error: 'Failed to read counts' });
  }
});

router.get('/sample', async (req, res) => {
  try {
    const collection = String(req.query.collection || 'students');
    const limit = Math.max(1, Math.min(50, parseInt(String(req.query.limit || '5'), 10)));

    let data: unknown[] = [];
    if (collection === 'students') {
      data = await Student.find().limit(limit).lean();
    } else if (collection === 'instructors') {
      data = await Instructor.find().limit(limit).lean();
    } else if (collection === 'judges') {
      data = await Judge.find().limit(limit).lean();
    } else if (collection === 'users') {
      data = await User.find({}, { password: 0 }).limit(limit).lean();
    } else {
      return res.status(400).json({ error: 'Unsupported collection' });
    }

    res.json({ collection, limit, data });
  } catch (e) {
    res.status(500).json({ error: 'Failed to read sample' });
  }
});

export default router;
