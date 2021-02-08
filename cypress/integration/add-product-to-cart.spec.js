// Frame of the test
describe('Add product to cart', () => {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');
    })

    // Actual test
    it('should add product to cart', () => {
        cy.intercept({
            url: '/widgets/checkout/info',
            method: 'GET'
        }).as('checkoutAvailable');

       // Find and click product
       cy.get('.cms-element-product-listing').should('be.visible');
       cy.contains('.product-name', 'Aerodynamic Wool Flying Edge').click();

       // Verify product and add it to cart
       cy.get('.product-detail-name').contains('Aerodynamic Wool Flying Edge');
       cy.contains('.btn', 'Add to shopping cart').click();
       cy.get('.offcanvas').should('be.visible');

        // Verify cart
       cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
       cy.get('.cart-item-label').contains('Aerodynamic Wool Flying Edge');
       cy.wait('@checkoutAvailable').its('response.statusCode').should('equal', 200);
    });
});