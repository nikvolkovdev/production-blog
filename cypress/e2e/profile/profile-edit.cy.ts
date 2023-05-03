let profileId: string;

describe('User gets profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('loaded successful', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'nik');
    });

    it('edit profile', () => {
        const newFirstName = 'new';
        const newLastName = 'lastname';
        cy.updateProfile(newFirstName, newLastName);
        cy.getByTestId('ProfileCard.firstname').should(
            'have.value',
            newFirstName,
        );
        cy.getByTestId('ProfileCard.lastname').should(
            'have.value',
            newLastName,
        );
    });
});
