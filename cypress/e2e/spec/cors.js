before(() => {
  cy.log('before');
});

beforeEach(() => {
  cy.log('before each');
});

describe('suite1', () => {
  //
  it('Should navigate to domain1', () => {
    let cookie;

    cy.origin('http://qatools.ro', () => {
      cy.visit('/');

      cy.getCookies().then(c => cy.log(`cookies ${JSON.stringify(c)}`)); // bug - no cookies here
      return cy.getCookie('auth');
    }).then(c => {
      cy.log(`cookie from cy.origin: ${c}`);
      cookie = c.value;
    });

    cy.session('qatools', () => {
      cy.log(`cookie= ${cookie}`);
      cy.setCookie('session_id', cookie);
    });
  });

  it('Should navigate to domain2 and use cookie from domain1', () => {
    cy.session('qatools');
    cy.visit('https://go-gin-todo.herokuapp.com');
    cy.getCookie('session_id').then(({ value }) => cy.log(value));
  });
});
