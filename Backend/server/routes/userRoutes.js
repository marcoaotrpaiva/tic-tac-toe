import { Router } from 'express';
import User from '../models/User.js';
const router = Router();

router.get('/leaderboard', async (req, res, next) => {
  try {
    const rows = await User.find({}, { username: 1, wins: 1, _id: 0 })
      .sort({ wins: -1, _id: 1 })
      .lean();
    return res.status(200).json({ data: rows });
  } catch (err) {
    console.log(err.message);
  }
});

router.get('/deleteUsers', async (req, res, next) => {
  try {
    const result = await User.deleteMany({});
    return res.json({ deleted: result.deletedCount });
  } catch (err) {
    next(err);
  }
});

export default router;
