import dotenv from 'dotenv';
import { SignJWT, decodeJwt, jwtVerify } from 'jose';

import type { JWTPayload } from 'jose';
const secret = process.env.JWT_SECRET;

type TokenPayload = JWTPayload & {
  id: string;
};

const sign = (id: string): Promise<string> =>
  new SignJWT({ id })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(secret));

const verify = async (token: string | undefined): Promise<TokenPayload | false> => {
  try {
    if (!token) throw new Error('verify : Missing token');
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload as TokenPayload;
  } catch {
    return false;
  }
};

const decode = async (token: string | undefined): Promise<TokenPayload | false> => {
  try {
    if (!token) throw new Error('verify : Missing token');
    const { payload } = await decodeJwt(token);
    return payload as TokenPayload;
  } catch {
    return false;
  }
};

export { decode, sign, verify };
