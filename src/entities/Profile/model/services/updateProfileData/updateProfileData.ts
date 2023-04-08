import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile } from '../../types/Profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',

    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        // в интерфейсе ThunkConfig задали полю state тип StateSchema, и теперь передаем этот стейт в наш селектор.
        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put('/profile', formData);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('чудовищная ошибка');
        }
    },
);
