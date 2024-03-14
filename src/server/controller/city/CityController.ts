import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';

interface ICity{
    'cityName': string;
}

interface IQueryProps{
    page?: number;
    limit?: number;
    filter?: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICity>(yup.object().shape({
        cityName: yup.string().required().min(3),
    })),
}));

export const findAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));



export const create = async (request: Request<{}, {}, ICity>, response: Response) => {
    
    console.log(request.body);

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};

export const findAll = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado.');
};

