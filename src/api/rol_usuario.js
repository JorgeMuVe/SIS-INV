//AUTH: JORGE M.
//API MODELO ROL_USUARIO CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR ROLES DE USUARIO CODIGO DE USUARIO
    const { codigo } = req.params;
    const rolUsuario = await pool.query('CALL get_Rol_Usuario(?)', codigo);
    res.json( rolUsuario[0] );
});

router.get('/' ,async (req,res)=>{ // MOSTRAR ROL_USUARIOS
    const rolUsuarios = await pool.query('CALL get_Rol_Usuario_Lista()');
    res.json( rolUsuarios[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR ROL_USUARIO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Rol_Usuario(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR ROL_USUARIO

    try{
        const {
            codigoRol,
            codigoUsuario,
            estadoRolUsuario  } = req.body;
        
        const result = await pool.query('CALL post_Rol_Usuario(?,?,?)',
                            [
                                codigoRol,
                                codigoUsuario,
                                estadoRolUsuario
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR ROL_USUARIO CODIGO
    try {
        const {
            codigoRolUsuario,
            codigoRol,
            codigoUsuario,
            estadoRolUsuario   } = req.body;

        const result = await pool.query('CALL put_Rol_Usuario(?,?,?,?)',
                            [
                                codigoRolUsuario,
                                codigoRol,
                                codigoUsuario,
                                estadoRolUsuario
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER