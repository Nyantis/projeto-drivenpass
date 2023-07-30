import { Credential } from '@prisma/client';
import Joi from 'joi';


export const credentialSchema = Joi.object<CreateCredential>({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export type CreateCredential = Pick<Credential, 'username' | 'password' | 'title' | 'url'>;