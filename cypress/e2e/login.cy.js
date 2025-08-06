describe('Pruebas de la Página de Login', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/login/login.html'); 
  });

  it('Carga correctamente el formulario', () => {
    cy.get('#email').should('exist');
    cy.get('#password').should('exist');
    cy.get('#botonIniciar').should('exist');
  });

  it('Permite escribir en los campos de email y contraseña', () => {
    cy.get('#email').type('ejemplo@correo.com').should('have.value', 'ejemplo@correo.com');
    cy.get('#password').type('MiContraseña123').should('have.value', 'MiContraseña123');
  });

  it('El botón de crear cuenta redirige correctamente', () => {
    cy.get('.boton2 a').should('have.attr', 'href', '../registro/registro.html');
  });

  it('El enlace de recuperar contraseña funciona', () => {
    cy.contains('olvidaste tu Contraseña').find('a').should('have.attr', 'href', '../recoveryPassword/recoveryPassword.html');
  });
});