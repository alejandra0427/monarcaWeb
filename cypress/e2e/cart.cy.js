describe('Pruebas del Carrito de Compras', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:63875/cart/cart.html'); 
  });

  it('Carga correctamente la página del carrito', () => {
    cy.get('#container').should('exist');
  });

  it('Muestra el logo de La Monarca', () => {
    cy.get('#cajaImg')
      .should('exist')
      .and('have.attr', 'src')
      .and('include', 'monarca1.jpg');
  });

  it('Tiene contenedor para los productos del carrito', () => {
    cy.get('#contenedor').should('exist').and('be.empty'); // Aquí puedes luego comprobar cuando cargue dinámicamente
  });

  // Test opcional si tu JS carga productos dinámicamente (puedes simularlo así)
  it('Simula agregar un producto al contenedor', () => {
    cy.get('#contenedor').then(($div) => {
      $div.append('<div class="producto">Cerveza Poker</div>');
    });

    cy.get('.producto').should('contain.text', 'Cerveza Poker');
  });
});
