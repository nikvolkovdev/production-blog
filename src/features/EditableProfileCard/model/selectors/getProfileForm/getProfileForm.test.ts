import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { getProfileForm } from './getProfileForm';

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const form = {
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
                form: {
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
        expect(getProfileForm(state as StateSchema)).toEqual(form);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
