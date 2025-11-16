import cookie from 'cookie';
import { verify } from '../utils/token.ts';

export const auth = async (req, res, next) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const payload = await verify(token);

    if (!payload) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};
