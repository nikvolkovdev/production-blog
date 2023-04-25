import { ReactNode, useEffect } from 'react';
import { Reducer } from '@reduxjs/toolkit';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';

export type ReducersList = {
    // [nameKey in StateSchemaKey]?: Reducer;
    [nameKey in StateSchemaKey]?: Reducer<NonNullable<StateSchema[nameKey]>>;
}

interface DynamicModuleLoaderProps {
    children: ReactNode;
    reducers: ReducersList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader = (props: DynamicModuleLoaderProps) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers();
        Object.entries(reducers).forEach(([keyName, reducer]) => {
            const mounted = mountedReducers[keyName as StateSchemaKey];
            if (!mounted) {
                store.reducerManager.add(keyName as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${keyName} reducer` });
            }
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([keyName, reducer]) => {
                    store.reducerManager.remove(keyName as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${keyName} reducer` });
                });
            }
        };

        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            { children }
        </>
    );
};
