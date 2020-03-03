
//AUTH: JORGE M.

// =================================================================
// ============== API MODELO TIPO_DOCUMENTO CRUD DB ================
// =================================================================

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/documento/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_DOCUMENTO CODIGO
    const { codigo } = req.params;
    const tipoDocumento = await pool.query('CALL get_Tipo_Documento(?)', codigo);
    res.json( tipoDocumento[0] );
});

router.get('/documento/' ,async (req,res)=>{ // MOSTRAR TIPOS_DOCUMENTOS
    const tipoDocumentos = await pool.query('CALL get_Tipo_Documento_Lista()');
    res.json( tipoDocumentos[0] );
});

router.delete('/documento/:codigo', async (req,res) => { // ELIMINAR TIPO_DOCUMENTO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Documento(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/documento/',async function(req,res){ //AGREGAR TIPO_DOCUMENTO

    try{
        const {
            nombreTipoDocumento, 
            cantidadCaracteres } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Documento(?,?)',
                            [
                                nombreTipoDocumento, 
                                cantidadCaracteres
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/documento/', async (req,res) => { //MODIFICAR TIPO_DOCUMENTO CODIGO
    try {
        const {
            codigoTipoDocumento, 
            nombreTipoDocumento, 
            cantidadCaracteres  } = req.body;

        const result = await pool.query('CALL put_Tipo_Documento(?,?,?)',
                            [
                                codigoTipoDocumento, 
                                nombreTipoDocumento, 
                                cantidadCaracteres
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});


// =================================================================
// ============== API MODELO TIPO_LOCAL CRUD DB ================
// =================================================================

router.get('/local/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_LOCAL CODIGO
    const { codigo } = req.params;
    const tipoLocal = await pool.query('CALL get_Tipo_Local(?)', codigo);
    res.json( tipoLocal[0] );
});

router.get('/local/' ,async (req,res)=>{ // MOSTRAR TIPOS_LOCALES
    const tipoLocales = await pool.query('CALL get_Tipo_Local_Lista()');
    res.json( tipoLocales[0] );
});

router.delete('/local/:codigo', async (req,res) => { // ELIMINAR TIPO_LOCAL CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Local(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/local/',async function(req,res){ //AGREGAR TIPO_LOCAL

    try{
        const {         
            nombreTipoLocal } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Local(?)',
                            [
                                nombreTipoLocal
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/local/', async (req,res) => { //MODIFICAR TIPO_LOCAL CODIGO
    try {
        const {
            codigoTipoLocal, 
            nombreTipoLocal } = req.body;

        const result = await pool.query('CALL put_Tipo_Local(?,?)',
                            [
                                codigoTipoLocal, 
                                nombreTipoLocal
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

// =================================================================
// ============== API MODELO TIPO_MEDIA CRUD DB ================
// =================================================================

router.get('/media/' ,async (req,res)=>{ // MOSTRAR TIPOS_MEDIAS
    const tipoMedias = await pool.query('CALL get_Tipo_Media_Lista()');
    res.json( tipoMedias[0] );
});

router.get('/media/nombre/:nombre' , async ( req , res )=>{ // MOSTRAR TIPOS_MEDIAS
    const { nombre } = req.params;
    const nombreBusqueda = nombre.replace("-","/");
    const tipoMedia = await pool.query('CALL get_Tipo_Media_Nombre(?)',nombreBusqueda);
    res.json( tipoMedia[0] );
});

router.get('/media/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_MEDIA CODIGO
    const { codigo } = req.params;
    const tipoMedia = await pool.query('CALL get_Tipo_Media(?)', codigo);
    res.json( tipoMedia[0] );
});


router.delete('/media/:codigo', async (req,res) => { // ELIMINAR TIPO_MEDIA CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Media(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/media/',async function(req,res){ //AGREGAR TIPO_MEDIA

    try{
        const {         
            nombreTipoMedia, 
            descripcionTipoMedia } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Media(?,?)',
                            [
                                nombreTipoMedia, 
                                descripcionTipoMedia
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/media/', async (req,res) => { //MODIFICAR TIPO_MEDIA CODIGO
    try {
        const {
            codigoTipoMedia, 
            nombreTipoMedia, 
            descripcionTipoMedia } = req.body;

        const result = await pool.query('CALL put_Tipo_Media(?,?,?)',
                            [
                                codigoTipoMedia, 
                                nombreTipoMedia, 
                                descripcionTipoMedia
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

// =================================================================
// ============== API MODELO TIPO_PRECIO CRUD DB ================
// =================================================================

router.get('/precio/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_PRECIO CODIGO
    const { codigo } = req.params;
    const tipoPrecio = await pool.query('CALL get_Tipo_Precio(?)', codigo);
    res.json( tipoPrecio[0] );
});

router.get('/precio/' ,async (req,res)=>{ // MOSTRAR TIPOS_PRECIOS
    const tipoPrecios = await pool.query('CALL get_Tipo_Precio_Lista()');
    res.json( tipoPrecios[0] );
});

router.delete('/precio/:codigo', async (req,res) => { // ELIMINAR TIPO_PRECIO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Precio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/precio/',async function(req,res){ //AGREGAR TIPO_PRECIO

    try{
        const { 
            nombreTipoPrecio,
            descripcionTipoPrecio   } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Precio(?,?)',
                            [
                                nombreTipoPrecio,
                                descripcionTipoPrecio
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/precio/', async (req,res) => { //MODIFICAR TIPO_PRECIO CODIGO
    try {
        const {            
            codigoTipoPrecio,
            nombreTipoPrecio,
            descripcionTipoPrecio } = req.body;

        const result = await pool.query('CALL put_Tipo_Precio(?,?,?)',
                            [
                                codigoTipoPrecio,
                                nombreTipoPrecio,
                                descripcionTipoPrecio
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

// =================================================================
// ============== API MODELO TIPO_PRODUCTO CRUD DB ================
// =================================================================

router.get('/producto/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_PRODUCTO CODIGO
    const { codigo } = req.params;
    const tipoProducto = await pool.query('CALL get_Tipo_Producto(?)', codigo);
    res.json( tipoProducto[0] );
});

router.get('/producto/' ,async (req,res)=>{ // MOSTRAR TIPOS_PRODUCTOS
    const tipoProductos = await pool.query('CALL get_Tipo_Producto_Lista()');
    res.json( tipoProductos[0] );
});

router.delete('/producto/:codigo', async (req,res) => { // ELIMINAR TIPO_PRODUCTO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Producto(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/producto/',async function(req,res){ //AGREGAR TIPO_PRODUCTO

    try{
        const { 
            nombreTipoProducto,
            descripcionTipoProducto   } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Producto(?,?)',
                            [
                                nombreTipoProducto,
                                descripcionTipoProducto
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/producto/', async (req,res) => { //MODIFICAR TIPO_PRODUCTO CODIGO
    try {
        const {            
            codigoTipoProducto, 
            nombreTipoProducto,
            descripcionTipoProducto } = req.body;

        const result = await pool.query('CALL put_Tipo_Producto(?,?,?)',
                            [
                                codigoTipoProducto, 
                                nombreTipoProducto,
                                descripcionTipoProducto
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});


// =================================================================
// ============== API MODELO TIPO_TRASLADO CRUD DB ================
// =================================================================

router.get('/traslado/:codigo' , async (req,res)=>{ // MOSTRAR TIPO_TRASLADO CODIGO
    const { codigo } = req.params;
    const tipoTraslado = await pool.query('CALL get_Tipo_Traslado(?)', codigo);
    res.json( tipoTraslado[0] );
});

router.get('/traslado/' ,async (req,res)=>{ // MOSTRAR TIPOS_TRASLADOS
    const tipoTraslados = await pool.query('CALL get_Tipo_Traslado_Lista()');
    res.json( tipoTraslados[0] );
});

router.delete('/traslado/:codigo', async (req,res) => { // ELIMINAR TIPO_TRASLADO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Tipo_Traslado(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/traslado/',async function(req,res){ //AGREGAR TIPO_TRASLADO

    try{
        const { 
            nombreTipoTraslado   } = req.body;
        
        const result = await pool.query('CALL post_Tipo_Traslado(?)',
                            [
                                nombreTipoTraslado,
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/traslado/', async (req,res) => { //MODIFICAR TIPO_TRASLADO CODIGO
    try {
        const {            
            codigoTipoTraslado, 
            nombreTipoTraslado } = req.body;

        const result = await pool.query('CALL put_Tipo_Traslado(?,?)',
                            [
                                codigoTipoTraslado, 
                                nombreTipoTraslado
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER