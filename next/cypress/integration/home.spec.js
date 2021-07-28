/// <reference types="cypress" />

context('Home', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Check title', () => {
        cy.contains('genyus');
    });
});
