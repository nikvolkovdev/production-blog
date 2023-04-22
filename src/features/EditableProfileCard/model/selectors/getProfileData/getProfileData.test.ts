import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { getProfileData } from './getProfileData';

describe('getProfileData.test', () => {
    test('should return data', () => {
        const data = {
            username: 'admin',
            age: 22,
            country: Country.KAZAKHSTAN,
            firstname: 'Nikita',
            lastname: 'Volkov',
            city: 'Almaty',
            currency: Currency.KZT,
        };
        const state: DeepPartial<StateSchema> = {
            profile: {
                data: {
                    username: 'admin',
                    age: 22,
                    country: Country.KAZAKHSTAN,
                    firstname: 'Nikita',
                    lastname: 'Volkov',
                    city: 'Almaty',
                    currency: Currency.KZT,
                },
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
