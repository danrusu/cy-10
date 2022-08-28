describe('Elements inner text', () => {
  const html1 = '<div><span>1</span><span>2</span><span>3</span></div>';
  const html2 = '<div><span>3</span><span>2</span><span>1</span></div>';

  const runCy = (htmlString, fn) =>
    cy.writeFile('temp.html', htmlString).then(() => {
      cy.visit('temp.html');
      fn();
    });

  const getJqueryElementsText = selector =>
    cy.get(selector).then($elem =>
      $elem
        .toArray()
        .map(elem => elem.innerText)
        .sort(),
    );

  it('Should have same text (order agnostic)', { baseUrl: undefined }, () => {
    runCy(html1, () => getJqueryElementsText('span')).then(html1SpanText => {
      runCy(html2, () =>
        getJqueryElementsText('span').then(html2SpanText => {
          expect(html1SpanText).to.deep.equal(html2SpanText);
        }),
      );
    });
  });
});
