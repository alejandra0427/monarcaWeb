window.addEventListener('load', () => {
    const email = document.getElementById('email');
    const boton = document.getElementById('botonGuardar');

    boton.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/usuarios');
            const data = await response.json();

            const usuarioExiste = data.find(usuario => usuario.email === email.value.trim());

            if (usuarioExiste) {
                
                mostrarMensaje('Enviamos recuperación de contraseña a su correo.', true);
            } else {
                mostrarMensaje('Correo no registrado en el sistema.', false);
            }

        } catch (err) {
            console.error('Error al consultar usuarios', err);
            mostrarMensaje('Error en el servidor. Intenta más tarde.', false);
        }
    });

    function mostrarMensaje(texto, esExito) {
        let mensaje = document.getElementById('mensaje');

        if (!mensaje) {
            mensaje = document.createElement('div');
            mensaje.id = 'mensaje';
            mensaje.style.textAlign = 'center';
            mensaje.style.marginTop = '20px';
            document.querySelector('.container').appendChild(mensaje);
        }

        mensaje.textContent = texto;
        mensaje.style.color = esExito ? 'green' : 'red';
        mensaje.style.display = 'block';

        setTimeout(() => {
            mensaje.style.display = 'none';
        }, 5000);
    }
});
