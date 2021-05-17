/// <reference types="cypress" />

context('Buttons', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/buttons');
    });

    it('Check basic button', () => {
        cy.contains('Basic Button');
    });
});
