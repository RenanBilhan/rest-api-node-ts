
import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AnyObject, Maybe, ObjectSchema, ValidationError } from 'yup';

type TProperty = 'body' | 'header' | 'params' | 'query';

type TGetSchema = <T extends Maybe<AnyObject>>(schema : ObjectSchema<T>) => ObjectSchema<T>;

type TAllSchemas = Record<TProperty, ObjectSchema<any>>;

type TGetAllSchemas = (getSchema: TGetSchema) => Partial<TAllSchemas>;

type TValidation = (getAllSchemas: TGetAllSchemas) => RequestHandler;

export const validation: TValidation = (getAllSchemas) => async (req, res, next ) => {
    const schema = getAllSchemas((schema) => schema);

    console.log('test');

    const errorsResult: Record<string, Record<string, string>> = {};

    Object.entries(schema).forEach(([key, schema]) => {
        try {
            schema.validateSync(req[key as TProperty], { abortEarly: false });
            // return next();
        } catch (error) {
            const yupError = error as ValidationError;
            const validationError: Record<string, string> = {};

            yupError.inner.forEach(error => {
                if(error.path === undefined) return; 

                validationError[error.path] = error.message;
            });
            errorsResult[key] = validationError;
            // return res.status(StatusCodes.BAD_REQUEST).json({
            //     validationError
            // });
        }
    });

    if(Object.entries(errorsResult).length === 0){
        return next();
    }else{
        return res.status(StatusCodes.BAD_REQUEST).json({
            validationError: errorsResult
        });
    }
    
};