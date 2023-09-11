import type { AppInstance } from '@';
import { UserRepository, UserTokenRepository } from '@/repository';
import { ResolveElysia } from '@/types';

interface Params {
  email: string;
  password: string;
  auth: ResolveElysia<AppInstance, 'request.auth'>;
  jwt: ResolveElysia<AppInstance, 'request.jwt'>;
}

export default async (params: Params) => {
  const { email, password, auth, jwt } = params;

  const user = await UserRepository.findUnique({
    where: { email },
  });

  if (!user || !Bun.password.verify(password, user.password)) {
    throw new Error('User not found');
  }

  const token = await auth.createToken({ ...user, jwt });

  await UserTokenRepository.create({
    data: {
      userId: user.id,
      token: token.accessToken,
      refreshToken: token.refreshToken,
      expiresAt: new Date(token.expiresAt / 1000),
    },
  });

  return token;
};
