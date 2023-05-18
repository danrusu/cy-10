describe('Graphql test', () => {
  beforeEach(() => {
    cy.visit('cypress/angular.html');
  });

  it('counts <datatable-header-cell> tags', () => {
    cy.get('datatable-header-cell').should('have.lengthOf', 5);

    cy.get('[data-cy="approval-detail-table-transactionno-column-header"]')
      .parents('datatable-header-cell')
      .prevAll('datatable-header-cell')
      .should('have.lengthOf', 3);

    cy.get('[data-cy="approval-detail-table-transactionno-column-header"]')
      .parents('datatable-header-cell')
      .nextAll('datatable-header-cell')
      .should('have.lengthOf', 1);
  });

  it('counts previous <datatable-header-cell> tags via JS', () => {
    cy.get('datatable-header-cell').then($headers => {
      const index = [...$headers].findIndex(
        header =>
          header.querySelectorAll(
            '[data-cy="approval-detail-table-transactionno-column-header"]',
          ).length == 1,
      );
      cy.log(index);
    });
  });
});
