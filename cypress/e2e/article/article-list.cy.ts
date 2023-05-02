describe('User get Articles page', () => {
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles');
        });
    });
    it('loaded successful', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.lengthOf.greaterThan', 3);
    });
});
