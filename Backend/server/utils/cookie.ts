import dotenv from 'dotenv';

dotenv.config();

const domain = process.env.COOKIE_DOMAIN || '';
const path = process.env.COOKIE_PATH || '/';

const generateCookie = (token: string, cookieName: string) => {
  const cookie = [`${cookieName}=${token};Path=${path};Max-Age=${24 * 60 * 60};SameSite=${domain}`];
  return cookie.join('');
};
const removeCookie = (cookieName: string) => {
  const cookie = [`${cookieName}=;Path=${path};Max-Age=0;SameSite=${domain}`];

  return cookie.join('');
};

export { generateCookie, removeCookie };
