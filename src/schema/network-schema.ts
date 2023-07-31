import { Network } from '@prisma/client';
import Joi from 'joi';


export const networkSchema = Joi.object<NetworkSchema>({
    title: Joi.string().required(),
    network: Joi.string().required(),
    password: Joi.string().required(),
});

export type NetworkSchema = Pick<Network, 'title' | 'network' | 'password' >;
export type CreateNetwork = NetworkSchema & {
    userId: number
};