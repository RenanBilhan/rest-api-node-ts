import { Router } from 'express';

import { StatusCodes } from 'http-status-codes';

import {CityController} from './../controller';

const router = Router();

router.get('/', (_, res) => {
    return res.send('Hello, get!');
});

router.post('/city', CityController.createValidation, CityController.create);

router.get('/city', CityController.findAllValidation, CityController.findAll);

export { router };