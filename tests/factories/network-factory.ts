import dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { Network, User } from '@prisma/client';
import { prisma } from '@/config';
import { createUser } from './auth-factory';
import { cryptrThis } from '@/util/cryptr';

export async function createNetworkFactory(user?:User): Promise<Network> {
  const incomingUser = user || (await createUser());
  return await prisma.network.create({
    data: {
      title: faker.company.name(),  
      network: faker.internet.ip(),
      password: cryptrThis(faker.internet.password(10)),
      userId: incomingUser.id

    },
  });
}
