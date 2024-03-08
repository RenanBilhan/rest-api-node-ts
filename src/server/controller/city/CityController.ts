import { Request, Response } from 'express';
import * as yup from 'yup';

interface ICity{
    'cityName': string;
    'state': string;
}

const bodyValidation: yup.ObjectSchema<ICity> = yup.object().shape({
    cityName: yup.string().required().min(3),
    state: yup.string().required().min(3),
});

export const create = async (request: Request<{}, {}, ICity>, response: Response) => {
    let validatedData: ICity | undefined= undefined;
    try {
        validatedData = await bodyValidation.validate(request.body);
        console.log(validatedData);
    } catch (error) {
        const yupError = error as yup.ValidationError;

        return response.json({
            errors: {
                default: yupError.message,
            }
        });
    }
};

