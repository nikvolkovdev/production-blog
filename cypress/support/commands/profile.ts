export const updateProfile = (firstname: string, lastname: string) => {
    cy.get('[data-testid="EditableProfileCardHeader.EditButton"]').click();
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname);
    cy.get('[data-testid="EditableProfileCardHeader.SaveButton"]').click();
};

export const resetProfile = (profileId: string) => {
    cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { authorization: 'dasd' },
        body: {
            id: '4',
            firstname: 'nik',
            lastname: 'ssadas',
            age: 465,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow',
            username: 'Test User',
            avatar: 'https://cs13.pikabu.ru/post_img/big/2023/02/13/8/1676295806122712757.png',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
