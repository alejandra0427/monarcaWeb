
const express = require('express');
const cors = require('cors');
const pool = require ('./conexion');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// login y usuarios

app.get('/usuarios/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const sql = 'SELECT id_usuario, nombresyapellidos, cedula, email, telefono, ciudad, direccion FROM usuarios WHERE id_usuario = ?';
        const [results] = await pool.query(sql, [id]);

        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('Usuario no encontrado');
        }
    } catch (err) {
        res.status(500).send('Error en la base de datos');
    }
});

app.post('/usuarios', async (req, res)=>{

    try{

        const {nombresyapellidos, cedula, email,telefono, ciudad, direccion, password} = req.body;

        if (!nombresyapellidos || !cedula ||!email ||!telefono ||!ciudad ||!direccion ||!password){

            return res.status(400).json({error: 'Faltan campos obligatorios'});
        }

        if(!email.includes('@')){
            return res.status(400).json({error: 'Email no valido'})
        }

        const [result] = await pool.execute(
            'INSERT INTO usuarios (nombresyapellidos, cedula, email, telefono, ciudad, direccion, password) VALUES (?,?,?,?,?,?,?)',
            [nombresyapellidos, cedula, email, telefono, ciudad, direccion, password] 

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



app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

      
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
        }

        
        const [usuarios] = await pool.query(
            'SELECT id_usuario, nombresyapellidos, email, password FROM usuarios WHERE email = ?', 
            [email]
        );

     
        if (usuarios.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const usuario = usuarios[0];

       
        if (usuario.password !== password) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // 5. Login exitoso
        res.status(200).json({
            success: true,
            message: 'Inicio de sesión exitoso',
            user: {
                id: usuario.id_usuario,
                nombre: usuario.nombresyapellidos,
                email: usuario.email
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

//Esto es lo que corresponde a productos

app.get('/productos', async (req, res)=>{

    try{

        const [resultsProductos] = await pool.query('SELECT id_producto, tipo_producto, nombre_producto, valor_producto, imagen_producto FROM productos');
        res.json(resultsProductos);
    }catch(err){

        console.error('Error en la base de datos', err);
        res.status(500).send('Error en la base de datos');
    }
});

app.get('/producto/:id', async (req, res) => {
    const { id } = req.params; 
    try {
        const sql = 'SELECT id_producto, tipo_producto, nombre_producto, valor_producto, imagen_producto FROM productos WHERE id_producto = ?';
        const [results] = await pool.query(sql, [id]);

        if (results.length > 0) {
            res.json(results[0]); 
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        res.status(500).send('Error en la base de datos');
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
            res.status(200).json({ 
                success: true,
                items: [],
                summary:{
                    total:0,
                    count_items:0
                } 
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

//Esto es lo que corresponde al componente de pedidos

app.post('/finalizar-pedido', async (req, res) => {
  // 1. Extraemos los datos
  const { id_usuario, direccion, ciudad, telefono, valor_total, items } = req.body;

  try {
    
    const sqlPedido = `
      INSERT INTO pedidos (id_usuario, direccion, ciudad, telefono, valor_total, estado, fecha_creacion) 
      VALUES (?, ?, ?, ?, ?, 'Pendiente', NOW())`;
    
    const [resultPedido] = await pool.query(sqlPedido, [
      id_usuario, 
      direccion, 
      ciudad, 
      telefono, 
      valor_total
    ]);
    
    const nuevoIdPedido = resultPedido.insertId;

    
    const sqlDetalle = `
      INSERT INTO detalle_pedido (id_pedido, id_producto, cantidad, precio_unitario, subtotal) 
      VALUES ?`;

    
    const valoresDetalle = items
    .filter(item => item.id_producto != null) 
    .map(item => [
        nuevoIdPedido, 
        item.id_producto, 
        item.cantidad, 
        item.precio_unitario, 
        item.subtotal
    ]);

    
    await pool.query(sqlDetalle, [valoresDetalle]);

    res.json({ success: true, message: 'Pedido guardado con éxito', id_pedido: nuevoIdPedido });

    await pool.query('DELETE FROM carro WHERE id_usuario = ?', [id_usuario]);

    res.json({ success: true, message: 'Pedido creado y carrito limpiado' });

  } catch (error) {
    
    console.error("--- ERROR EN EL SERVIDOR ---");
    console.error("Mensaje:", error.sqlMessage || error.message);
    res.status(500).json({ error: 'Fallo en la base de datos', detalle: error.sqlMessage });
  }
});

app.get('/pedidos/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;

    try {
        
        const sql = `
            SELECT 
                id_pedido, 
                direccion, 
                ciudad, 
                telefono, 
                valor_total, 
                estado, 
                fecha_creacion 
            FROM pedidos 
            WHERE id_usuario = ? 
            ORDER BY fecha_creacion DESC`;

        const [rows] = await pool.query(sql, [id_usuario]);

        
        if (rows.length === 0) {
            return res.json([]);
        }

        res.json(rows);

    } catch (error) {
        console.error('Error al obtener pedidos:', error);
        res.status(500).json({ 
            error: 'Error al consultar la base de datos',
            details: error.message 
        });
    }
});

app.delete('/eliminar-pedido/:id_pedido', async (req, res) => {
    const { id_pedido } = req.params;

    try {
        // 1. Iniciamos una transacción para asegurar que se borre todo o nada
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        try {
            // 2. Primero eliminamos los detalles del pedido (Hijo)
            const sqlDetalle = 'DELETE FROM detalle_pedido WHERE id_pedido = ?';
            await connection.query(sqlDetalle, [id_pedido]);

            // 3. Luego eliminamos el pedido (Padre)
            const sqlPedido = 'DELETE FROM pedidos WHERE id_pedido = ?';
            const [result] = await connection.query(sqlPedido, [id_pedido]);

            if (result.affectedRows === 0) {
                await connection.rollback();
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            // 4. Si todo salió bien, confirmamos los cambios
            await connection.commit();
            res.json({ success: true, message: 'Pedido y detalles eliminados correctamente' });

        } catch (error) {
            // Si algo falla, revertimos los cambios realizados en el "try" interno
            await connection.rollback();
            throw error; 
        } finally {
            connection.release();
        }

    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        res.status(500).json({ 
            error: 'Error interno del servidor', 
            details: error.sqlMessage || error.message 
        });
    }
});


app.listen(port,()=>{

    console.log(`Servidor escuchando en port ${port}`);
    
});
