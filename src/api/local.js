//AUTH: JORGE M.
//API MODELO LOCAL CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

router.get('/:codigo' , async (req,res)=>{ // MOSTRAR LOCAL CODIGO
    const { codigo } = req.params;
    const local = await pool.query('CALL get_Local(?)', codigo);
    res.json(local[0]);
});

router.get('/tipo/:params', async (req,res) => {
    const { params } = req.params;

    const tipoLocal = params.split('_',2)[0];
    const codigoLocal = params.split('_',2)[1];
    const locales = await pool.query('CALL get_Local_Tipo_Lista(?,?)', [ tipoLocal , codigoLocal ]);
    res.json( locales[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR LOCALES
    const locales = await pool.query('CALL get_Local_Lista()');
    res.json(locales[0]);
});

router.post('/',async function(req,res){ //AGREGAR LOCAL

    try{
        const { 
            codigoSucursal,
            codigoTipoLocal,
            nombreLocal,
            direccionLocal,
            numeroTelefono,
            horarioAtencion,
            ipLocal,
            macLocal } = req.body;      
        
        const result = await pool.query('CALL post_Local(?,?,?,?,?,?,?,?)',
        [
            codigoSucursal,
            codigoTipoLocal,
            nombreLocal,
            direccionLocal,
            numeroTelefono,
            horarioAtencion,
            ipLocal,
            macLocal
        ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR LOCAL CODIGO
    const {
        codigoLocal,
        codigoSucursal,
        codigoTipoLocal,
        nombreLocal,
        direccionLocal,
        numeroTelefono,
        horarioAtencion,
        ipLocal,
        macLocal } = req.body;
    try {
        const result = await pool.query('CALL put_Local(?,?,?,?,?,?,?,?,?)',
        [        
            codigoLocal,
            codigoSucursal,
            codigoTipoLocal,
            nombreLocal,
            direccionLocal,
            numeroTelefono,
            horarioAtencion,
            ipLocal,
            macLocal 
        ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR LOCAL CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Local(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER