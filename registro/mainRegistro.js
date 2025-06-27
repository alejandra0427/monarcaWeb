
window.addEventListener('load',()=>{

    const nombresyapellidos = document.getElementById('name');
    const cedula = document.getElementById('cedula');
    const email = document.getElementById('email');
    const direccion = document.getElementById('direccion');
    const contraseña = document.getElementById('contraseña');

    const boton= document.getElementById('botonEnviar');

    boton.addEventListener('click',async (e)=>{
        e.preventDefault();

        if(!nombresyapellidos.value.trim()){

            alert('Por Favor ingrese su nombre y apellido');
            return;
        }

        if(!cedula.value.trim()){

            alert('Por Favor ingrese su cedula');
            return;
        }
        
         if(!email.value.trim() || !email.value.includes('@')){

            alert('Por Favor ingrese su correo');
            return;
        }

          if(!direccion.value.trim()){

            alert('Por favor ingrese la direccion correcta');
            return;
        }
        
          if(!contraseña.value|| contraseña.value.length<6){

            alert('La contraseña debe tener al menos  6 caracteres');
            return;
        }
        const nuevoUsuario ={

            nombresyapellidos: nombresyapellidos.value,
            cedula: cedula.value,
            email: email.value,
            direccion: direccion.value,
            contraseña: contraseña.value

        };

        try{

            const response = await fetch('http://localhost:3000/usuarios',{

                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevoUsuario)
            });

            const data = await response.json();

            if(!response.ok){

                throw new Error(data.error || 'Error en el servidor');
            }

            console.log('Usuario creado correctamente', data);
            alert('Usuario registrado con exito');

            nombresyapellidos.value='';
            cedula.value='';
            email.value='';
            direccion.value='';
            contraseña.value='';
            
        }catch(err){

            console.error('Error al crear usuario:', err);
            alert('Error al registrar usuario: '+ err.message);
            
        }
    });
});


  