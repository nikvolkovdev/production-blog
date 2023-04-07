import { ProfileSchema } from 'entities/Profile';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ProfileSchema = {
    data: undefined,
    error: '',
    form: undefined,
    isLoading: false,
    readonly: false,
    // validateErrors: '',

};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
