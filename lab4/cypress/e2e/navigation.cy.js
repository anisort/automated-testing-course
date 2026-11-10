describe('OpenCart - Navigation Tests', () => {

    it('should open all required pages', () => {

        cy.fixture('openCartData').then((data) => {
            data.pages.forEach((page) => {
                cy.visit(data.baseUrl + page.url);
                cy.get('body').should('be.visible');
                cy.checkPageText(page.expectedText);
            });
        });

    });

});