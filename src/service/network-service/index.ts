import { Network } from '@prisma/client';
import { cryptrThis, decryptrThis } from '@/util/cryptr';
import { CreateNetwork } from '@/schema/network-schema';
import networkRepository from '@/repository/network-repository';
import { cantAccessThis, couldntFindAny } from '@/error';


export async function create(body: CreateNetwork): Promise<Network> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await networkRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Network | Network[]> {
  let resp:Network[]
  if(!id){
    const query = await networkRepository.findAll(userId)
    if(query.length === 0)throw couldntFindAny("Network")
    resp = query
  }
  if(!resp){  
    const query = await networkRepository.findById(id, userId)
    if(!query){
      const checkCreated = await networkRepository.findAll(userId)
      if(checkCreated.length === 0)throw couldntFindAny("Network")
      throw cantAccessThis("Network")
    }

    resp = [query]
  }
  resp.forEach(item => {
    const unhashPass = decryptrThis(item.password)
    item.password = unhashPass
  }) 
  return resp
}


export async function deleteById(userId:number, id:number): Promise<Network> {
  const query = await networkRepository.deleteById(userId, id)
  if(!query)throw cantAccessThis("Network")
 
  return query
}


const networkService = {
  gotcha,
  create,
  deleteById
};

export default networkService;