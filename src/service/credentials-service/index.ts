import { Credential} from '@prisma/client';
import { CreateCredential } from '@/schema';
import credentialRepository from '@/repository/credentials-repository';


export async function create(body: CreateCredential): Promise<Credential> {
    return await credentialRepository.create(body)
}



async function gotcha(userId:number, id?:number): Promise<Credential | Credential[]> {
  if(!id){
    return await credentialRepository.findAll(userId)
  }

  return await credentialRepository.findById(id, userId)
}

// async function validateUniqueEmailOrFail(email: string) {
//   const userWithSameEmail = await authRepository.account.findByEmail(email);
//   if (userWithSameEmail) {
//     throw duplicatedEmailError();
//   }
// }


// async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
//   const user = await authRepository.account.findByEmail(email, { id: true, email: true, password: true });
//   if (!user) throw invalidCredentialsError();

//   return user;
// }

const credentialService = {
  gotcha,
  create,
};

export default credentialService;