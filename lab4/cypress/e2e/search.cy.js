describe('OpenCart - Search Tests', () => {

    it('should search for a product', () => {

        cy.fixture('openCartData').then((data) => {
            cy.visit(data.baseUrl);

            cy.get('input[name="search"]')
                .should('be.visible')
                .type(data.product.search);

            cy.get('#search button').click();

            cy.url().should('include', 'route=product/search');

            cy.get('body').should('contain.text', data.product.search);
        });

    });

});