
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

        const [results] = await pool.query('SELECT id_usuario, nombresyapellidos, cedula, email, direccion, contraseña FROM usuarios');
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

//ESTO ES LO CORRESPONDIENTE AL CARRO DE COMPRAS

app.post('/carro', async (req, res)=>{

    try{

        const {id_usuario, producto, cantidad_productos, valor_pedido} = req.body;

        if (!id_usuario ||!producto ||!cantidad_productos ||!valor_pedido){

            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }


        const [result] = await pool.execute(
            'INSERT INTO carro (id_usuario, producto, cantidad_productos, valor_pedido) VALUES (?,?,?,?)',
            [id_usuario, producto,cantidad_productos, valor_pedido] 

        );

        res.status(201).json({

            id_usuario,
            message: 'Producto agregado al carro exitosamente'
        });
    }catch(error){

        console.error('Error en el servidor', error);



        res.status(500).json({error:'Error al agregar producto al carro'});

    }

});

app.get('/carro/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        const [rows] = await pool.execute(`
            SELECT 
                c.id_compra,
                c.id_usuario,
                c.producto,
                p.nombre_producto,  -- Información del producto
                p.imagen_producto,  -- Imagen del producto
                c.cantidad_productos,
                c.valor_pedido,
                (c.cantidad_productos * c.valor_pedido) AS total_item
            FROM carro c
            LEFT JOIN productos p ON c.producto = p.id_producto
            WHERE c.id_usuario = ?
            ORDER BY c.id_compra DESC
        `, [id_usuario]);

        if (rows.length > 0) {
            const totalCarro = rows.reduce((sum, item) => sum + item.total_item, 0);
            
            res.status(200).json({
                success: true,
                items: rows,
                summary: {
                    total: totalCarro,
                    count_items: rows.length
                }
            });
        } else {
            res.status(404).json({ 
                success: false,
                message: 'Carrito vacío' 
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ 
            success: false,
            message: 'Error en el servidor' 
        });
    }
});

app.delete('/carro/:id_compra', async (req, res) => {
    const { id_compra } = req.params;

    try {
        const [result] = await pool.execute(
            'DELETE FROM carro WHERE id_compra = ?',
            [id_compra]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado' });
        }
        
        res.json({ success: true, message: 'Producto eliminado' });
    } catch (error) {
        console.error('Error al eliminar:', error);
        res.status(500).json({ success: false, message: 'Error al eliminar' });
    }
});





app.listen(port,()=>{

    console.log(`Servidor escuchando en port ${port}`);
    
});