import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('common/loginByUsername', async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI;

    try {
        // @ts-ignore
        const response = await extra.api.post('/login', authData);

        if (!response.data) {
            throw new Error();
        }

        dispatch(userActions.setAuthData(response.data));

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        );

        return response.data;
    } catch (e) {
        return rejectWithValue('Вы ввели неверный логин или пароль');
    }
});
