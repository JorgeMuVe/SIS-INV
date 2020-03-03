
//AUTH: JORGE M.
//API REGISTROS TEMPORALES DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

// ELIMINAR REGISTROS DE VENTA Y ENVIO(TRASLADOS) VACIOS
router.delete('/vacio/:codigo', async (req,res) => { // ELIMINAR REGISTROS VACIOS POR CODIGO LOCAL
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Registro_Vacio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});


module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER