import { Router } from 'express';

import { StatusCodes } from 'http-status-codes';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Hello, get!');
});

router.post('/test', (request, response) => {
    console.log(request.params);
    return response.status(StatusCodes.CREATED).json(request.body);
});

export { router };