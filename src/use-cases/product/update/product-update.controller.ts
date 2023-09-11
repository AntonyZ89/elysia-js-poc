import type { AppInstance } from '@';
import { AuthMiddleware, ProductMiddleware } from '@/application/middleware';
import useCase from './product-update.use-case';
import { t } from 'elysia';

const responseSchema = t.Object({
  id: t.Number(),
  userId: t.Number(),
  name: t.String(),
  price: t.Number(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
});

const bodySchema = t.Partial(
  t.Omit(responseSchema, ['id', 'createdAt', 'updatedAt']),
);

const paramsSchema = t.Object({
  id: t.Numeric(),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.put(
    '/product/:id',
    async ({ params }) => {
      const result = await useCase(params);

      return {
        ...result,
        price: result.price.toNumber(),
      };
    },
    {
      headers: t.Object({ authorization: t.String() }),
      beforeHandle: [
        AuthMiddleware.isAuthenticated,
        ProductMiddleware.isProductOwner,
      ],
      params: paramsSchema,
      body: bodySchema,
      response: responseSchema,
      detail: {
        summary: 'Update a product',
        tags: ['Product'],
      },
    },
  );
