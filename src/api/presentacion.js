//AUTH: JORGE M.
//API MODELO PRESENTACION CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR PRESENTACION CODIGO
    const { codigo } = req.params;
    const presentacion = await pool.query('CALL get_Presentacion(?)', codigo);
    res.json(presentacion[0]);
});

router.get('/' ,async (req,res)=>{ // MOSTRAR PRESENTACIONES
    const presentaciones = await pool.query('CALL get_Presentacion_Lista()');
    res.json( presentaciones[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR PRESENTACION CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Presentacion(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR PRESENTACION

    try{
        const {
            descripcionPresentacion, 
            detallePresentacion,
            codigoMedia  } = req.body;
        
        const result = await pool.query('CALL post_Presentacion(?,?,?)',
                            [
                                descripcionPresentacion, 
                                detallePresentacion,
                                codigoMedia 
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR PRESENTACION CODIGO
    try {
        const {
            codigoPresentacion, 
            descripcionPresentacion, 
            detallePresentacion,
            codigoMedia   } = req.body;

        const result = await pool.query('CALL put_Presentacion(?,?,?,?)',
                            [
                                codigoPresentacion, 
                                descripcionPresentacion, 
                                detallePresentacion,
                                codigoMedia
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER