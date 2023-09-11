import type { AppInstance } from '@';
import { AuthMiddleware, ProductMiddleware } from '@/application/middleware';
import useCase from './product-delete.use-case';
import { t } from 'elysia';

const bodySchema = t.Object({
  name: t.String(),
  price: t.Number(),
});

const responseSchema = t.Object({
  statusCode: t.Number(),
  message: t.String(),
});

const paramsSchema = t.Object({
  id: t.Numeric(),
});

export default <Instance extends AppInstance>(app: Instance) =>
  app.delete(
    '/product/:id',
    async ({ params }) => {
      await useCase(params);

      return {
        statusCode: 200,
        message: 'Product deleted',
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
        summary: 'Delete a product',
        tags: ['Product'],
      },
    },
  );
