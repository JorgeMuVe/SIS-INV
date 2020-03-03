
//AUTH: JORGE M.
//API MODELO VENTA CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

router.get('/local/:codigo' , async (req,res)=>{ // MOSTRAR VENTA POR LOCAL CODIGO
    const { codigo } = req.params;
    const ventas = await pool.query('CALL get_Venta_Local(?)', codigo );
    res.json( ventas[0]);
});

router.get('/reporte/:fechas' , async (req,res)=>{ // MOSTRAR VENTA CODIGO
    const { fechas } = req.params;
    const fechaInicioReporte = fechas.split('_',2)[0];
    const fechaFinReporte  = fechas.split('_',2)[1];
    const ventasReporte = await pool.query('CALL get_Venta_Reporte(?,?)', [
                                                fechaInicioReporte,
                                                fechaFinReporte
                                            ]);
    res.json( ventasReporte[0]);
});

router.get('/vacio/:codigos' ,async (req,res)=>{ // OBTENER CODIGO GENERADO DE VENTA
    const { codigos } = req.params;
    const codigoUsuario = codigos.split('_',2)[0];
    const codigoLocal = codigos.split('_',2)[1];
    const venta = await pool.query('CALL get_Venta_Vacio(?,?)',[
                                        codigoUsuario,
                                        codigoLocal
                                    ]);
    res.json( venta[0] );
    //res.json({ codigoVentaGenerado:"VEN-000001"});
});

router.get('/suma/:mes' , async (req,res)=>{ // MOSTRAR VENTA POR LOCAL CODIGO
    const { mes } = req.params;
    var fechaInicio = "";
    var fechaFin = "";

    switch (mes) {
        case "ENERO":
            fechaInicio = "2020-01-01 00:00:01"; fechaFin = "2020-01-31 23:59:59";
        break;
        case "FEBRERO":
            fechaInicio = "2020-02-01 00:00:01"; fechaFin = "2020-02-28 23:59:59";
        break;
        case "MARZO":
            fechaInicio = "2020-03-01 00:00:01"; fechaFin = "2020-03-31 23:59:59";
        break;
        case "ABRIL":
            fechaInicio = "2020-04-01 00:00:01"; fechaFin = "2020-04-30 23:59:59";
        break;
        case "MAYO":
            fechaInicio = "2020-05-01 00:00:01"; fechaFin = "2020-05-31 23:59:59";
        break;
        case "JUNIO":
            fechaInicio = "2020-06-01 00:00:01"; fechaFin = "2020-06-30 23:59:59";
        break;
        case "JULIO":
            fechaInicio = "2020-07-01 00:00:01"; fechaFin = "2020-07-31 23:59:59";
        break;
        case "AGOSTO":
            fechaInicio = "2020-08-01 00:00:01"; fechaFin = "2020-08-31 23:59:59";
        break;
        case "SETIEMBRE":
            fechaInicio = "2020-09-01 00:00:01"; fechaFin = "2020-09-30 23:59:59";
        break;
        case "OCTUBRE":
            fechaInicio = "2020-10-01 00:00:01"; fechaFin = "2020-10-31 23:59:59";
        break;
        case "NOVIEMBRE":
            fechaInicio = "2020-11-01 00:00:01"; fechaFin = "2020-11-30 23:59:59";
        break;
        case "DICIEMBRE":
            fechaInicio = "2020-12-01 00:00:01"; fechaFin = "2020-12-31 23:59:59";
        break;    
        default:
        break;
    }
    const ventas = await pool.query('CALL get_Suma_Venta_Mensual(?,?)',[fechaInicio, fechaFin]);
    res.json( ventas[0]);
});

router.get('/:codigo' , async (req,res)=>{ // MOSTRAR VENTA CODIGO
    const { codigo } = req.params;
    const venta = await pool.query('CALL get_Venta(?)', codigo);
    res.json( venta[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR VENTAS
    const ventas = await pool.query('CALL get_Venta_Lista()');
    res.json( ventas[0] );
});

router.delete('/vacio/:codigo', async (req,res) => { // ELIMINAR VENTA POR CODIGO LOCAL
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Venta_Vacio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR VENTA CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Venta(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR VENTA

    try{
        const {  
            codigoUsuario,
            codigoCliente,
            codigoLocal,
            valorTotalVenta,
            valorModificado,
            valorDescuento,
            fechaModificacion,
            montoRecibido,
   } = req.body;
        
        const result = await pool.query('CALL post_Venta(?,?,?,?,?,?,?,?)',
                            [
                                codigoUsuario,
                                codigoCliente,
                                codigoLocal,
                                valorTotalVenta,
                                valorModificado,
                                valorDescuento,
                                fechaModificacion,
                                montoRecibido
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR VENTA CODIGO
    try {
        const { 
            codigoVenta,
            codigoUsuario,
            codigoCliente,
            codigoLocal,
            valorTotalVenta,
            valorModificado,
            valorDescuento,
            montoRecibido
          } = req.body;

        const result = await pool.query('CALL put_Venta(?,?,?,?,?,?,?,?)',
                            [
                                codigoVenta,
                                codigoUsuario,
                                codigoCliente,
                                codigoLocal,
                                valorTotalVenta,
                                valorModificado,
                                valorDescuento,
                                montoRecibido
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER