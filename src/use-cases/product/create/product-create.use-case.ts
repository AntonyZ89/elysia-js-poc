import { ProductRepository } from '@/repository';

interface Params {
  userId: number;
  name: string;
  price: number;
}

export default async (params: Params) => {
  const product = await ProductRepository.create({
    data: params,
  });

  return product;
};
