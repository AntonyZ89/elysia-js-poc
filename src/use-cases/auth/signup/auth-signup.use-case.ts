import { UserRepository } from '@/repository';

interface Params {
  name: string;
  email: string;
  password: string;
}

export default async function (params: Params) {
  params.password = await Bun.password.hash(params.password, 'bcrypt');

  await UserRepository.create({ data: params });

  return {
    statusCode: 201,
    message: 'Cadastrado com sucesso',
  };
}
