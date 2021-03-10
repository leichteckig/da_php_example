// Some kind of frame of your test, providing structure
describe('Test cookie banner', () => {

    // Chat driven example on how to write a basic cypress test

    // Your actual test
    it('should work', () => {
        cy.visit('/');

        cy.get('.hide-button').click();
        cy.get('.js-cookie-configuration-button').click();
        cy.get('.offcanvas').should('be.visible');
        cy.get('.loader').should('not.exist');

        cy.contains('Save').should('be.visible');
        cy.contains('Save').click();
    });
});