import { LoginSchema } from 'features/AuthByUsername';
import { loginActions, loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';

describe('loginSlice.test', () => {
    test('should return modified username', () => {
        const state: DeepPartial<LoginSchema> = { username: 'adm' };
        expect(loginReducer(state as LoginSchema, loginActions.setUsername('admin')))
            .toEqual({ username: 'admin' });
    });

    test('should return modified password', () => {
        const state: DeepPartial<LoginSchema> = { password: '123' };
        expect(loginReducer(state as LoginSchema, loginActions.setPassword('1234')))
            .toEqual({ password: '1234' });
    });
});
