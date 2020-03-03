//AUTH: JORGE M.
//API MODELO PRODUCTO CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

router.get('/local/' ,async (req,res)=>{ // MOSTRAR PRODUCTOS POR LOCAL ADMI
    const codigo = "%";
    const productos = await pool.query('CALL get_Producto_Lista_Local(?)', codigo);
    res.json( productos[0] );
});

router.get('/local/:codigo' ,async (req,res)=>{ // MOSTRAR PRODUCTOS POR LOCAL
    const { codigo } = req.params;
    const productos = await pool.query('CALL get_Producto_Lista_Local(?)',codigo);
    res.json( productos[0] );
});

router.get('/:codigo' ,async (req,res)=>{ // MOSTRAR PRODUCTO CODIGO
    const { codigo } = req.params;
    const codigoProducto = codigo.split('_',2)[0]; 
    const codigoLocal = codigo.split('_',2)[1]; 
    const producto = await pool.query('CALL get_Producto(?,?)',[codigoProducto,codigoLocal]);
    res.json( producto[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR PRODUCTOS
    const productos = await pool.query('CALL get_Producto_Lista');
    res.json( productos[0] );
});

router.get('/traslado/:codigo' ,async (req,res)=>{ // MOSTRAR PRODUCTOS DE TRASLADO
    const { codigo } = req.params;
    const productos = await pool.query('CALL get_Producto_Traslado(?)',codigo);
    res.json( productos[0] );
});

router.get('/venta/lista/:codigolocal' ,async (req,res)=>{ // MOSTRAR PRODUCTOS PRECIO DE VENTA POR LOCAL
/*
DROP PROCEDURE IF EXISTS get_Producto_Local_Venta_Lista;
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS get_Producto_Local_Venta_Lista(
    IN `@local` VARCHAR(10)
) 
BEGIN

    SELECT codigoProducto, descripcionProducto, detalleProducto, stockExistente
    FROM producto WHERE codigoLocal LIKE `@local`;

END;
$$
DELIMITER ;
*/
    const { codigolocal } = req.params;
    const productos = await pool.query('CALL get_Producto_Local_Venta_Lista(?)',codigolocal);
    res.json( productos[0] );
});

router.get('/precio/venta/:producto' ,async (req,res)=>{ // MOSTRAR PRODUCTOS PRECIO DE VENTA POR LOCAL
    const codigoProducto = req.params.producto;
/*
DROP PROCEDURE IF EXISTS get_Producto_Venta;
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS get_Producto_Venta(
    IN `@producto` VARCHAR(10)
) 
BEGIN

    SELECT P.*,
    TP.nombreTipoProducto,
    PR.descripcionPresentacion,
    M.urlMedia,
    PRE.codigoPrecio, PRE.valorPrecio,
    TPRE.nombreTipoPrecio
    FROM producto P
    INNER JOIN tipoProducto TP ON P.codigoTipoProducto = TP.codigoTipoProducto
    INNER JOIN presentacion PR ON P.codigoPresentacion = PR.codigoPresentacion
    INNER JOIN media M ON P.codigoMedia = M.codigoMedia
    INNER JOIN precio PRE ON P.codigoProducto = PRE.codigoProducto
    INNER JOIN tipoPrecio TPRE ON PRE.TipoPrecio = TPRE.codigoTipoPrecio and TPRE.nombreTipoPrecio = "VENTA"
    WHERE P.codigoProducto LIKE `@producto`;

END;
$$
DELIMITER ;
*/
    const productos = await pool.query('CALL get_Producto_Venta(?)',codigoProducto);
    res.json( productos[0] );
});

router.get('/precio/compra/:codigolocal' ,async (req,res)=>{ // MOSTRAR PRODUCTOS PRECIO DE COMPRA POR LOCAL
    const { codigolocal } = req.params;
    const productos = await pool.query('CALL get_Producto_Precio_Compra_Local_Lista(?)',codigolocal);
    res.json( productos[0] );
});

router.post('/cantidad' ,async (req,res)=>{ // MOSTRAR PRODUCTO CODIGO  
/*
DELIMITER $$
DROP PROCEDURE IF EXISTS get_Cantidad_Productos;
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE get_Cantidad_Productos( IN `@local` VARCHAR(10), IN `@texto` VARCHAR(255))
BEGIN
    SELECT COUNT(id) as cantidadProductos FROM producto 
    WHERE codigoLocal = `@local`;
END
$$ DELIMITER ;
*/  
    const { codigoLocal, textoBusqueda } = req.body;
    const cantidad = await pool.query('CALL get_Cantidad_Productos(?,?)',[codigoLocal,textoBusqueda]);
    res.json( cantidad[0] );
});

router.post('/inventario/paginado/' ,async (req,res)=>{ // MOSTRAR PRODUCTOS PRECIO DE VENTA POR LOCAL
/*
DROP PROCEDURE IF EXISTS get_Producto_Local_Inventario_Paginado;
DELIMITER $$
CREATE PROCEDURE IF NOT EXISTS get_Producto_Local_Inventario_Paginado(
    IN `@local` VARCHAR(10),
    IN `@texto` VARCHAR(255),
    IN `@inicio` INTEGER UNSIGNED,
    IN `@resultados` INTEGER UNSIGNED
) 
BEGIN

    SELECT p.* ,tp.nombreTipoProducto,pr.descripcionPresentacion,l.nombreLocal,m.urlMedia
    FROM producto p
    INNER JOIN tipoProducto tp ON p.codigoTipoProducto = tp.codigoTipoProducto
    INNER JOIN presentacion pr ON p.codigoPresentacion = pr.codigoPresentacion
    INNER JOIN local l ON p.codigoLocal = l.codigoLocal
    INNER JOIN media m ON p.codigoMedia = m.codigoMedia  
    WHERE p.codigoLocal = `@local` AND CONCAT(p.descripcionProducto,p.detalleProducto) 
    LIKE CONCAT("%",`@texto`,"%") LIMIT `@inicio`,`@resultados`;

END;
$$
DELIMITER ;
*/
    const {codigoLocal,textoBusqueda,inicio,resultados} = req.body;
    const productos = await pool.query('CALL get_Producto_Local_Inventario_Paginado(?,?,?,?)',
    [codigoLocal,textoBusqueda,inicio,resultados]);
    res.json( productos[0] );
});

router.post('/ingreso',async function(req,res){ //AGREGAR PRODUCTO
    try{
        const {
            codigoProducto,
            descripcionProducto, 
            detalleProducto,
            codigoTipoProducto,
            codigoPresentacion,
            codigoMedia,
            codigoLocal,
            stockExistente,
            stockMinimo,
            fechaVencimiento,
            valorPrecio } = req.body;
        const result = await pool.query('CALL post_Producto_Ingreso_Test(?,?,?,?,?,?,?,?,?,?,?)',
                            [
                                codigoProducto,
                                descripcionProducto, 
                                detalleProducto,
                                codigoTipoProducto,
                                codigoPresentacion,
                                codigoMedia,
                                codigoLocal,
                                stockExistente,
                                stockMinimo,
                                fechaVencimiento,
                                valorPrecio
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR PRODUCTO
    const { 
        descripcionProducto, 
        detalleProducto,
        codigoTipoProducto,
        codigoPresentacion,
        codigoLocal,
        codigoMedia,
        stockExistente,
        stockMinimo,
        fechaVencimiento,
        valorPrecio } = req.body;
    try{
        const result = await pool.query('CALL post_Producto(?,?,?,?,?,?,?,?,?,?)',
                            [
                                descripcionProducto, 
                                detalleProducto,
                                codigoTipoProducto,
                                codigoPresentacion,
                                codigoMedia,
                                codigoLocal,
                                stockExistente,
                                stockMinimo,
                                fechaVencimiento,
                                valorPrecio
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR PRODUCTO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Producto(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR PRODUCTO CODIGO
    const {         
        codigoProducto, 
        descripcionProducto, 
        detalleProducto,
        codigoTipoProducto,
        codigoPresentacion,
        codigoMedia,
        codigoLocal,
        stockExistente,
        stockMinimo,
        estadoProducto,
        fechaVencimiento,
        valorPrecio } = req.body;
    try {
        const result = await pool.query('CALL put_Producto(?,?,?,?,?,?,?,?,?,?,?,?)',
                            [        
                                codigoProducto, 
                                descripcionProducto, 
                                detalleProducto,
                                codigoTipoProducto,
                                codigoPresentacion,
                                codigoMedia,
                                codigoLocal,
                                stockExistente,
                                stockMinimo,
                                estadoProducto,
                                fechaVencimiento,
                                valorPrecio
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER

/*

DELIMITER $$
DROP PROCEDURE IF EXISTS post_Producto_Ingreso;
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE post_Producto_Ingreso(
	codigoProductoPOST VARCHAR(10),
    descripcionProductoPOST VARCHAR(250),
    detalleProductoPOST VARCHAR(300),
    codigoTipoProductoPOST VARCHAR(10),
    codigoPresentacionPOST VARCHAR(10),
    codigoMediaPOST VARCHAR(15),
    codigoLocalPOST VARCHAR(10),
    stockExistentePOST INT(10),
    stockMinimoPOST INT(10),
    fechaVencimientoPOST DATE,
	valorPrecioPOST DOUBLE(8,2))
BEGIN 
DECLARE EXIT HANDLER FOR SQLEXCEPTION ROLLBACK;
START TRANSACTION;

IF EXISTS (SELECT codigoProducto FROM producto WHERE 
descripcionProducto = descripcionProductoPOST AND 
detalleProducto = detalleProductoPOST AND
codigoPresentacion = codigoPresentacionPOST AND
codigoLocal = codigoLocalPOST)

THEN

SET @codigoProducto = "";
SELECT codigoProducto INTO @codigoProducto FROM producto WHERE 
descripcionProducto = descripcionProductoPOST AND 
detalleProducto = detalleProductoPOST AND
codigoPresentacion = codigoPresentacionPOST AND
codigoLocal = codigoLocalPOST;

UPDATE producto
SET stockExistente = stockExistente + stockExistentePOST
WHERE codigoProducto = @codigoProducto and codigoLocal = codigoLocalPOST;

ELSE 

INSERT INTO producto(codigoProducto,descripcionProducto,detalleProducto,codigoTipoProducto,
codigoPresentacion,codigoMedia,codigoLocal,stockExistente,stockMinimo,estadoProducto,
fechaVencimiento) VALUES(codigoProductoPOST,descripcionProductoPOST,detalleProductoPOST,
codigoTipoProductoPOST,codigoPresentacionPOST,codigoMediaPOST,codigoLocalPOST,
stockExistentePOST,stockMinimoPOST,true,fechaVencimientoPOST);
CALL post_Precio(valorPrecioPOST,"TP-PRE-002",codigoProductoPOST,codigoLocalPOST,1);
	
END IF;
COMMIT;
END $$
DELIMITER ;

*/