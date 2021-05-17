/// <reference types="cypress" />

context('Forms', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/form');
    });

    it('Check submit button', () => {
        cy.contains('Submit').click();
    });
});
