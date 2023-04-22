import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../selectors/getArticleDetails';

describe('getArticleDetails.test', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error',
            },
        };
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
    });

    test('should return isLoading true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true,
            },
        };
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });

    test('should return isLoading true', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: {
                    id: '1',
                    title: '2',
                },
            },
        };
        expect(getArticleDetailsData(state as StateSchema)).toEqual({
            id: '1',
            title: '2',
        });
    });
});
