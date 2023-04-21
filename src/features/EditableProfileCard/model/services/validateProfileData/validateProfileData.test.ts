import axios from 'axios';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from '../../consts/consts';
import { validateProfileData } from './validateProfileData';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

const data = {
    username: 'admin',
    age: 22,
    country: Country.KAZAKHSTAN,
    firstname: 'Nikita',
    lastname: 'Volkov',
    city: 'Almaty',
    currency: Currency.KZT,
};

describe('validateProfileData.test', () => {
    test('validate should be ok', async () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('incorrect user data', async () => {
        const result = validateProfileData({ ...data, firstname: '' });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('incorrect age', async () => {
        const result = validateProfileData({ ...data, age: undefined });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });
});
