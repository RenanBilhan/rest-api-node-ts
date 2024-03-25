import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('City - Create', () => {

    it('Create register', async () => {
        const res1 = await testServer
            .post('/city')
            .send({
                cityName: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Create failure less than 3 characters', async () => {
        const res1 = await testServer
            .post('/city')
            .send({
                cityName: 'Ca'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('validationError.body.cityName');
    });
});