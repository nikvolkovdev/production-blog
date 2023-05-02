import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('User is unauthorized', () => {
        it('Main Page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Profile Page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('MainPage')).should('exist');
        });
        it('Not Found Page', () => {
            cy.visit('/dasdasdsda');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User is authorized', () => {
        beforeEach(() => {
            cy.login('testuser', '123');
        });

        it('Profile Page', () => {
            cy.visit('/profile/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });
        it('Articles Page', () => {
            cy.visit('/articles');
            cy.get(selectByTestId('ArticlesPage')).should('exist');
        });
    });
});
