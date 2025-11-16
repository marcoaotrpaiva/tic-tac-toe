// import { ENV } from '@common/be-utils';
// import { JWT } from '@common/utils';
// import { SignJWT, decodeJwt, jwtVerify } from 'jose';

// // import type { Role } from '@erp/db';
// // import type { JWTPayload } from 'jose';

// const secret = ENV.check('JWT_SECRET');

// type TokenPayload = JWTPayload & {
//   id: string;
//   role: Role;
// };

// const sign = (id: string, role: Role): Promise<string> =>
//   new SignJWT({ id, role })
//     .setProtectedHeader(JWT.OPTIONS)
//     .setExpirationTime(JWT.EXP_TIME)
//     .sign(new TextEncoder().encode(secret));

// const verify = async (token: string | undefined): Promise<TokenPayload | false> => {
//   try {
//     if (!token) {
//       throw new Error('verify: Missing token');
//     }

//     const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
//     return payload as TokenPayload;
//   } catch {
//     return false;
//   }
// };

// const decode = async (token: string | undefined): Promise<TokenPayload | false> => {
//   try {
//     if (!token) {
//       throw new Error('decode: Missing token');
//     }

//     const { payload } = await decodeJwt(token);
//     return payload as TokenPayload;
//   } catch {
//     return false;
//   }
// };

// export { decode, sign, verify };
