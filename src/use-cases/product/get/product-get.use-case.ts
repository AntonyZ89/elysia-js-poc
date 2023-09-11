import { ProductRepository } from '@/repository';

interface Params {
  id: number;
}

export default async (params: Params) => {
  const result = (await ProductRepository.get({ where: params }))!;

  return {
    ...result,
    price: result.price.toNumber(),
  };
};
