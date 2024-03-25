import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware/Validation';

interface IBodyProps{
    'cityName': string;
}

interface IQueryProps{
    page?: number;
    limit?: number;
    filter?: string;
}

interface IParamProps{
    id?: number;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
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

export const findByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        cityName: yup.string().required().min(3),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0)
    })),
}));



export const create = async (request: Request<{}, {}, IBodyProps>, response: Response) => {
    
    console.log(request.body);

    return response.status(StatusCodes.CREATED).json(1);
};

export const findAll = async(req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    console.log(req.query);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado.');
}; 

export const findById = async (req: Request<IParamProps>, res: Response) =>{
    console.log(req.params);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado');
};

export const updateById = async (req: Request<IParamProps, {}, IBodyProps>, res:Response) => {
    console.log(req.params);
    console.log(req.body);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Não implementado!');
};

export const deleteById = async (req: Request<IParamProps>, res: Response) =>{
    console.log(req.params);

    if(Number(req.params.id) === 99999 ) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        validationError: {
            default: 'Register not found.'
        }
    });

    return res.status(StatusCodes.NO_CONTENT).send();
};

