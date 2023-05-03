import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line my-import-paths-check/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
// eslint-disable-next-line my-import-paths-check/layer-imports
import '@/app/styles/index.scss';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
    theme?: Theme;
}

interface TestProviderProps {
    children: ReactNode;
    options?: componentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
    const { children, options = {} } = props;

    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options;

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState as StateSchema}>
                <ThemeProvider>
                    <div className={`app ${theme}`}>
                        {children}
                    </div>
                </ThemeProvider>
            </StoreProvider>
        </MemoryRouter>
    );
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    return render(
        <TestProvider options={options}>{component}</TestProvider>,
    );
}
