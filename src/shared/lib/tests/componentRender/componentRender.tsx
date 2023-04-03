import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { DeepPartial } from '@reduxjs/toolkit';

export interface componentRenderOptions {
    route?: string;
    initialState?: DeepPartial<StateSchema>;
}

export function componentRender(component: ReactNode, options: componentRenderOptions = {}) {
    const {
        route = '/',
        initialState,
    } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initialState={initialState as StateSchema}>
                {component}
            </StoreProvider>
        </MemoryRouter>,
    );
}
