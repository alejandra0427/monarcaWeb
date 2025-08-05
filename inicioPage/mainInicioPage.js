window.addEventListener('load', () => {




    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('usercompartido');

    if (userId) {
        console.log('Usuario Actualmente en sesión:', userId);

    }



    const contenedorCervezas = document.getElementById('contenedorCervezas');
    const contenedorAguardiente = document.getElementById('contenedorAguardiente');
    const contenedorRon = document.getElementById('contenedorRon');
    const contenedorTequila = document.getElementById('contenedorTequila');
    const contenedorWhisky = document.getElementById('contenedorWhisky');
    const contenedorVodka = document.getElementById('contenedorVodka');
    const contenedorVino = document.getElementById('contenedorVino');
    const contenedorCocteles = document.getElementById('contenedorCocteles');
    const contenedorOtrosLicores = document.getElementById('contenedorOtrosLicores');
    const contenedorConfiteria = document.getElementById('contenedorConfiteria');
    const contenedorOtrasBebidas = document.getElementById('contenedorOtrasBebidas');
    const cajaInformacion = document.getElementById('cajaInformacion');
    const cajaProductoImagen = document.getElementById('cajaProductoImagen');
    const cajaProductoInformacion = document.getElementById('cajaProductoInformacion');
    const cajaCheck = document.getElementById('cajaCheck');
    const cajaContador = document.getElementById('cajaContador');
    const precioOpcion1 = document.getElementById('precioOpcion1');
    const precioOpcion2 = document.getElementById('precioOpcion2');
    const etiquetaValor = document.getElementById('etiquetaValor');
    const numeroContador = document.getElementById('numeroContador');
    const opcion1 = document.getElementById('opcion1');
    const opcion2 = document.getElementById('opcion2');
    const op1lb = document.getElementById('op1lb');
    const op2lb = document.getElementById('op2lb');



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
    const btnOtrasBebidas = document.getElementById('btnOtrasBebidas');
    const btnIncrementar = document.getElementById('incrementar');
    const btnDecrementar = document.getElementById('decrementar');
    const btnCajaValorTotal = document.getElementById('cajaValorTotal')
    const btnCar = document.getElementById('btnCar');

    let currentIncrementHandler = null;
    let currentDecrementHandler = null;
    let currentOpcion1Handler = null;
    let currentOpcion2Handler = null;


    btnCar.addEventListener('click', () => {

        window.location.href = `../cart/cart.html?usercompartido=${userId}`;
    });



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

            let productoSeleccionado = null;
            let etiquetaValorNumerico = 0;


            for (const producto of data) {

                if (String(producto.tipo_producto) === "Cerveza") {

                    const idProducto = producto.id_producto;

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
                    precio.textContent = ('$' + producto.valor_producto);
                    cajaCerveza.appendChild(precio);


                    contenedorCervezas.appendChild(cajaCerveza);

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');


                    cajaCerveza.addEventListener('click', () => {


                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Pack x 6');
                        op2lb.textContent = ('Pack x 24');




                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);



                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);



                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;

                        etiquetaValorNumerico = etiquetaValor.textContent;




                        actualizarValorTotal();





                    });

                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Aguardiente') {

                    const idProducto = producto.id_producto;

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
                    precio.textContent = ('$' + producto.valor_producto);
                    cajaAguardiente.appendChild(precio);

                    contenedorAguardiente.appendChild(cajaAguardiente);



                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');



                    cajaAguardiente.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto - (producto.valor_producto * 0.46);
                        precioOpcion2.textContent = (calculoOpcion2);



                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);



                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });





                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });



                } else if (String(producto.tipo_producto) === 'Ron') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaRon.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto - (producto.valor_producto * 0.46);
                        precioOpcion2.textContent = (calculoOpcion2);


                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);


                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });


                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });




                } else if (String(producto.tipo_producto) === 'Tequila') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');


                    cajaTequila.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto - (producto.valor_producto * 0.46);
                        precioOpcion2.textContent = (calculoOpcion2);



                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);


                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });

                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });




                } else if (String(producto.tipo_producto) === 'Whisky') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaWhisky.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto - (producto.valor_producto * 0.46);
                        precioOpcion2.textContent = (calculoOpcion2);


                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);


                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();

                    });



                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Vodka') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaVodka.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);

                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);

                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });



                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);
                        }
                    });



                } else if (String(producto.tipo_producto) === 'Vino') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaVino.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);

                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);

                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });


                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);
                        }
                    });


                } else if (String(producto.tipo_producto) === 'Cocteles') {

                    const idProducto = producto.id_producto;

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
                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaCocteles.addEventListener('click', () => {


                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Unidad');
                        op2lb.textContent = ('Pack x 6');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 6;
                        precioOpcion2.textContent = (calculoOpcion2);


                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);


                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();


                    });


                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Otros Licores') {

                    const idProducto = producto.id_producto;

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

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaOtrosLicores.addEventListener('click', () => {

                        opcion2.style.display = 'inline';
                        op2lb.style.display = 'inline';
                        precioOpcion2.style.display = 'inline';

                        op1lb.textContent = ('Una Botella 750ml');
                        op2lb.textContent = ('Media Botella 325ml');

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);

                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);

                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();




                    });


                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Confiteria') {

                    const idProducto = producto.id_producto;

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
                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaConfiteria.addEventListener('click', () => {

                        op1lb.textContent = 'Unidad';
                        op2lb.style.display = 'none';
                        opcion2.style.display = 'none';
                        precioOpcion2.style.display = 'none';

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);

                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);

                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;

                        actualizarValorTotal();




                    });

                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });


                } else if (String(producto.tipo_producto) === 'Otras Bebidas') {

                    const idProducto = producto.id_producto;

                    const cajaOtrasBebidas = document.createElement('div');
                    cajaOtrasBebidas.classList.add('productos');

                    const titulo = document.createElement('h1');
                    titulo.textContent = producto.nombre_producto;
                    cajaOtrasBebidas.appendChild(titulo);

                    const imagen = document.createElement('img');
                    const linkImagen = producto.imagen_producto;
                    imagen.src = linkImagen;
                    imagen.width = '200'
                    cajaOtrasBebidas.appendChild(imagen);

                    const precio = document.createElement('h2');
                    precio.textContent = producto.valor_producto;
                    cajaOtrasBebidas.appendChild(precio);

                    contenedorOtrasBebidas.appendChild(cajaOtrasBebidas);

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');

                    cajaOtrasBebidas.addEventListener('click', () => {



                        op1lb.textContent = 'Unidad';
                        op2lb.style.display = 'none';
                        opcion2.style.display = 'none';
                        precioOpcion2.style.display = 'none';

                        if (currentIncrementHandler) {
                            btnIncrementar.removeEventListener('click', currentIncrementHandler);
                        }
                        if (currentDecrementHandler) {
                            btnDecrementar.removeEventListener('click', currentDecrementHandler);
                        }
                        if (currentOpcion1Handler) {
                            opcion1.removeEventListener('click', currentOpcion1Handler);
                        }
                        if (currentOpcion2Handler) {
                            opcion2.removeEventListener('click', currentOpcion2Handler);
                        }
                        numeroContador.value = '1';

                        openModal();

                        copiaImagen.style.width = '400px';
                        copiaImagen.style.heigth = '400px';
                        cajaProductoImagen.appendChild(copiaImagen);
                        cajaProductoInformacion.appendChild(copiaTitulo);
                        cajaProductoInformacion.appendChild(linea);
                        cajaProductoInformacion.appendChild(copiaPrecio);
                        cajaProductoInformacion.appendChild(cajaCheck);
                        cajaCheck.style.display = 'block';
                        cajaProductoInformacion.appendChild(cajaContador);
                        cajaContador.style.display = 'flex'

                        precioOpcion1.textContent = (producto.valor_producto);
                        const calculoOpcion2 = producto.valor_producto * 4;
                        precioOpcion2.textContent = (calculoOpcion2);

                        etiquetaValor.textContent = ('Agregar $' + producto.valor_producto);

                        function actualizarValorTotal() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = producto.valor_producto * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        function actualizarValorTotalOp2() {

                            const cantidad = parseInt(numeroContador.value) || 0;
                            const nuevoTotal = calculoOpcion2 * cantidad;
                            etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                        }

                        const handleIncrement = () => {
                            numeroContador.value = parseInt(numeroContador.value) + 1;
                            opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                        const handleDecrement = () => {
                            let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 1) {
                                numeroContador.value = valorActual - 1;
                                opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                            }
                        };

                        currentIncrementHandler = handleIncrement;
                        currentDecrementHandler = handleDecrement;
                        currentOpcion1Handler = actualizarValorTotal;
                        currentOpcion2Handler = actualizarValorTotalOp2;

                        btnIncrementar.addEventListener('click', currentIncrementHandler);
                        btnDecrementar.addEventListener('click', currentDecrementHandler);
                        opcion1.addEventListener('click', currentOpcion1Handler);
                        opcion2.addEventListener('click', currentOpcion2Handler);

                        productoSeleccionado = idProducto;
                        etiquetaValorNumerico = etiquetaValor.textContent;


                        actualizarValorTotal();


                    });


                    window.addEventListener('click', (event) => {

                        if (event.target === cajaInformacion) {

                            closeModal();

                            cajaProductoImagen.removeChild(copiaImagen);
                            cajaProductoInformacion.removeChild(copiaTitulo);
                            cajaProductoInformacion.removeChild(copiaPrecio);
                            cajaProductoInformacion.removeChild(linea);

                        }
                    });




                }

            }

            btnCajaValorTotal.addEventListener('click', async (e) => {

                e.preventDefault();
                
                
                
                const pedido = {

                    id_usuario: userId,
                    producto: productoSeleccionado,
                    cantidad_productos: numeroContador.value,
                    valor_pedido: etiquetaValorNumerico.replace('Agregar $', ''),

                    }

                

                



                console.log(pedido);



                try {

                    const response = await fetch('http://localhost:3000/carro', {

                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(pedido)
                    });

                    const data = await response.json();

                    if (!response.ok) {

                        throw new Error(data.error || 'Error en el servidor');
                    }

                    console.log('Producto agregado al carro Extitosamente', data);
                    alert('Producto agregado Exitosamente');



                } catch (err) {

                    console.error('Error al agregar producto al carro:', err);
                    alert('Error al agregar producto al carro: ' + err.message);

                }
            });


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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
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
        contenedorOtrasBebidas.classList.remove('contenedorProductos');
        contenedorOtrasBebidas.classList.add('inactive');
        contenedorConfiteria.classList.remove('inactive');
        contenedorConfiteria.classList.add('contenedorProductos');

    });

    btnOtrasBebidas.addEventListener('click', (e) => {
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
        contenedorConfiteria.classList.remove('contenedorProductos');
        contenedorConfiteria.classList.add('inactive');
        contenedorOtrasBebidas.classList.remove('inactive');
        contenedorOtrasBebidas.classList.add('contenedorProductos');

    });

   


});