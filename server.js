
const express = require('express');
const cors = require('cors');
const pool = require ('./conexion');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/usuarios', async (req, res)=>{

    try{

        const [results] = await pool.query('SELECT id, nombresyapellidos, cedula, email, direccion, contraseña FROM usuarios');
        res.json(results);
    }catch(err){

        console.error('Error en la base de datos', err);
        res.status(500).send('Error en la base de datos');
    }
});

app.get('/productos', async (req, res)=>{

    try{

        const [resultsProductos] = await pool.query('SELECT id_producto, tipo_producto, nombre_producto, valor_producto, imagen_producto FROM productos');
        res.json(resultsProductos);
    }catch(err){

        console.error('Error en la base de datos', err);
        res.status(500).send('Error en la base de datos');
    }
});

app.post('/usuarios', async (req, res)=>{

    try{

        const {nombresyapellidos, cedula, email, direccion, contraseña} = req.body;

        if (!nombresyapellidos || !cedula ||!email ||!direccion ||!contraseña){

            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }

        if(!email.includes('@')){
            return res.status(400).json({error: 'Email no valido'})
        }

        const [result] = await pool.execute(
            'INSERT INTO usuarios (nombresyapellidos, cedula, email, direccion, contraseña) VALUES (?,?,?,?,?)',
            [nombresyapellidos, cedula, email, direccion, contraseña] 

        );

        res.status(201).json({

            nombresyapellidos,
            email,
            message: 'Usuarios creado exitosament'
        });
    }catch(error){

        console.error('Error en el servidor', error);

        if(error.code === 'ER_DUP_ENTRY'){

            return res.status(400).json({error: 'El usuario ya existe'});
        }

        res.status(500).json({error:'Error al crear usuario'});

    }

});

app.listen(port,()=>{

    console.log(`Servidor escuchando en port ${port}`);
    
});