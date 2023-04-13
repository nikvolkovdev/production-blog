import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('test with one param', () => {
        const params = getQueryParams({
            test: 'value',
        });
        expect(params).toEqual('?test=value');
    });

    test('test with multiple params', () => {
        const params = getQueryParams({
            test: 'value',
            second: '2',
        });
        expect(params).toEqual('?test=value&second=2');
    });

    test('test with undefined', () => {
        const params = getQueryParams({
            second: undefined,
        });
        expect(params).toEqual('?');
    });
});
