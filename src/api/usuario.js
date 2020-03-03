//AUTH: JORGE M.
//API MODELO USUARIO CRUD DB

const express = require('express');


const router = express.Router();
const pool = require('../database');//CONNECT DB MYSQL
const jwtToken = require('jsonwebtoken');
const { ensureToken } = require('../lib/auth');//VERIFICAR PERMISOS
const helpers = require('../lib/helpers');

router.get('/conexiones/:codigoUsuario', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    var { codigoUsuario } = req.params;
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Conexiones(?)',codigoUsuario);
    res.json( usuarioTrabajador[0] )
    
});

router.get('/trabajador/conexion', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    var codigo  = "%";
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador_Ultima_Conexion(?)',codigo);
    res.json( usuarioTrabajador[0] )
    
});

router.get('/trabajador/conexion/:codigoUsuario', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    const { codigoUsuario } = req.params;
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador_Ultima_Conexion(?)',codigoUsuario);
    res.json( usuarioTrabajador[0] )
    
});
router.get('/trabajador/conexiones', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    var codigo  = "%";
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador_Conexiones(?)',codigo);
    res.json( usuarioTrabajador[0] )
    
});

router.get('/trabajador/conexiones/:codigoUsuario', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    const { codigoUsuario } = req.params;
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador_Conexiones(?)',codigoUsuario);
    res.json( usuarioTrabajador[0] )
});

router.get('/trabajador/', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    var codigo  = "%";
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador(?)',codigo);
    res.json( usuarioTrabajador[0] )
});
router.get('/trabajador/:codigo', async (req,res)=>{// MOSTRAR USUARIO TRABAJADOR CODIGO
    const { codigo } = req.params;
    const usuarioTrabajador = await pool.query('CALL get_Usuario_Trabajador(?)',codigo);
    res.json( usuarioTrabajador[0] )
});

router.get('/listemos', ensureToken ,async (req,res)=>{// MOSTRAR USUARIOS
    jwtToken.verify(req.token, 'my_secret_key', async (err,data)=> {
        if(err){
            res.sendStatus(403);
        }else{
            const usuarios = await pool.query('SELECT * FROM usuario');
            res.json({
                text:"This is protected",
                data: data
            });
        }
    });
});

router.get('/', async (req,res)=>{// MOSTRAR USUARIOS
    const usuarios = await pool.query('CALL get_Usuario_Lista()');
    res.json( usuarios[0] );
});

router.get('/:codigo', async (req,res)=>{// MOSTRAR USUARIO CODIGO
    const { codigo } = req.params;
    const usuario = await pool.query('CALL get_Usuario(?)',codigo);
    res.json( usuario[0] )
});

router.get('/pass/:texto',async function(req,res){//ENCRYPTAR TEXTO
    const { texto } = req.params;
    try {
        const passwEncrypt = await helpers.encryptPassword(texto);
        res.json(passwEncrypt);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:codigo' ,async (req,res) => {//ELIMINAR UN USUARIO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Usuario(?)',codigo);
        res.json(result)
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){//AGREGAR USUARIO
    const { 
        nombreUsuario,
        contraUsuario, 
        codigoTrabajador,
        codigoMedia,
        estadoUsuario, 
        conexionUsuario   } = req.body;
    try{
        const passwEncrypt = await helpers.encryptPassword(contraUsuario);
        const result= await pool.query('CALL post_Usuario(?,?,?,?,?,?)',
                            [
                                nombreUsuario,
                                passwEncrypt, 
                                codigoTrabajador,
                                codigoMedia,
                                estadoUsuario, 
                                conexionUsuario
                            ] );
        res.json(result)
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/' , async (req,res) => {//MODIFICAR USUARIO CODIGO
    try {
        const { 
            codigoUsuario,
            nombreUsuario,
            contraUsuario, 
            codigoTrabajador,
            codigoMedia,
            estadoUsuario, 
            ultimoIngreso
         } = req.body;
        const passwEncrypt = await helpers.encryptPassword(contraUsuario);
        const result = await pool.query('CALL put_Usuario(?,?,?,?,?,?,?)',
                            [
                                codigoUsuario,
                                nombreUsuario,
                                passwEncrypt, 
                                codigoTrabajador,
                                codigoMedia,
                                estadoUsuario, 
                                ultimoIngreso
                            ] );
        res.json(result)
    }catch(e){
        console.error(e.code);
    }
});

router.post('/signup', async (req,res) =>{
    try {
        const { nombreUsuario, contraUsuario , tipoUsuario , idTrabajador} = req.body;
        const passwEncrypt = await helpers.encryptPassword(contraUsuario);
        const result =  await pool.query('INSERT INTO usuario SET ' +
                                        'nombreUsuario = ?, contraUsuario = ?, tipoUsuario = ?, idTrabajador = ?',
                                        [ nombreUsuario, passwEncrypt, tipoUsuario , idTrabajador , idTrabajador ] );
        res.json(result);
    } catch (e) {
        console.log(e);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER