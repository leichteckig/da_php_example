// Frame of the test
describe('Add product to cart', () => {
    // Hook to be executed before every test
    beforeEach(() => {
        cy.visit('/');
    })

    // Actual test
    it('should add product to cart - no', () => {
        const productName = cy.get('.product-detail-name');

        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Bronze Gee Spotty').click();

        // Verify product and add it to cart
        productName.contains('Aerodynamic Bronze Gee Spotty');

        // Verify cart
        cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
        cy.get('.cart-item-label').contains('Aerodynamic Bronze Gee Spotty');
    });

    // Actual test
    it('should add product to cart - in ok', () => {
        // Find and click product
        cy.contains('.product-name', 'Aerodynamic Bronze Gee Spotty').click();

        cy.get('.product-detail-name').then(($productName) => {

            // Verify product and add it to cart
            expect($productName.text()).to.contain('Aerodynamic Bronze Gee Spotty');
            cy.contains('.btn', 'Add to shopping cart').click();

            // Verify cart
            cy.get('.flashbags > .alert').contains('1 product has been added to the shopping cart.');
            cy.get('.cart-item-label').contains('Aerodynamic Bronze Gee Spotty');
        })
    });
});