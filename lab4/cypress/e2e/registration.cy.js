describe('OpenCart - Registration Tests', () => {

    it('should register a new user', () => {

        cy.fixture('openCartData').then((data) => {
            cy.visit(data.baseUrl + '/index.php?route=account/register');

            const uniqueEmail = `student${Date.now()}@example.com`;

            cy.get('input[name="firstname"]').type(data.user.firstname);
            cy.get('input[name="lastname"]').type(data.user.lastname);
            cy.get('input[name="email"]').type(uniqueEmail);
            cy.get('input[name="password"]').type(data.user.password);

            cy.get('input[name="agree"]')
                .should('exist')
                .check()
                .should('be.checked');

            cy.get('button[type="submit"]').click();

            cy.url().should('include', 'route=account/success');
        });

    });

});