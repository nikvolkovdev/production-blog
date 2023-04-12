import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { validateProfileData } from 'entities/Profile/model/services/validateProfileData/validateProfileData';
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm';
import { Profile, ValidateProfileError } from '../../types/Profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',

    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        // в интерфейсе ThunkConfig задали полю state тип StateSchema, и теперь передаем этот стейт в наш селектор.
        const formData = getProfileForm(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
