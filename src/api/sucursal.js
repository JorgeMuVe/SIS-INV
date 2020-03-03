
//AUTH: JORGE M.
//API MODELO SUCURSAL CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR SUCURSAL CODIGO
    const { codigo } = req.params;
    const sucursal = await pool.query('CALL get_Sucursal(?)', codigo);
    res.json( sucursal[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR SUCURSALES
    const sucursales = await pool.query('CALL get_Sucursal_Lista()');
    res.json( sucursales[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR SUCURSAL CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Sucursal(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR SUCURSAL

    try{
        const {
            nombreSucursal,
            estadoSucursal  } = req.body;
        
        const result = await pool.query('CALL post_Sucursal(?,?)',
                            [
                                nombreSucursal,
                                estadoSucursal
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR SUCURSAL CODIGO
    try {
        const {
            codigoSucursal,
            nombreSucursal,
            estadoSucursal   } = req.body;

        const result = await pool.query('CALL put_Sucursal(?,?,?)',
                            [
                                codigoSucursal,
                                nombreSucursal,
                                estadoSucursal
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER