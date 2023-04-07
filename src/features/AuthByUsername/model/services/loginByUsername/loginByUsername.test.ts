import axios from 'axios';
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername';
import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername.test', () => {
    test('success login', async () => {
        const userValue = { username: 'adm', id: '1' };
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('fulfilled');
        expect(thunk.dispatch).toHaveBeenCalledTimes(3);
        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue));
        expect(result.payload).toEqual(userValue);
    });

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
        const thunk = new TestAsyncThunk(loginByUsername);
        const result = await thunk.callThunk({ username: 'admin', password: '123' });
        expect(mockedAxios.post).toHaveBeenCalled();
        expect(result.meta.requestStatus).toEqual('rejected');
        expect(thunk.dispatch).toHaveBeenCalledTimes(2);
    });
});
