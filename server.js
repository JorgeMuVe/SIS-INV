const express = require('express');
const cors = require('cors');
const path = require('path');

//INITIALIZATIONS
const app = express();

//SETTINGS
app.set('port', process.env.PORT || 5000);

/* APLICACION MEDI-SEDA */

app.use(express.static(path.join(__dirname,'build')));
app.get('/app*', function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});

//MIDDLEWARES
app.use(express.urlencoded({ extended:false }));
app.use(express.json());

//Global Variables
app.use(cors());
app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin','*');
    //res.header('Access-Control-Allow-Origin' , 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//ROUTES
app.use('/api/clientes',require('./src/api/cliente.js'));
app.use('/api/sesiones',require('./src/api/inicioSesion.js'));
app.use('/api/locales',require('./src/api/local.js'));
app.use('/api/medias',require('./src/api/media.js'));
app.use('/api/precios',require('./src/api/precio.js'));
app.use('/api/presentaciones',require('./src/api/presentacion.js'));
app.use('/api/productos',require('./src/api/producto.js'));
app.use('/api/roles',require('./src/api/rol.js'));
app.use('/api/rol/usuario',require('./src/api/rol_usuario.js'));
app.use('/api/sucursales',require('./src/api/sucursal.js'));
app.use('/api/tipos',require('./src/api/tipos.js'));
app.use('/api/trabajadores',require('./src/api/trabajador.js'));
app.use('/api/traslados/detalles',require('./src/api/trasladoDetalle.js'));
app.use('/api/traslados',require('./src/api/traslado.js'));
app.use('/api/usuarios', require('./src/api/usuario.js'));
app.use('/api/ventas/detalles', require('./src/api/ventaDetalle.js'));
app.use('/api/ventas', require('./src/api/venta.js'));
app.use('/api/registros', require('./src/api/registro.js'));

//STARTING THE SERVER
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
});