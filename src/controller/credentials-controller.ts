import { CreateCredential } from '@/schema';
import credentialService from '@/service/credential-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function credentialPost(req: Request, res: Response) {
  const body = {
    ...req.body,
    userId: res.locals.userId
    } as CreateCredential
  try {
    const result = await credentialService.create(body);
    return res.status(httpStatus.OK).send(result);

  } catch (error) {
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}

export async function credentialGet(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await credentialService.gotcha(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}

export async function credentialDelete(req: Request, res: Response) {
    const { params, userId } = res.locals;

    try {
      const result = await credentialService.deleteById(userId, params.id);
  
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}
