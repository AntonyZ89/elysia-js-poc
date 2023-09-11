import { ProductRepository } from '@/repository';

interface Params {
  id: number;
}

export default async (params: Params) => {
  await ProductRepository.remove({
    where: params,
  });
};
