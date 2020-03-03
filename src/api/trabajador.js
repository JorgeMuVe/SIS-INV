
//AUTH: JORGE M.
//API MODELO TRABAJADOR CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR TRABAJADOR CODIGO
    const { codigo } = req.params;
    const trabajador = await pool.query('CALL get_Trabajador(?)', codigo);
    res.json( trabajador[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR TRABAJADORES
    const trabajadores = await pool.query('CALL get_Trabajador_Lista()');
    res.json( trabajadores[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR TRABAJADOR CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Trabajador(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR TRABAJADOR

    try{
        const {
			nombreTrabajador, apePaTrabajador, apeMaTrabajador,
            codigoTipoDocumento,numDocuTrabajador,numTeleTrabajador,
            correoTrabajador, direccionTrabajador, especialidadTrabajador,
            estadoTrabajador,fechaNacimiento,codigoMedia  } = req.body;
        
        const result = await pool.query('CALL post_Trabajador(?,?,?,?,?,?,?,?,?,?,?,?)',
                            [
                                nombreTrabajador, apePaTrabajador, apeMaTrabajador,
                                codigoTipoDocumento,numDocuTrabajador,numTeleTrabajador,
                                correoTrabajador, direccionTrabajador, especialidadTrabajador,
                                estadoTrabajador,fechaNacimiento,codigoMedia
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR TRABAJADOR CODIGO
    try {
        const {
            codigoTrabajador,
			nombreTrabajador, apePaTrabajador, apeMaTrabajador,
            codigoTipoDocumento,numDocuTrabajador,numTeleTrabajador,
            correoTrabajador, direccionTrabajador, especialidadTrabajador,
            estadoTrabajador,fechaNacimiento,codigoMedia    } = req.body;

        const result = await pool.query('CALL put_Trabajador(?,?,?,?,?,?,?,?,?,?,?,?,?)',
                            [
                                codigoTrabajador,
                                nombreTrabajador, apePaTrabajador, apeMaTrabajador,
                                codigoTipoDocumento,numDocuTrabajador,numTeleTrabajador,
                                correoTrabajador, direccionTrabajador, especialidadTrabajador,
                                estadoTrabajador,fechaNacimiento,codigoMedia
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER