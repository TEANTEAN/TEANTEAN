import * as React from 'react'
import { mount } from "@cypress/react";
import Footer from 'components/PublicNavigation/Footer';

describe('Footer', () => {
  // Look for an element that links to /login
  it('Check login link', () => {
    mount(<Footer />);
    cy.get("[href='/login']");
  })
})
