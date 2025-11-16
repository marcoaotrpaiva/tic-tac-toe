import express from 'express';
import { generateCookie, removeCookie } from '../utils/cookie.ts';
import User from '../models/User.js';
import { CRYPTO } from '../utils/crypto.ts';
import { decode, sign, verify } from '../utils/token.ts';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) return res.status(400).json({ error: 'Username already exists' });
    const [hash, salt] = await CRYPTO.hash(password);
    const user = await User.create({ username, hash, salt, wins: 0, losses: 0 });
    const token = sign(user._id.toString());
    res.setHeader('Set-Cookie', generateCookie(token, 'auth_token'));
    res.status(201).json({
      user: { username: user.username },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'invalid username' });

    const [computedHash] = await CRYPTO.hash(password, user.salt);

    const valid = computedHash === user.hash;
    if (!valid) return res.status(400).json({ error: 'invalid pw' });

    const token = await sign(user._id.toString());
    res.setHeader('Set-Cookie', generateCookie(token, 'auth_token'));

    res.json({
      user: { username: user.username, losses: user.losses },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
