import type { AppInstance } from '@';
import { AuthMiddleware, ProductMiddleware } from '@/application/middleware';
import useCase from './product-get.use-case';
import { t } from 'elysia';

const responseSchema = t.Object({
  id: t.Number(),
  userId: t.Number(),
  name: t.String(),
  price: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

const paramsSchema = t.Object({
  id: t.Numeric(),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.get('/product/:id', async ({ params }) => useCase(params), {
    headers: t.Object({ authorization: t.String() }),
    beforeHandle: [
      AuthMiddleware.isAuthenticated,
      ProductMiddleware.isProductOwner,
    ],
    params: paramsSchema,
    response: responseSchema,
    detail: {
      summary: 'Get a product',
      tags: ['Product'],
    },
  });
