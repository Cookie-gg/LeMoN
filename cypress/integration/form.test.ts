describe('Form', () => {
  it('should send owner e-mail a message', () => {
    cy.visit('/contact');

    cy.fixture('contact.json').then((json) => {
      Object.keys(json).map((key) => {
        cy.get(`[name=${key}]`).type(json[key]);
      });
    });
    cy.get('[type="submit"]').click();

    cy.get('[class*="complete"][class*="visible"]', { timeout: 60000 })
      .should('be.visible')
      .then(() => {
        cy.get('[class*="complete"][class*="visible"] a[href="/"]', { timeout: 600 }).click();
      });
  });
});
