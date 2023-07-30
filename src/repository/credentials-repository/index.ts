import { Prisma } from '@prisma/client';
import { prisma } from '@/config';


async function create(data: Prisma.CredentialUncheckedCreateInput) {
  return prisma.credential.create({
    data,
  });
}


async function findById(id: number, userId:number) {
  const params: Prisma.CredentialFindUniqueArgs = {
    where: {
      id,
      userId
    },
  };

  return prisma.credential.findUnique(params);
}

async function findAll(userId: number) {
    const params: Prisma.CredentialFindManyArgs = {
    where:{
            userId
        }
    };
  
    return prisma.credential.findMany(params);
  }


const credentialRepository = {
  findAll,
  findById,
  create,
};

export default credentialRepository;
