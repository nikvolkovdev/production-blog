import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/Profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    // данная санка не принимает никаких аргументов
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            // получить мы хотим именно тип пользователя
            const response = await extra.api.get<Profile>('/profile');

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Вы ввели неверный логин или пароль');
        }
    },
);
