import { Credential} from '@prisma/client';
import { CreateCredential } from '@/schema';
import credentialRepository from '@/repository/credential-repository';
import { cryptrThis, decryptrThis } from '@/util/cryptr';
import { cantAccessThis, couldntFindAny } from '@/error';

export async function create(body: CreateCredential): Promise<Credential> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await credentialRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Credential[]> {
  let resp:Credential[]
  if(!id){
    const query = await credentialRepository.findAll(userId)
    if(query.length === 0)throw couldntFindAny("Credential")
    resp = query
  }
  if(!resp){  
    const query = await credentialRepository.findById(id, userId)
    if(!query){
      const checkCreated = await credentialRepository.findAll(userId)
      if(checkCreated.length === 0)throw couldntFindAny("Credential")
      throw cantAccessThis("Credential")
    }

    resp = [query]
  }
  resp.forEach(item => {
    const unhashPass = decryptrThis(item.password)
    item.password = unhashPass
  }) 
  return resp
}

export async function deleteById(userId:number, id:number): Promise<Credential> {
  const query = await credentialRepository.deleteById(userId, id)
  if(!query)throw cantAccessThis("Credential")
 
  return query
}


const credentialService = {
  gotcha,
  create,
  deleteById
};

export default credentialService;