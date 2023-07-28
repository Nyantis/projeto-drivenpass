import { Router } from 'express';
import { validateBody } from '@/middlewares';
import { usersPost, singInPost } from '@/controllers';

import { createUserSchema, signInSchema } from '@/schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);
authenticationRouter.post('/sign-up', validateBody(createUserSchema), usersPost);

export { authenticationRouter };
