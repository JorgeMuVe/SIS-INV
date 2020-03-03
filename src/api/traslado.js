
//AUTH: JORGE M.
//API MODELO TRASLADO CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

router.get('/reporte/pendiente/:fechas' , async (req,res)=>{ // MOSTRAR VENTA CODIGO
    const { fechas } = req.params;
    const fechaInicioReporte = fechas.split('_',2)[0];
    const fechaFinReporte  = fechas.split('_',2)[1];
    const trasladoReporte = await pool.query('CALL get_Traslado_Reporte_Pendiente(?,?)', [
                                                fechaInicioReporte,
                                                fechaFinReporte
                                            ]);
    res.json( trasladoReporte[0]);
});

router.get('/reporte/:fechas' , async (req,res)=>{ // MOSTRAR VENTA CODIGO
    const { fechas } = req.params;
    const fechaInicioReporte = fechas.split('_',2)[0];
    const fechaFinReporte  = fechas.split('_',2)[1];
    const trasladoReporte = await pool.query('CALL get_Traslado_Reporte_Confirmado(?,?)', [
                                                fechaInicioReporte,
                                                fechaFinReporte
                                            ]);
    res.json( trasladoReporte[0]);
});

router.post('/vacio', async (req,res) => {
    const { codigoUsuario , codigoLocal } = req.body;
    const traslado = await pool.query('CALL post_Traslado_Vacio(?,?)',[
                                        codigoUsuario,
                                        codigoLocal
                                        ]);
    res.json(traslado[0]);
});

router.get('/todos/:codigo' , async (req,res)=>{ // MOSTRAR TRASLADO PENDIENTES POR CODIGO DE LOCAL
    const { codigo } = req.params;
    const traslado = await pool.query('CALL get_Traslado_Local(?)', codigo);
    res.json( traslado[0] );
});

router.get('/envios/:codigo' , async (req,res)=>{ // MOSTRAR TRASLADO PENDIENTES POR CODIGO DE LOCAL
    const { codigo } = req.params;
    const traslado = await pool.query('CALL get_Traslado_Local_Envio(?)', codigo);
    res.json( traslado[0] );
});

router.get('/ingresos/:codigo' , async (req,res)=>{ // MOSTRAR TRASLADO PENDIENTES POR CODIGO DE LOCAL
    const { codigo } = req.params;
    const traslado = await pool.query('CALL get_Traslado_Local_Ingreso(?)', codigo);
    res.json( traslado[0] );
});

router.get('/pendientes/:codigo' , async (req,res)=>{ // MOSTRAR TRASLADO PENDIENTES POR CODIGO DE LOCAL
    const { codigo } = req.params;
    const traslado = await pool.query('CALL get_Traslado_Pendiente_Local(?)', codigo);
    res.json( traslado[0] );
});

router.get('/:codigo' , async (req,res)=>{ // MOSTRAR TRASLADO CODIGO
    const { codigo } = req.params;
    const traslado = await pool.query('CALL get_Traslado(?)', codigo);
    res.json( traslado[0] );
})

router.get('/' ,async (req,res)=>{ // MOSTRAR TRASLADOS
    const traslados = await pool.query('CALL get_Traslado_Lista()');
    res.json( traslados[0] );
});

router.delete('/vacio/:codigo', async (req,res) => { // ELIMINAR TRASLADO POR CODIGO LOCAL
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Traslado_Vacio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR TRASLADO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Traslado(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR TRASLADO

    try{
        const {  
            codigoUsuario,codigoTipoTraslado,
            origenTraslado,destinoTraslado,fechaVencimiento,
            valorTotal,observacionOrigen,observacionDestino , 
            codigoUsuarioConfirmacion, confirmacion,fechaConfirmacion   } = req.body;
        
        const result = await pool.query('CALL post_Traslado(?,?,?,?,?,?,?,?,?,?,?)',
                            [
                                codigoUsuario,codigoTipoTraslado,
                                origenTraslado,destinoTraslado,fechaVencimiento,
                                valorTotal,observacionOrigen , observacionDestino ,
                                codigoUsuarioConfirmacion,confirmacion,fechaConfirmacion
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});


router.put('/confirmar/', async (req,res) => { //MODIFICAR TRASLADO CODIGO
    try {
        const { 
            codigoTraslado, observacionDestino, codigoUsuarioConfirmacion
          } = req.body;

        const result = await pool.query('CALL put_Traslado_Confirmar(?,?,?)',
                            [
                                codigoTraslado,
                                codigoUsuarioConfirmacion,
                                observacionDestino
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR TRASLADO CODIGO
    try {
        const { 
            codigoTraslado,codigoUsuario,codigoTipoTraslado,
            origenTraslado,destinoTraslado,fechaVencimiento,
            valorTotal,observacionOrigen
        } = req.body;
        const result = await pool.query('CALL put_Traslado(?,?,?,?,?,?,?,?)',
                            [
                                codigoTraslado,codigoUsuario,codigoTipoTraslado,
                                origenTraslado,destinoTraslado,fechaVencimiento,
                                valorTotal,observacionOrigen
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER