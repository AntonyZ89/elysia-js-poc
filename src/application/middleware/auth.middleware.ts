import { UserRepository } from '@/repository';
import type { AppInstance } from '@';
import { ResolveElysia } from '@/types';

// FIXME: use HookHandler interface
type Params = {
  store: ResolveElysia<AppInstance, 'store'>;
  jwt: ResolveElysia<AppInstance, 'request.jwt'>;
  headers: { authorization?: string };
};

async function isAuthenticated(params: Params) {
  const { headers, store, jwt } = params;

  const token = headers.authorization?.replace('Bearer ', '');

  const data = token ? await jwt.verify(token) : false;

  const user = data
    ? await UserRepository.findUnique({ where: { id: +data.id } })
    : null;

  if (!user) {
    throw new Response('Unauthorized', { status: 401 });
  }

  store.user = user;
}

export default { isAuthenticated };
