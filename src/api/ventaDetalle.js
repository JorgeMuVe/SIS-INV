
//AUTH: JORGE M.
//API MODELO VENTA_DETALLE CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL



router.get('/:codigo' , async (req,res)=>{ // MOSTRAR VENTA_DETALLE CODIGO
    const { codigo } = req.params;
    const VentaDetalle = await pool.query('CALL get_Venta_Detalle(?)', codigo);
    res.json( VentaDetalle[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR VENTAS_DETALLES
    const VentasDetalles = await pool.query('CALL get_Venta_Detalle_Lista()');
    res.json( VentasDetalles[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR VENTA_DETALLE CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Venta_Detalle(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------


router.get('/lista' , async (req,res)=>{ // MOSTRAR TODOS DETALLES DE VENTAS
    const result = await pool.query('CALL get_Venta_Detalle_Lista()');
    res.json( result[0] );
});

router.get('/codigovd/:codigovd',async (req,res)=>{ // MOSTRAR DETALLES DE VENTA POR CODIGO_VD
    const { codigovd } = req.params;
    const result = await pool.query('CALL get_Venta_Detalle_CodigoVD(?)',codigovd);
    res.json(result[0]);
});

router.get('/codigoventa/:codigoventa',async (req,res)=>{ // MOSTRAR DETALLES DE VENTA POR CODIGO DE VENTA
    const { codigoventa } = req.params;
    const result = await pool.query('CALL get_Venta_Detalle_Codigo_Venta(?)',codigoventa);
    res.json(result[0]);
});

router.delete('/codigovd/:codigovd', async (req,res) => { // ELIMINAR DETALLE DE VENTA POR CODIGO_VD
    const { codigovd } = req.params;
    try {
        const result = await pool.query('CALL del_Venta_Detalle_CodigoVD(?)',codigovd);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.get('/codigoventa/vista/:codigoventa', async (req,res) => { // MOSTRAR DETALLE DE VENTA POR CODIGO VENTA
    const { codigoventa } = req.params;
    try {
        const result = await pool.query('CALL get_Venta_Detalle_Codigo_Venta_Vista(?)',codigoventa);
        res.json(result[0]);
    }catch(e){
        console.error(e.code);
    }
});


router.delete('/codigoventa/:codigoventa', async (req,res) => { // ELIMINAR DETALLE DE VENTA POR CODIGO VENTA
    const { codigoventa } = req.params;
    try {
        const result = await pool.query('CALL del_Venta_Detalle_Codigo_Venta(?)',codigoventa);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/temporal',async function(req,res){ //AGREGAR DETALLE DE VENTA
    
    try{
        const { codigoVenta , codigoProducto , codigoPrecio } = req.body;

        const result = await pool.query('CALL post_Venta_Detalle_Temporal(?,?,?)',
                            [
                                codigoVenta , codigoProducto , codigoPrecio
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});
router.put('/temporal', async (req,res) => { //MODIFICAR DETALLE DE VENTA TENPORAL
    try {
        const { 
            codigoVD,
            cantidadProducto,valorTotalVD,valorModificado,
            valorDescuento,codigoLocal,codigoProducto   } = req.body;

        const result = await pool.query('CALL put_Venta_Detalle_Temporal(?,?,?,?,?,?,?)',
                            [
                                codigoVD,
                                cantidadProducto,valorTotalVD,valorModificado,
                                valorDescuento, codigoLocal , codigoProducto
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



router.post('/',async function(req,res){ //AGREGAR DETALLE DE VENTA

    try{
        const { 
			codigoVenta,codigoProducto,codigoPrecio,cantidadProducto,
            valorTotalVD,valorModificado,valorDescuento
          } = req.body;
        
        const result = await pool.query('CALL post_Venta_Detalle(?,?,?,?,?,?,?)',
                            [
                                codigoVenta,codigoProducto,codigoPrecio,cantidadProducto,
                                valorTotalVD,valorModificado,valorDescuento
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR DETALLE DE VENTA
    try {
        const { 
            codigoVD,
			codigoVenta,codigoProducto,codigoPrecio,cantidadProducto,
            valorTotalVD,valorModificado,valorDescuento
          } = req.body;

        const result = await pool.query('CALL put_Venta_Detalle(?,?,?,?,?,?,?,?)',
                            [
                                codigoVD,
                                codigoVenta,codigoProducto,codigoPrecio,cantidadProducto,
                                valorTotalVD,valorModificado,valorDescuento
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER