import { Credential } from '@prisma/client';
import Joi from 'joi';


export const credentialSchema = Joi.object<CredentialSchema>({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});

type CredentialSchema = Pick<Credential, 'username' | 'password' | 'title' | 'url'>;
export type CreateCredential = CredentialSchema & {
    userId: number
};