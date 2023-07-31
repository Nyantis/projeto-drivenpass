import { Network } from '@prisma/client';
import { cryptrThis, decryptrThis } from '@/util/cryptr';
import { CreateNetwork } from '@/schema/network-schema';
import networkRepository from '@/repository/network-repository';


export async function create(body: CreateNetwork): Promise<Network> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await networkRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Network | Network[]> {
  if(!id){
    const query = await networkRepository.findAll(userId)
    query.forEach(item => {
      const unhashPass = decryptrThis(item.password)
      item.password = unhashPass
    }) 
    return query 
  }
  const query = await networkRepository.findById(id, userId)
  const unhashPass = decryptrThis(query.password)
  query.password = unhashPass
  return query
}


export async function deleteById(userId:number, id:number): Promise<Network> {

  return await networkRepository.deleteById(userId, id)
}


const networkService = {
  gotcha,
  create,
  deleteById
};

export default networkService;