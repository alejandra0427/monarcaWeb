window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('usercompartido');
    
    if (userId) {
        cargarCarrito(userId);
    } else {
        mostrarError('No se encontró usuario. Redirigiendo...');
        setTimeout(() => window.location.href = '/login', 2000);
    }
});

async function cargarCarrito(userId) {
    const carritoContainer = document.getElementById('contenedor');
    carritoContainer.innerHTML = '<p>Cargando carrito...</p>';

    try {
        const response = await fetch(`http://localhost:3000/carro/${userId}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Error al cargar');
        
        if (data.success) {
            renderizarCarrito(data);
        } else {
            mostrarCarritoVacio();
        }
    } catch (error) {
        mostrarError(error.message);
    }
}

function renderizarCarrito(data) {
    const carritoContainer = document.getElementById('contenedor');
    
    let html = `
        ${data.items.map(item => `
            <div id="contenedorCarro">
                <img id="imgProducto" src="${item.imagen_producto}" alt="${item.nombre_producto}">
                <h3>${item.nombre_producto}</h3>
                <p>Cantidad: ${item.cantidad_productos}</p>
                <p>Precio unitario: $${item.valor_pedido}</p>
                <p>Total: $${item.total_item}</p>
                <button id="btnEliminarProducto" data-id="${item.id_compra}">❌</button>
            </div>
        `).join('')}
        <div class="resumen-carrito">
            <h3>Resumen</h3>
            <p>Productos: ${data.summary.count_items}</p>
            <p>Total: $${data.summary.total}</p>
            <button id="comprar">COMPRAR</button>
        </div>
    `;
    
    carritoContainer.innerHTML = html;
    document.getElementById('comprar').addEventListener('click', () => finalizarCompra(data.items));
    
    // Configurar eventos para eliminar
    setupEliminarHandlers();
}

function setupEliminarHandlers() {
    const botonesEliminar = document.querySelectorAll('#btnEliminarProducto');
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', async function() {
            const idCompra = this.getAttribute('data-id');
            const userId = new URLSearchParams(window.location.search).get('usercompartido');
            
            if (!confirm('¿Seguro que quieres eliminar este producto?')) {
                return;
            }

            try {
                // Mostrar carga
                this.textContent = 'Eliminando...';
                this.disabled = true;
                
                const response = await fetch(`http://localhost:3000/carro/${idCompra}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) {
                    throw new Error('Error al eliminar');
                }
                
                // Recargar el carrito
                cargarCarrito(userId);
                
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo eliminar el producto');
                
                // Restaurar botón
                this.textContent = '❌';
                this.disabled = false;
            }
        });
    });
}

function mostrarCarritoVacio() {
    document.getElementById('contenedor').innerHTML = `
        <div class="carrito-vacio">
            <img src="img/empty-cart.png" alt="Carrito vacío">
            <h2>Tu carrito está vacío</h2>
            <a href="/productos">Ver productos</a>
        </div>
    `;
}


function mostrarError(mensaje) {
    document.getElementById('container').innerHTML = `
        <div class="error-carrito">
            <p>❌ ${mensaje}</p>
        </div>
    `;
}


