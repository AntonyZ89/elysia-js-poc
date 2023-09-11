import type Elysia from 'elysia';
import { controllers as authControllers } from './auth';
import { controllers as productControllers } from './product';

const controllers = {
  ...authControllers,
  ...productControllers,
};

function register(app: Elysia) {
  // @ts-expect-error TS2769: No overload matches this call
  Object.values(controllers).forEach((controller) => app.use(controller));

  return app;
}

export { register };
