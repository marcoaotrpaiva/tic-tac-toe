import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

function generateToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}
router.post('/register', async (req, res) => {
  try {
    const { username, password, wins } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) return res.status(400).json({ error: 'Username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash, type: 'player', wins });
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: { username: user.username, wins: user.wins, losses: user.losses },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'invalid credentials' });
    const token = generateToken(user._id);
    res.json({
      token,
      user: { username: user.username, wins: user.wins, losses: user.losses },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
