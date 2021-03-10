// Frame of the test
describe('Add product to cart', () => {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');
    })

    // Test without waiting: Ok, but prone to flakyness
    it('should add product to cart - in ok', () => {
        cy.intercept({
            url: '/widgets/checkout/info',
            method: 'GET'
        }).as('checkoutAvailable');

        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Linen Columbo Gumbo').click();

        // Verify product and add it to cart
        cy.get('.product-detail-name').contains('Aerodynamic Linen Columbo Gumbo');
        cy.contains('.btn', 'Add to shopping cart').click();
        cy.get('.offcanvas').should('be.visible');

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Linen Columbo Gumbo');
        cy.wait('@checkoutAvailable').its('response.statusCode').should('equal', 200);
    });
});