import axios from 'axios';
import { userActions } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUsername } from '../../services/loginByUsername/loginByUsername';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
    test('success common', async () => {
        const userValue = { username: 'adm', id: '1' };
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({
            username: 'admin',
            password: '123',
        });
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('fulfilled');
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(
            userActions.setAuthData(userValue),
        );
        expect(result.payload).toEqual(userValue);
    });

    test('error common', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk({
            username: 'admin',
            password: '123',
        });
        expect(thunk.api.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('rejected');
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
