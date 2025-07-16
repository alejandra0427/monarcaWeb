
window.addEventListener('load',()=>{

console.log('funcionando');



const contenedorCervezas = document.getElementById('contenedorCervezas');
const contenedorAguardiente = document.getElementById('contenedorAguardiente');
const cajaInformacion = document.getElementById('cajaInformacion');
const cajaDetalleProducto = document.getElementById('cajaDetalleProducto');

const btnCerveza = document.getElementById('btnCerveza');
const btnAguardiente= document.getElementById('btnAguardiente');

function closeModal (){

    cajaInformacion.style.display= 'none';
}

function openModal (){

    cajaInformacion.style.display ='flex';
}

async function carga () {
    
  try{
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        
        for (const producto of data){

            if(String(producto.tipo_producto) === "Cerveza"){
           
            const cajaCerveza = document.createElement('div');
            cajaCerveza.classList.add('cervezas');

            const titulo = document.createElement('h1');
            titulo.textContent = producto.nombre_producto;
            cajaCerveza.appendChild(titulo);

            const imagen = document.createElement('img');
            const linkImagen = producto.imagen_producto; 
            imagen.src = linkImagen;
            imagen.width='200'
            cajaCerveza.appendChild(imagen);

            const precio = document.createElement('h2');
            precio.textContent = producto.valor_producto;
            cajaCerveza.appendChild(precio);


            contenedorCervezas.appendChild(cajaCerveza);

            const copiaCajaCerveza = cajaCerveza.cloneNode(true)
            
            cajaCerveza.addEventListener('click',()=>{

                openModal();

                
                
                cajaDetalleProducto.appendChild(copiaCajaCerveza);
                

            });

            window.addEventListener('click', (event)=>{

        if(event.target === cajaInformacion){

            closeModal();

            cajaDetalleProducto.removeChild(copiaCajaCerveza);
            
        }
      });


            }else if(String(producto.tipo_producto ==='Aguardiente')){

                
            const cajaAguardiente = document.createElement('div');
            cajaAguardiente.classList.add('aguardiente');

            const titulo = document.createElement('h1');
            titulo.textContent = producto.nombre_producto;
            cajaAguardiente.appendChild(titulo);

            const imagen = document.createElement('img');
            const linkImagen = producto.imagen_producto; 
            imagen.src = linkImagen;
            imagen.width='200'
            cajaAguardiente.appendChild(imagen);

            const precio = document.createElement('h2');
            precio.textContent = producto.valor_producto;
            cajaAguardiente.appendChild(precio);
            
            contenedorAguardiente.appendChild(cajaAguardiente);
                
            }

        }
       
      


        
    }catch (err){
        console.log('Error data', err);
        

    }
}

carga();

btnCerveza.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('click');
    
    contenedorAguardiente.classList.remove('contenedorAguardiente')
    contenedorAguardiente.classList.add('inactive');
    contenedorCervezas.classList.remove('inactive');
    contenedorCervezas.classList.add('contenedorCervezas');
    
});


btnAguardiente.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('click');
    
    contenedorCervezas.classList.remove('contenedorCervezas')
    contenedorCervezas.classList.add('inactive');
    contenedorAguardiente.classList.remove('remove');
    contenedorAguardiente.classList.add('contenedorAguardiente');
    
});


});