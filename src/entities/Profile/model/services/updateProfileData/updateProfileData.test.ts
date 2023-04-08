import axios from 'axios';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { AsyncThunk } from '@reduxjs/toolkit';
import { Profile, ValidateProfileError } from 'entities/Profile';
import { updateProfileData } from './updateProfileData';

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

describe('updateProfileData.test', () => {
    test('success update', async () => {
        const thunk = new TestAsyncThunk(updateProfileData as AsyncThunk<Profile, void, any>, {
            profile: {
                form: data,
            },
        });

        thunk.api.put.mockReturnValue(Promise.resolve({ data }));

        const result = await thunk.callThunk();
        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error update', async () => {
        const thunk = new TestAsyncThunk(updateProfileData as AsyncThunk<Profile, void, any>, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toEqual('rejected');
        expect(result.payload).toEqual([ValidateProfileError.SERVER_ERROR]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData as AsyncThunk<Profile, void, any>, {
            profile: {
                form: { ...data, lastname: '' },
            },
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toEqual('rejected');
        expect(result.payload).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });
});
