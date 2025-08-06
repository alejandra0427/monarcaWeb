describe('Pruebas en la Página de Inicio', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/inicioPage/inicioPage.html'); 
  });

  it('Carga correctamente los botones de categorías', () => {
    cy.get('#btnCerveza').should('exist');
    cy.get('#btnAguardiente').should('exist');
    cy.get('#btnRon').should('exist');
    cy.get('#btnCar').should('contain', '🛒');
    cy.get('#regresar').should('contain', '⬅️ Regresar');
  });

  it('Incrementa y decrementa la cantidad del producto', () => {
    cy.get('#numeroContador').clear().type('1');
    cy.get('#incrementar').click();
    cy.get('#numeroContador').should('have.value', '2');
    cy.get('#decrementar').click();
    cy.get('#numeroContador').should('have.value', '1');
  });
});