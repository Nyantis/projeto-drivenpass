import { Request, Response, Router } from 'express';
import { credentialSchema } from '@/schema';
import { authenticateToken, validateBody, validateParams } from '@/middleware';
import { idParamSchema } from '@/schema/param-schema';


const credentialRouter = Router();

credentialRouter
    .all('/*', authenticateToken)
    .get('/:id?', validateParams(idParamSchema), returnLocals)
    .post('/', validateBody(credentialSchema),)
    .delete('/:id', validateBody)

export { credentialRouter };


async function returnLocals(req: Request, res:Response) {
    if(!res.locals.params.id){
        return res.status(200).send("teve não")
    }
    res.status(200).send(res.locals)
}