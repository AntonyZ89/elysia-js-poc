import { Prisma } from '@prisma/client';
import { DbProvider } from '../application/provider';

const prisma = DbProvider.prisma.userToken;

function create<T extends Prisma.UserTokenCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.UserTokenCreateArgs>,
) {
  return prisma.create(args);
}

export default {
  create,
};
