import { Prisma } from '@prisma/client';
import { DbProvider } from '@/application/provider';

const prisma = DbProvider.prisma.user;

function create<T extends Prisma.UserCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserCreateArgs>,
) {
  return prisma.create(args);
}

function findUnique<T extends Prisma.UserFindUniqueArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>,
) {
  return prisma.findUnique(args);
}

function update<T extends Prisma.UserUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>,
) {
  return prisma.update(args);
}

export default {
  create,
  findUnique,
  update,
};
