
//AUTH: JORGE M.
//API MODELO Traslado_Detalle CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/codigotraslado/:codigo' , async (req,res)=>{ // MOSTRAR DETALLES DE TRASLADO POR CODIGO DE TRASLADO
    const { codigo } = req.params;
    const trasladoDetalle = await pool.query('CALL get_Traslado_Detalle_Codigo_Traslado_Vista(?)', codigo);
    res.json( trasladoDetalle[0] );
});

router.get('/:codigo' , async (req,res)=>{ // MOSTRAR Traslado_Detalle CODIGO
    const { codigo } = req.params;
    const trasladoDetalle = await pool.query('CALL get_Traslado_Detalle(?)', codigo);
    res.json( trasladoDetalle[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR Traslado_DetalleS
    const trasladosDetalles = await pool.query('CALL get_Traslado_Detalle_Lista()');
    res.json( trasladosDetalles[0] );
});

router.delete('/envio/:codigo', async (req,res) => { // ELIMINAR DETALLES DE TRASLADO CODIGO DE TRASLADO ENVIO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Traslado_Detalle_Envio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR Traslado_Detalle CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Traslado_Detalle(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/temporal',async function(req,res){ //AGREGAR Traslado_Detalle

    try{
        const { 
            codigoTraslado,
            codigoProducto,
            codigoPrecio  } = req.body;
        
        const result = await pool.query('CALL post_Traslado_Detalle_Temporal(?,?,?)',
                            [
                                codigoTraslado,
                                codigoProducto,
                                codigoPrecio
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});


router.post('/',async function(req,res){ //AGREGAR Traslado_Detalle

    try{
        const { 
            codigoTraslado,
            codigoProducto,
            codigoPrecio,
            cantidadProducto,
            valorTotalTD   } = req.body;
        
        const result = await pool.query('CALL post_Traslado_Detalle(?,?,?,?,?)',
                            [
                                codigoTraslado,
                                codigoProducto,
                                codigoPrecio,
                                cantidadProducto,
                                valorTotalTD
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/temporal', async (req,res) => { //MODIFICAR Traslado_Detalle CODIGO
    try {
        const { 
            codigoTD,
            cantidadProducto,
            valorTotalTD,
            codigoLocal,
            codigoProducto
          } = req.body;

        const result = await pool.query('CALL put_Traslado_Detalle_Temporal(?,?,?,?,?)',
                            [
                                codigoTD,
                                cantidadProducto,
                                valorTotalTD,
                                codigoLocal,
                                codigoProducto
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});


router.put('/', async (req,res) => { //MODIFICAR Traslado_Detalle CODIGO
    try {
        const { 
            codigoTD,
            codigoTraslado,
            codigoProducto,
            codigoPrecio,
            cantidadProducto,
            valorTotalTD
          } = req.body;

        const result = await pool.query('CALL put_Traslado_Detalle(?,?,?,?,?,?)',
                            [
                                codigoTD,
                                codigoTraslado,
                                codigoProducto,
                                codigoPrecio,
                                cantidadProducto,
                                valorTotalTD
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER