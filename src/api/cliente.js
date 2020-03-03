//AUTH: JORGE M.
//API MODELO CLIENTE CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' ,async (req,res)=>{ // MOSTRAR CLIENTE CODIGO
    const { codigo } = req.params;
    const cliente = await pool.query('CALL get_Cliente(?)', codigo);
    res.json(cliente[0])
});

router.get('/' ,async (req,res)=>{ // MOSTRAR CLIENTES
    const clientes = await pool.query('CALL get_Cliente_Lista()');
    res.json(clientes[0])
});

router.post('/',async function(req,res){ //AGREGAR CLIENTE
    const { 
        codigoTipoDocumento,
        numeroDocumento,
        telefonoCliente,
        correoCliente,
        direccionCliente,
        nombreCliente,
        enRepresentacion,
        razonSocial } = req.body;
    try{
        const result = await pool.query('CALL post_Cliente(?,?,?,?,?,?,?,?)',
                            [
                                codigoTipoDocumento,
                                numeroDocumento,
                                telefonoCliente,
                                correoCliente,
                                direccionCliente,
                                nombreCliente,
                                enRepresentacion,
                                razonSocial
                            ] );
        res.json(result[0]);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR CLIENTE CODIGO
    const {
        codigoCliente,   
        codigoTipoDocumento,
        numeroDocumento,
        telefonoCliente,
        correoCliente,
        direccionCliente,
        nombreCliente,
        enRepresentacion,
        razonSocial } = req.body;
    try {
        const result = await pool.query('CALL put_Cliente(?,?,?,?,?,?,?,?,?)',
                            [        
                                codigoCliente,   
                                codigoTipoDocumento,
                                numeroDocumento,
                                telefonoCliente,
                                correoCliente,
                                direccionCliente,
                                nombreCliente,
                                enRepresentacion,
                                razonSocial 
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR CLIENTE ID
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Cliente(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER