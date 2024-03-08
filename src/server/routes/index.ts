import { Router } from 'express';

import { StatusCodes } from 'http-status-codes';

import {CityController} from './../controller';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Hello, get!');
});

router.post('/city', async (request, response) => {
    const result = await CityController.create(request, response);
    return response.status(StatusCodes.CREATED).json(CityController.create(request, response));
});

export { router };