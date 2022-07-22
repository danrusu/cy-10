describe('Iframe POC', () => {
  const getIframeBody = (iframeCssSelector, { timeout }) =>
    cy
      .get(iframeCssSelector, { timeout })
      .should($iframe => {
        expect($iframe).to.have.lengthOf(1);
        expect($iframe[0].contentDocument.body).to.not.be.empty;
      })
      .its('0.contentDocument.body')
      .then(cy.wrap);

  it('Iframe test', () => {
    cy.visit('https://ancabota09.wixsite.com/intern');

    getIframeBody('iframe[title="Wix Hotels"]', { timeout: 10000 })
      .find('.search button')
      .then($button => {
        cy.log($button.text());
      })
      .click();
  });
});
