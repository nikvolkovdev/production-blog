import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getScrollRecoveryData = (state: StateSchema) =>
    state.scrollRecovery.scroll;
export const getScrollByPath = createSelector(
    getScrollRecoveryData,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
