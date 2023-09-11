import type { AppInstance } from '@';
import { t } from 'elysia';
import useCase from './auth-login.use-case';

const bodySchema = t.Object({
  email: t.String(),
  password: t.String(),
});

const responseSchema = t.Object({
  accessToken: t.String(),
  refreshToken: t.String(),
  expiresAt: t.Number(),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.post(
    '/auth/login',
    async ({ body, auth, jwt }) => await useCase({ ...body, auth, jwt }),
    {
      body: bodySchema,
      response: responseSchema,
      detail: {
        tags: ['Auth'],
      },
    },
  );
