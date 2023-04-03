import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';
import { componentRender } from '../../../../shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('render Sidebar', () => {
        componentRender(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('toggle Sidebar', () => {
        componentRender(<Sidebar />);
        const toggle = screen.getByTestId('toggle-sidebar');
        fireEvent.click(toggle);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
