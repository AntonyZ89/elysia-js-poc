import type { AppInstance } from '@';
import { AuthMiddleware } from '@/application/middleware';
import useCase from './product-create.use-case';
import { t } from 'elysia';

const bodySchema = t.Object({
  name: t.String(),
  price: t.Number(),
});

const responseSchema = t.Object({
  statusCode: t.Number(),
  message: t.String(),
  model: t.Intersect([
    bodySchema,
    t.Object({
      id: t.Number(),
      userId: t.Number(),
    }),
  ]),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.post(
    '/product',
    async ({ body, store: { user } }) => {
      const product = await useCase({ ...body, userId: user!.id });

      return {
        statusCode: 201,
        message: 'Product created',
        model: {
          ...product,
          price: +product.price,
        },
      };
    },
    {
      headers: t.Object({ authorization: t.String() }),
      beforeHandle: AuthMiddleware.isAuthenticated,
      body: bodySchema,
      response: responseSchema,
      detail: {
        summary: 'Create a product',
        tags: ['Product'],
      },
    },
  );
