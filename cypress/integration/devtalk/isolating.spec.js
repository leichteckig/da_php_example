// Frame of the test
describe('Add product to cart', () => {
    // Hook to be executed before every test, add later
    beforeEach(() => {
        // This one is commented out because we just need it for the ok example
        // cy.visit('/account');

        // For the better way, we need to add this one
        cy.login('test@example.com', 'shopware');
        cy.visit('/');
    })

    // You should never rely on other previous tests!
    it.skip('should login - nah!', () => {
        cy.get('#loginMail').type('test@example.com');
        cy.get('#loginPassword').type('shopware');
        cy.get('.login-submit [type="submit"]').click();
    });

    it.skip('should login and add product to cart - in ok', () => {
        cy.get('.account-welcome h1').should((element) => {
            expect(element).to.contain('Overview');
        });
        cy.get('.home-link').should('be.visible');
        cy.get('.home-link').contains('Home').click();

        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Bronze Gee Spotty').click();

        // Verify product and add it to cart
        cy.get('.product-detail-name').contains('Aerodynamic Bronze Gee Spotty');
        cy.contains('.btn', 'Add to shopping cart').click();

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Bronze Gee Spotty');
    });

    // We only test the one workflow we want to test, keeping our tests simple
    it('should login and add product to cart - in better', () => {
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