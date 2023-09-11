import type { AppInstance } from '@';
import { ResolveElysia } from '@/types';

interface Params {
  id: number | string;
  jwt: ResolveElysia<AppInstance, 'request.jwt'>;
}

async function createToken(params: Params) {
  const { jwt } = params;
  const id = params.id.toString();

  const accessToken = await jwt.sign({ id });
  const refreshToken = await jwt.sign({ id });
  const expiresAt = new Date().getTime() + 30 * 60 * 1000;

  return { accessToken, refreshToken, expiresAt };
}

export default { createToken };
