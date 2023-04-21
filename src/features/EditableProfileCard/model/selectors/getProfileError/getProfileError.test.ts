import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from '../../consts/consts';
import { getProfileError } from '../getProfileError/getProfileError';

describe('getProfileError.test', () => {
    test('should return data', () => {
        const error = ValidateProfileError.INCORRECT_USER_DATA;
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: ValidateProfileError.INCORRECT_USER_DATA,
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual(error);
    });

    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
