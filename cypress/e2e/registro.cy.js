describe('Pruebas del Formulario de Registro', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/registro/registro.html'); 
  });

  it('Carga correctamente la página de registro', () => {
    cy.get('.formulario').should('exist');
  });

  it('Campos del formulario deben existir', () => {
    cy.get('#name').should('exist');
    cy.get('#cedula').should('exist');
    cy.get('#email').should('exist');
    cy.get('#direccion').should('exist');
    cy.get('#contraseña').should('exist');
    cy.get('#botonEnviar').should('exist');
  });

  it('Debe permitir llenar el formulario', () => {
    cy.get('#name').type('Juan Pérez');
    cy.get('#cedula').type('123456789');
    cy.get('#email').type('juan@example.com');
    cy.get('#direccion').type('Calle 123');
    cy.get('#contraseña').type('secreta123');
  });

  it('Debe permitir hacer clic en Enviar', () => {
    cy.get('#botonEnviar').click();
    
  });
});
