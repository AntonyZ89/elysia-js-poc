import Elysia from 'elysia';
import type { AppInstance } from '@';
import { ProductRepository } from '@/repository';

type Instance = AppInstance extends Elysia<string, infer T> ? T : never;

type Params = {
  params: { id: number | string };
  store: Instance['store'];
};

async function isProductOwner(params: Params) {
  const {
    store: { user },
    params: { id: productId },
  } = params;

  const product = user
    ? await ProductRepository.findUnique({
        where: { id: +productId, userId: user.id },
      })
    : null;

  if (!product) {
    throw new Response('Product not found', { status: 404 });
  }
}

export default {
  isProductOwner,
};
