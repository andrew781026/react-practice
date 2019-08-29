/// <reference types="Cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3003/fee/fee010407m')
    });

    // https://on.cypress.io/interacting-with-elements

    it('.type() - type into a DOM element', () => {

        // 輸入生效日期 : 2018/02/03
        cy.get('input[type=text]').eq(2).type('03{leftarrow}');
        cy.wait(1000);
        cy.get('input[type=text]').eq(2).type('02{leftarrow}');
        cy.wait(1000);
        cy.get('input[type=text]').eq(2).type('2018');

        // 點擊查詢按鈕
        cy.get('#feeTaskBar > button').eq(0).click();

        // 點擊新增按鈕
        cy.get('#feeTaskBar > button').eq(1).click();

        cy.get('input[type=text]').eq(0).type('AWS');

    });

});
