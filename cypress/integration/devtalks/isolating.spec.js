// Frame of the test
describe('Add product to cart', () => {
    beforeEach(() => {
        // First: Implement clean up

        // Second: Take care of preparations like test data or API shortcuts (e.g. login)

        cy.visit('/account');

        cy.login('test@example.com', 'shopware');
    });

    it('should login and add product to cart', () => {
        cy.get('.home-link').should('be.visible');
        cy.get('.home-link').contains('Home').click();

        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Linen Columbo Gumbo').click();

        // Verify product and add it to cart
        cy.get('.product-detail-name').contains('Aerodynamic Linen Columbo Gumbo');
        cy.contains('.btn', 'Add to shopping cart').click();

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Linen Columbo Gumbo');
    });
});