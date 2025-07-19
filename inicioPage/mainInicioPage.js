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
    const contenedorOtrasBebidas = document.getElementById('contenedorOtrasBebidas');
    const cajaInformacion = document.getElementById('cajaInformacion');
    const cajaDetalleProducto = document.getElementById('cajaDetalleProducto');
    const cajaProductoImagen = document.getElementById('cajaProductoImagen');
    const cajaProductoInformacion = document.getElementById('cajaProductoInformacion');
    const cajaCheck = document.getElementById('cajaCheck');
    const cajaContador = document.getElementById('cajaContador');
    const precio6Pack = document.getElementById('precio6Pack');
    const precio24Pack = document.getElementById('precio24Pack');
    const etiquetaValor = document.getElementById('etiquetaValor');
    const numeroContador = document.getElementById('numeroContador');
    const opcion1 = document.getElementById('opcion1');
    const opcion2 = document.getElementById('opcion2'); 




    
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

    let currentIncrementHandler = null;
    let currentDecrementHandler = null;
    let currentOpcion1Handler = null;
    let currentOpcion2Handler = null;




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
                    precio.textContent = ('$'+producto.valor_producto);
                    cajaCerveza.appendChild(precio);


                   contenedorCervezas.appendChild(cajaCerveza);

                    const copiaImagen = imagen.cloneNode(true);
                    const copiaTitulo = titulo.cloneNode(true);
                    const copiaPrecio = precio.cloneNode(true);
                    const linea = document.createElement('hr');


                    cajaCerveza.addEventListener('click', () => {

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
                 numeroContador.value = '0';

                        openModal();

                copiaImagen.style.width='400px';
                copiaImagen.style.heigth='400px';
                cajaProductoImagen.appendChild(copiaImagen);
                cajaProductoInformacion.appendChild(copiaTitulo);
                cajaProductoInformacion.appendChild(linea);
                cajaProductoInformacion.appendChild(copiaPrecio);
                cajaProductoInformacion.appendChild(cajaCheck);
                cajaCheck.style.display='block';
                cajaProductoInformacion.appendChild(cajaContador);
                cajaContador.style.display='flex'

                precio6Pack.textContent = (producto.valor_producto);
                const calculoOpcion2 = producto.valor_producto*4;
                precio24Pack.textContent = (calculoOpcion2);

                 

                 etiquetaValor.textContent= ('Agregar $'+producto.valor_producto);
                
                

                function actualizarValorTotal() {
                
                    const cantidad = parseInt(numeroContador.value) || 0;
                    const nuevoTotal = producto.valor_producto * cantidad;
                    etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                }

                function actualizarValorTotalOp2(){
                    
                    const cantidad = parseInt(numeroContador.value)||0;
                    const nuevoTotal  = calculoOpcion2 *cantidad;
                    etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                }

                const handleIncrement = () => {
                      numeroContador.value = parseInt(numeroContador.value) + 1;
                      opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                const handleDecrement = () => {
                         let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 0) {
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
                    precio.textContent = ('$'+producto.valor_producto);
                    cajaAguardiente.appendChild(precio);

                    contenedorAguardiente.appendChild(cajaAguardiente);

                    //PUTNO DE REFERENCIA
                    
            const copiaImagen = imagen.cloneNode(true);
            const copiaTitulo = titulo.cloneNode(true);
            const copiaPrecio = precio.cloneNode(true);
            const linea = document.createElement('hr');

           
                 
            cajaAguardiente.addEventListener('click',()=>{

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
                 numeroContador.value = '0';

                openModal();

                copiaImagen.style.width='400px';
                copiaImagen.style.heigth='400px';
                cajaProductoImagen.appendChild(copiaImagen);
                cajaProductoInformacion.appendChild(copiaTitulo);
                cajaProductoInformacion.appendChild(linea);
                cajaProductoInformacion.appendChild(copiaPrecio);
                cajaProductoInformacion.appendChild(cajaCheck);
                cajaCheck.style.display='block';
                cajaProductoInformacion.appendChild(cajaContador);
                cajaContador.style.display='flex'

                precio6Pack.textContent = (producto.valor_producto);
                const calculoOpcion2 = producto.valor_producto*4;
                precio24Pack.textContent = (calculoOpcion2);

                 

                 etiquetaValor.textContent= ('Agregar $'+producto.valor_producto);
                
                

                function actualizarValorTotal() {
                
                    const cantidad = parseInt(numeroContador.value) || 0;
                    const nuevoTotal = producto.valor_producto * cantidad;
                    etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                }

                function actualizarValorTotalOp2(){
                    
                    const cantidad = parseInt(numeroContador.value)||0;
                    const nuevoTotal  = calculoOpcion2 *cantidad;
                    etiquetaValor.textContent = 'Agregar $' + nuevoTotal;
                }

                const handleIncrement = () => {
                      numeroContador.value = parseInt(numeroContador.value) + 1;
                      opcion1.checked ? actualizarValorTotal() : actualizarValorTotalOp2();
                        };

                const handleDecrement = () => {
                         let valorActual = parseInt(numeroContador.value) || 0;
                            if (valorActual > 0) {
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

                         actualizarValorTotal();
                

            });

           



            window.addEventListener('click', (event)=>{
              
        if(event.target === cajaInformacion){

            closeModal();

            cajaProductoImagen.removeChild(copiaImagen);
            cajaProductoInformacion.removeChild(copiaTitulo);
            cajaProductoInformacion.removeChild(copiaPrecio);
            cajaProductoInformacion.removeChild(linea);

            

            
        }
      });



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

                }else if (String(producto.tipo_producto) === 'Otras Bebidas') {


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

                   contenedorOtrasBebidas.appendChild( cajaOtrasBebidas);
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