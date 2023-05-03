import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollRecoverySchema } from '../types/ScrollRecoverySchema';

const initialState: ScrollRecoverySchema = {
    scroll: {},
};

export const scrollRecoverySlice = createSlice({
    name: 'ScrollRecovery',
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[payload.path] = payload.position;
        },
    },
});

export const { reducer: scrollRecoveryReducer } = scrollRecoverySlice;
export const { actions: scrollRecoveryActions } = scrollRecoverySlice;
