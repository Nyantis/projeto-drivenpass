import { Credential} from '@prisma/client';
import { CreateCredential } from '@/schema';
import credentialRepository from '@/repository/credential-repository';
import { cryptrThis, decryptrThis } from '@/util/cryptr';


export async function create(body: CreateCredential): Promise<Credential> {
    const hashPass = cryptrThis(body.password)
    body.password = hashPass

    return await credentialRepository.create(body)
}


async function gotcha(userId:number, id?:number): Promise<Credential | Credential[]> {
  if(!id){
    const query = await credentialRepository.findAll(userId)
    query.forEach(item => {
      const unhashPass = decryptrThis(item.password)
      item.password = unhashPass
    }) 
    return query 
  }
  const query = await credentialRepository.findById(id, userId)
  const unhashPass = decryptrThis(query.password)
  query.password = unhashPass
  return query
}


export async function deleteById(userId:number, id:number): Promise<Credential> {

  return await credentialRepository.deleteById(userId, id)
}


const credentialService = {
  gotcha,
  create,
  deleteById
};

export default credentialService;