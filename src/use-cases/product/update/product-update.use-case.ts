import { ProductRepository } from '@/repository';

type Params = { id: number } & Partial<{ name: string; price: number }>;

export default (params: Params) => {
  const { id, ...rest } = params;

  return ProductRepository.update({
    where: { id },
    data: rest,
  });
};
