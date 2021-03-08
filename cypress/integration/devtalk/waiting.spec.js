// Frame of the test
describe('Add product to cart', () => {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');
    })

    // Test without waiting: Ok, but prone to flakyness
    it.skip('should add product to cart - in ok', () => {
        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Bronze Gee Spotty').click();

        // Verify product and add it to cart
        cy.get('.product-detail-name').contains('Aerodynamic Bronze Gee Spotty');
        cy.contains('.btn', 'Add to shopping cart').click();

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Bronze Gee Spotty');
    });

    // This test uses various, dynamic waiting times
    it('should add product to cart - in better', () => {
        cy.intercept({
            url: '/widgets/checkout/info',
            method: 'GET'
        }).as('checkoutAvailable');

        // Find and click product
        cy.get('.cms-element-product-listing').should('be.visible');
        cy.contains('.product-name', 'Aerodynamic Bronze Gee Spotty').click();

        // Verify product and add it to cart
        cy.get('.product-detail-name').contains('Aerodynamic Bronze Gee Spotty');
        cy.contains('.btn', 'Add to shopping cart').click();
        cy.get('.offcanvas').should('be.visible');

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Bronze Gee Spotty');
        cy.wait('@checkoutAvailable').its('response.statusCode').should('equal', 200);
    });
});