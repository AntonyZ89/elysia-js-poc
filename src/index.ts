import { AuthProvider } from '@/application/provider';
import { register } from './use-cases';
import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { swagger } from '@elysiajs/swagger';
import { User } from '@prisma/client';

const app = new Elysia()
  .state('user', null as null | User)
  .decorate('auth', AuthProvider)
  .use(jwt({ name: 'jwt', secret: 'secret', exp: '30m' }))
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: {
          title: 'Elysia API',
          version: '1.0.0',
        },
      },
    }),
  )
  .use(register)
  .listen(3000);

console.log(`Listening on port http:localhost:${app.server?.port}/`);
console.log(`Swagger on port http://localhost:${app.server?.port}/docs`);

type AppInstance = typeof app;

export type { AppInstance };
