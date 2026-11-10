describe('Math Automation Test', () => {

    it('should solve the math problem and submit the form', () => {

        cy.fixture('mathData').then((data) => {
            cy.visit(data.url);

            cy.window().then((win) => {
                cy.stub(win, 'alert').as('successAlert');
            });

            cy.solveMathProblem(data.multiplier);

            cy.get('#robotCheckbox').check();

            cy.get('#robotsRule').check();

            cy.get('button[type="submit"]').click();

            cy.get('@successAlert')
                .should('have.been.calledOnce')
                .its('firstCall.args.0')
                .should('contain', 'Congrats');
        });

    });

});