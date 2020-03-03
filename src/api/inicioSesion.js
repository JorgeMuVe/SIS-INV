
//AUTH: JORGE M.
//API MODELO INICIO DE SESION CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL

const helpers = require('../lib/helpers');
const jwtToken = require('jsonwebtoken');

router.get('/:codigo' ,async (req,res)=>{ // MOSTRAR INICIO DE SESION POR CODIGO
    const { codigo } = req.params;
    const InicioSesion = await pool.query('CALL get_Inicio_Sesion(?)', codigo);
    res.json(InicioSesion[0])
});

router.get('/' ,async (req,res)=>{ // MOSTRAR INICIO DE SESION
    const InicioSesiones = await pool.query('CALL get_Inicio_Sesion_Lista()');
    res.json(InicioSesiones[0])
});

router.post('/',async function(req,res){ //AGREGAR INICIO DE SESION
    const { 
        codigoUsuario,
        codigoLocal,
        tokenSesion, 
        estadoSesion, 
        fechaSalida } = req.body;

    try{
        const result = await pool.query('CALL post_Inicio_Sesion(?,?,?,?,?)',
                            [
                                codigoUsuario,
                                codigoLocal,
                                tokenSesion, 
                                estadoSesion, 
                                fechaSalida
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/logout', async (req,res) => { //MODIFICAR INICIO DE SESION CODIGO
    const { codigoUsuario } = req.body;
    try {
        const result = await pool.query('CALL put_Sesion_Cerrar(?)', codigoUsuario );
        res.json(result);
    }catch(e){ console.error(e.code) }
});

router.put('/', async (req,res) => { //MODIFICAR INICIO DE SESION CODIGO
    const {
        codigoSesion,   
        codigoUsuario,
        codigoLocal,
        tokenSesion, 
        estadoSesion, 
        fechaSalida } = req.body;
    try {
        const result = await pool.query('CALL put_Inicio_Sesion(?,?,?,?,?,?)',
                            [        
                                codigoSesion,   
                                codigoUsuario,
                                codigoLocal,
                                tokenSesion, 
                                estadoSesion, 
                                fechaSalida
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR INICIO DE SESION ID
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Inicio_Sesion(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/login', async (req,res) => {//INGRESAR AL SISTEMA
    try {
        const { nombreUsuario, contraUsuario , codigoLocal } = req.body; // DATOS OBTENIDOS DE LA APLICACION
        const usuarios = await pool.query('SELECT * FROM usuario WHERE nombreUsuario = ?',[nombreUsuario]); // BUSCAMOS SI EL NOMBRE DEL CLIENTE EXISTE
        if(usuarios[0]){ // SI EXISTE UN USUARIO EN LA CONSULTA
            const usuario = usuarios[0]; // OBTENEMOS AL PRIMER USUARIO DE LA LISTA
            const validPass = await helpers.matchPassword(contraUsuario,usuario.contraUsuario); // VALIDACION Y COMPARACION DE PASSWORDS
            if(validPass){
                const tokenSesion = jwtToken.sign(usuario.codigoUsuario,'wcs_secret_key'); // GENERACION DE TOKEN DE SESION           
                const sesion = await pool.query('CALL post_Inicio_Sesion(?,?,?,?,?)',
                                                [
                                                    usuario.codigoUsuario,
                                                    codigoLocal,
                                                    tokenSesion,
                                                    true,
                                                    null
                                                ]);
                this.jsonLogin = {
                    codEstado : sesion[0][0].codEstado,
                    codigoUsuario : usuario.codigoUsuario,
                    tokenSesion : tokenSesion
                }
            }
            else { this.jsonLogin = { codEstado : "702" }}
        }
        else { this.jsonLogin = { codEstado : "701" }}
        res.json(this.jsonLogin);

   } catch (e) { console.log(e); }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER