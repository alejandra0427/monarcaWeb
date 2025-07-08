window.addEventListener('load',()=>{
    

    
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const boton = document.getElementById('botonIniciar');
    
    
    boton.addEventListener('click',async (e)=>{
       
        
        e.preventDefault();

       try{
        const response = await fetch('http://localhost:3000/usuarios');
        const data = await response.json();
        
        const userValidation = data.find(usuario => email.value.trim() == usuario.email && password.value.trim() == usuario.contraseña )
       
         
            if(userValidation){

                window.location.href ="../inicioPage/inicioPage.html";
            }else{

                alert('usuario o contraseña incorrecta')
            }

        
    }catch (err){
        console.log('Error data', err);
        

    }


     });

});