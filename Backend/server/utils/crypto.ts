import crypto, { createHash } from 'node:crypto';
import argon2, { argon2id } from 'argon2';
import dotenv from 'dotenv';

dotenv.config();

const MIN_LENGTH = 4;
const MAX_LENGTH = 12;

const getSalt = (salt?: string) => {
  if (salt) {
    return Buffer.from(salt, 'base64');
  }
  return crypto.randomBytes(16);
};

const hash = async (plain: string, _salt?: string): Promise<[string, string]> => {
  if (plain.length < MIN_LENGTH) {
    throw new Error('crypto.length.short');
  }
  if (plain.length > MAX_LENGTH) {
    throw new Error('crypto.length.long');
  }

  const input = plain + process.env.CRYPTO_PEPPER;
  const salt = getSalt(_salt);

  const hash = await argon2.hash(input, {
    type: argon2id,
    memoryCost: 64 * 1024, // 64 MiB
    timeCost: 3,
    parallelism: 1,
    hashLength: 32,
    salt,
    raw: true,
  });

  return [hash.toString('base64'), salt.toString('base64')];
};

const quickHash = (input: string) => createHash('md5').update(input).digest('hex').slice(0, 8);

const CRYPTO = {
  hash,
  quickHash,
  getSalt,
  contants: {
    MIN_LENGTH,
    MAX_LENGTH,
  },
};

export { CRYPTO };
