window.addEventListener('load', () => {

    console.log('funcionando');



    const contenedorCervezas = document.getElementById('contenedorCervezas');
    const contenedorAguardiente = document.getElementById('contenedorAguardiente');
    const contenedorRon = document.getElementById('contenedorRon');
    const contenedorTequila = document.getElementById('contenedorTequila');
    const contenedorWhisky = document.getElementById('contenedorWhisky');
    const contenedorVodka = document.getElementById('contenedorVodka');
    const contenedorVino = document.getElementById('contenedorVino');
    const contenedorCocteles = document.getElementById('contenedorCocteles');
    const contenedorOtrosLicores =document.getElementById('contenedorOtrosLicores');
    const contenedorConfiteria = document.getElementById('contenedorConfiteria');


    const cajaInformacion = document.getElementById('cajaInformacion');
    const cajaDetalleProducto = document.getElementById('cajaDetalleProducto');
    const btnCerveza = document.getElementById('btnCerveza');
    const btnAguardiente = document.getElementById('btnAguardiente');
    const btnRon = document.getElementById('btnRon');
    const btnTequila = document.getElementById('btnTequila');
    const btnWhisky = document.getElementById('btnWhisky');
    const btnVodka = document.getElementById('btnVodka');
    const btnVino = document.getElementById('btnVino');
    const btnCocteles = document.getElementById('btnCocteles');
    const btnOtrosLicores = document.getElementById('btnOtrosLicores');
    const btnConfiteria = document.getElementById('btnConfiteria');

    function closeModal() {

        cajaInformacion.style.display = 'none';
    }

    function openModal() {

        cajaInformacion.style.display = 'flex';
    }

    async function carga() {

        try {
            const response = await fetch('http://localhost:3000/productos');
            const data = await response.json();

            for (const producto of data) {

                if (String(producto.tipo_producto) === "Cerveza") {

                    const cajaCerveza = document.createElement('div');
                    cajaCerveza.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaCerveza.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaCerveza.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaCerveza.appendChild(precio);


                    contenedorCervezas.appendChild(cajaCerveza);

                    const copiaCajaCerveza = cajaCerveza.cloneNode(true)

                    cajaCerveza.addEventListener('click', () => {

                        openModal();



                        cajaDetalleProducto.appendChild(copiaCajaCerveza);


                    });

                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaDetalleProducto.removeChild(copiaCajaCerveza);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Aguardiente') {


                    const cajaAguardiente = document.createElement('div');
                    cajaAguardiente.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaAguardiente.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaAguardiente.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaAguardiente.appendChild(precio);

                    contenedorAguardiente.appendChild(cajaAguardiente);

                } else if (String(producto.tipo_producto) === 'Ron') {


                    const cajaRon = document.createElement('div');
                    cajaRon.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaRon.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaRon.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaRon.appendChild(precio);

                    contenedorRon.appendChild(cajaRon);

                } else if (String(producto.tipo_producto) === 'Tequila') {


                    const cajaTequila = document.createElement('div');
                    cajaTequila.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaTequila.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaTequila.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaTequila.appendChild(precio);

                    contenedorTequila.appendChild(cajaTequila);

                } else if (String(producto.tipo_producto) === 'Whisky') {


                    const cajaWhisky = document.createElement('div');
                    cajaWhisky.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaWhisky.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaWhisky.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaWhisky.appendChild(precio);

                    contenedorWhisky.appendChild(cajaWhisky);

                } else if (String(producto.tipo_producto) === 'Vodka') {


                    const cajaVodka = document.createElement('div');
                    cajaVodka.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaVodka.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaVodka.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaVodka.appendChild(precio);

                    contenedorVodka.appendChild(cajaVodka);

                } else if (String(producto.tipo_producto) === 'Vino') {


                    const cajaVino = document.createElement('div');
                    cajaVino.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaVino.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaVino.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaVino.appendChild(precio);

                    contenedorVino.appendChild(cajaVino);

                } else if (String(producto.tipo_producto) === 'Cocteles') {


                    const cajaCocteles = document.createElement('div');
                    cajaCocteles.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaCocteles.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaCocteles.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaCocteles.appendChild(precio);

                    contenedorCocteles.appendChild(cajaCocteles);

                }else if (String(producto.tipo_producto) === 'Otros Licores') {


                    const cajaOtrosLicores = document.createElement('div');
                    cajaOtrosLicores.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                   cajaOtrosLicores.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaOtrosLicores.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaOtrosLicores.appendChild(precio);

                    contenedorOtrosLicores.appendChild(cajaOtrosLicores);

                }else if (String(producto.tipo_producto) === 'Confiteria') {


                    const cajaConfiteria = document.createElement('div');
                    cajaConfiteria.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                   cajaConfiteria.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaConfiteria.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaConfiteria.appendChild(precio);

                   contenedorConfiteria.appendChild(cajaConfiteria);
                }



            }


        } catch (err) {
            console.log('Error data', err);


        }
    }

    carga();

    btnCerveza.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
       





        contenedorCervezas.classList.remove('inactive');
        contenedorCervezas.classList.add('contenedorProductos');



    });


    btnAguardiente.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorAguardiente.classList.remove('inactive');
        contenedorAguardiente.classList.add('contenedorProductos');

    });

    btnRon.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorRon.classList.remove('inactive');
        contenedorRon.classList.add('contenedorProductos');

    });

    btnTequila.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorTequila.classList.remove('inactive');
        contenedorTequila.classList.add('contenedorProductos');

    });

    btnWhisky.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorWhisky.classList.remove('inactive');
        contenedorWhisky.classList.add('contenedorProductos');

    });

    btnVodka.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorVodka.classList.remove('inactive');
        contenedorVodka.classList.add('contenedorProductos');

    });

    btnVino.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorVino.classList.remove('inactive');
        contenedorVino.classList.add('contenedorProductos');

    });

    btnCocteles.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorCocteles.classList.remove('inactive');
        contenedorCocteles.classList.add('contenedorProductos');

    });

    btnOtrosLicores.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('inactive');
        contenedorOtrosLicores.classList.add('contenedorProductos');

    });

    btnConfiteria.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('click');

        contenedorCervezas.classList.remove('contenedorProductos');
        contenedorCervezas.classList.add('inactive');
        contenedorRon.classList.remove('contenedorProductos');
        contenedorRon.classList.add('inactive');
        contenedorAguardiente.classList.remove('contenedorProductos');
        contenedorAguardiente.classList.add('inactive');
        contenedorTequila.classList.remove('contenedorProductos');
        contenedorTequila.classList.add('inactive');
        contenedorWhisky.classList.remove('contenedorProductos');
        contenedorWhisky.classList.add('inactive');
        contenedorVodka.classList.remove('contenedorProductos');
        contenedorVodka.classList.add('inactive');
        contenedorVino.classList.remove('contenedorProductos');
        contenedorVino.classList.add('inactive');
        contenedorCocteles.classList.remove('contenedorProductos');
        contenedorCocteles.classList.add('inactive');
        contenedorOtrosLicores.classList.remove('contenedorProductos');
        contenedorOtrosLicores.classList.add('inactive');
        
        contenedorConfiteria.classList.remove('inactive');
        contenedorConfiteria.classList.add('contenedorProductos');

    });




});