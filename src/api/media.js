//AUTH: JORGE M.
//API MODELO MEDIA CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL
const multer = require('multer');
var fs = require('fs');
const path = require('path');


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        //cb(null,'D:\\PROYECTOS\\SIS-INVENTARIO\\hpw-frontend\\public\\img');
        cb(null,'/home/software/Documentos/Proyectos/SIS-INVENTARIO/hpw-frontend/public/img');        
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
};

const upload = multer({
    storage:storage, 
    //limits:{ fileSize: 1024 * 1024 * 5 },
    //fileFilter: fileFilter,
});

router.get('/url/:url' , async (req,res)=>{ // MOSTRAR MEDIA CODIGO
    const { url } = req.params;
    const media = await pool.query('CALL get_media_url(?)', url);
    res.json(media[0]);
});

router.get('/:codigo' , async (req,res)=>{ // MOSTRAR MEDIA CODIGO
    const { codigo } = req.params;
    const media = await pool.query('CALL get_media(?)', codigo);
    res.json(media[0]);
});

router.get('/' ,async (req,res)=>{ // MOSTRAR MEDIAS
    const medias = await pool.query('CALL get_Media_Lista()');
    res.json(medias[0]);
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR MEDIA CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_media(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.delete('/file/:url', async (req,res) => {
    const { url } = req.params;
    try{
        //const urlBusqueda = "D:\\PROYECTOS\\SIS-INVENTARIO\\hpw-frontend\\public\\img\\" + url;
        //fs.unlinkSync(urlBusqueda);
    } catch (e) {
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR MEDIA
    try{
        const {
            nombreMedia,
            altMedia, 
            urlMedia, 
            codigoTipoMedia, 
            codigoUsuario  } = req.body;
            
        const result = await pool.query('CALL post_media(?,?,?,?,?)',
                            [
                                nombreMedia,
                                altMedia, 
                                urlMedia, 
                                codigoTipoMedia, 
                                codigoUsuario
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.post('/file',upload.single('fileMedia'),async(req,res,next) =>{
    res.json(req.file);
});


router.put('/file', upload.single('fileMedia') , async (req,res) => { //MODIFICAR MEDIA CODIGO
    try {
        const { 
            codigoMedia,
            nombreMedia,
            altMedia, 
            urlMedia, 
            codigoTipoMedia, 
            codigoUsuario   } = req.body;

        const result = await pool.query('CALL put_media(?,?,?,?,?,?)',
                            [
                                codigoMedia,
                                nombreMedia,
                                altMedia, 
                                urlMedia, 
                                codigoTipoMedia, 
                                codigoUsuario
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR MEDIA CODIGO
    try {
        const { 
            codigoMedia,
            nombreMedia,
            altMedia, 
            urlMedia, 
            codigoTipoMedia, 
            codigoUsuario   } = req.body;

        const result = await pool.query('CALL put_media(?,?,?,?,?,?)',
                            [
                                codigoMedia,
                                nombreMedia,
                                altMedia, 
                                urlMedia, 
                                codigoTipoMedia, 
                                codigoUsuario
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER