//AUTH: JORGE M.
//API MODELO PRECIO CRUD DB

const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //CONNECT DB MYSQL


router.get('/:codigo' , async (req,res)=>{ // MOSTRAR PRECIO CODIGO
    const { codigo } = req.params;
    const precio = await pool.query('CALL get_Precio(?)', codigo);
    res.json(precio[0]);
});

router.get('/' ,async (req,res)=>{ // MOSTRAR PRECIOS
    const precios = await pool.query('CALL get_Precio_Lista()');
    res.json( precios[0] );
});

router.delete('/:codigo', async (req,res) => { // ELIMINAR PRECIO CODIGO
    const { codigo } = req.params;
    try {
        const result = await pool.query('CALL del_Precio(?)',codigo);
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});

router.post('/',async function(req,res){ //AGREGAR PRECIO

    try{
        const {
            valorPrecio,
            tipoPrecio,
            codigoProducto,
            codigoLocal,
            estadoPrecio  } = req.body;
        
        const result = await pool.query('CALL post_Precio(?,?,?,?,?)',
                            [
                                valorPrecio,
                                tipoPrecio,
                                codigoProducto,
                                codigoLocal,
                                estadoPrecio 
                            ] );
        res.json(result);
    }
    catch(e){
        console.error(e.code);
    }
});

router.put('/', async (req,res) => { //MODIFICAR PRECIO CODIGO
    try {
        const {
            codigoPrecio,
            valorPrecio,
            tipoPrecio,
            codigoProducto,
            codigoLocal,
            estadoPrecio  } = req.body;

        const result = await pool.query('CALL put_Precio(?,?,?,?,?,?)',
                            [
                                codigoPrecio,
                                valorPrecio,
                                tipoPrecio,
                                codigoProducto,
                                codigoLocal,
                                estadoPrecio
                            ] );
        res.json(result);
    }catch(e){
        console.error(e.code);
    }
});



module.exports = router; //EXPORTAR FUNCIONES CRUD a ROUTER