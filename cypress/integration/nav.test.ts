describe('Navigation', () => {
  it('should navigate pages (about, works, blog, contact) from header', () => {
    cy.visit('/');

    // wait header available
    cy.wait(2500);

    cy.get('header').click();

    ['about', 'works', 'blog', 'contact'].forEach((value) => {
      cy.get('header').get(`a[href*="${value}"]`).click();
      cy.waitUntil(() => cy.url().should('include', `/${value}`));
    });
  });
});
