describe('Elements inner text', () => {
  const html1 =
    '<div id="test"><span>1</span><span>2</span><span>3</span></div>';
  const html2 =
    '<div class="demo"><span>3</span><span>2</span><span>1</span></div>';

  const runCy = (() => {
    let i = 0;
    return (htmlString, fn) => {
      const tempHtmlName = `temp_${i++}.html`;
      return cy.writeFile(tempHtmlName, htmlString).then(() => {
        cy.visit(tempHtmlName);
        fn();
      });
    };
  })();

  const getJqueryElementsText = selector =>
    cy.get(selector).then($elem =>
      $elem
        .toArray()
        .map(elem => elem.innerText)
        .sort(),
    );

  it('Should have same text (order agnostic)', () => {
    runCy(html1, () => getJqueryElementsText('#test span')).then(
      html1SpanText => {
        runCy(html2, () =>
          getJqueryElementsText('.demo span').then(html2SpanText => {
            expect(html1SpanText).to.deep.equal(html2SpanText);
          }),
        );
      },
    );
  });
});
