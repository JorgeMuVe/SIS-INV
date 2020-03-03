//AUTH: JORGE M.
//API MODELO ROL CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR ROL CODIGO
    const { codigo } = req.params;
    const Rol = await pool.query('CALL get_Rol(?)', codigo);
    res.json(Rol[0]);
});

router.get('/' ,async (req,res)=>{ // MOSTRAR ROLES
    const Roles = await pool.query('CALL get_Rol_Lista()');
    res.json( Roles[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR ROL CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Rol(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR ROL

    try{
        const {
            codigoPadre, 
            nombreRol, 
            estadoRol, 
            descripcionRol  } = req.body;
        
        const result = await pool.query('CALL post_Rol(?,?,?,?)',
                            [
                                codigoPadre, 
                                nombreRol, 
                                estadoRol, 
                                descripcionRol
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR ROL CODIGO
    try {
        const {
            codigoRol,
            codigoPadre, 
            nombreRol, 
            estadoRol, 
            descripcionRol   } = req.body;

        const result = await pool.query('CALL put_Rol(?,?,?,?,?)',
                            [
                                codigoRol,
                                codigoPadre, 
                                nombreRol, 
                                estadoRol, 
                                descripcionRol
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER