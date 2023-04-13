import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScrollRecoveryData = (state: StateSchema) => state.scrollRecovery.scroll;
export const getScrollByPath = createSelector(
    getScrollRecoveryData,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
