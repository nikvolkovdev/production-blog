import { ReactNode, useEffect } from 'react';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { Reducer } from '@reduxjs/toolkit';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
    [nameKey in StateSchemaKey]?: Reducer;
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
        Object.entries(reducers).forEach(([keyName, reducer]) => {
            store.reducerManager.add(keyName as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${keyName} reducer` });
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