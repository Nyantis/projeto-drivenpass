import { Request, Response, Router } from 'express';
import { credentialSchema } from '@/schema';
import { idParamSchema } from '@/schema/param-schema';
import { authenticateToken, validateBody, validateParams } from '@/middleware';
import { credentialDelete, credentialGet, credentialPost } from '@/controller/credentials-controller';


const credentialRouter = Router();

credentialRouter
    .all('/*', authenticateToken)
    .post('/', validateBody(credentialSchema), credentialPost)
    .get('/:id?', validateParams(idParamSchema), credentialGet)
    .delete('/:id', validateParams(idParamSchema), credentialDelete)

export { credentialRouter };


async function returnLocals(req: Request, res:Response) {
    if(!res.locals.params.id){
        return res.status(200).send("teve não")
    }
    res.status(200).send(res.locals)
}