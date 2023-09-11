import type { AppInstance } from '@';
import useCase from './auth-signup.use-case';
import { t } from 'elysia';

const bodySchema = t.Object({
  name: t.String(),
  email: t.String(),
  password: t.String(),
});

const responseSchema = t.Object({
  statusCode: t.Number(),
  message: t.String(),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.post(
    '/auth/signup',
    ({ body, set }) => {
      set.status = 201;

      return useCase(body);
    },
    {
      body: bodySchema,
      response: responseSchema,
      detail: {
        tags: ['Auth'],
      },
    },
  );
