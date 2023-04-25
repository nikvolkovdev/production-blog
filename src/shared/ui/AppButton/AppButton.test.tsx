import { render, screen } from '@testing-library/react';
import { AppButton, ButtonVariant } from './AppButton';

describe('AppButton', () => {
    test('render AppButton', () => {
        render(<AppButton buttonType="button">Test</AppButton>);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    test('render AppButton with clear theme', () => {
        render(<AppButton buttonType="button" variant={ButtonVariant.CLEAR}>Test</AppButton>);
        expect(screen.getByText('Test')).toHaveClass('clear');
    });
});
