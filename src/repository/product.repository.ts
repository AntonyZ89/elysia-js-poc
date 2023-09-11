import { Prisma } from '@prisma/client';
import { DbProvider } from '../application/provider';

const prisma = DbProvider.prisma.product;

function get<T extends Prisma.ProductFindFirstArgs>(
  args: Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs>,
) {
  return prisma.findFirst(args);
}

function create<T extends Prisma.ProductCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.ProductCreateArgs>,
) {
  return prisma.create(args);
}

function findUnique<T extends Prisma.ProductFindUniqueArgs>(
  args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs>,
) {
  return prisma.findUnique(args);
}

function update<T extends Prisma.ProductUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs>,
) {
  return prisma.update(args);
}

function remove<T extends Prisma.ProductDeleteArgs>(
  args: Prisma.SelectSubset<T, Prisma.ProductDeleteArgs>,
) {
  return prisma.delete(args);
}

export default {
  get,
  create,
  findUnique,
  update,
  remove,
};
