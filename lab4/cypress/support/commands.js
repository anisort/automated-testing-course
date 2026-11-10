Cypress.Commands.add('solveMathProblem', (multiplier) => {
    cy.get('#input_value').invoke('text').then((text) => {
        const x = Number(text);
        const result = Math.log(Math.abs(multiplier * Math.sin(x)));

        cy.get('#answer').type(String(result));
    });
});

Cypress.Commands.add('checkPageText', (expectedText) => {
    cy.get('body').should('contain.text', expectedText);
});