//AUTH: JORGE M.
//CONNECTION DATABASE
const mysql = require('mysql');
const util = require('util');
const { database } = require('./keys.js'); // MYSQL DATABASE keys

const pool = mysql.createPool(database); // CREAR INSTANCIA DE MYSQL

pool.getConnection(function (err,connection){// CREAR CONNETION
    if(err){
        //ERRORES EN CONNETION CON MYSQL DATABASE
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Connetion with DATABASE was closed.'); 
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE has to many Connections.');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE Connection was refused.');
        }
    }
    if(connection) connection.release() // CONNETION SUCCESSS
    console.log('DATABASE Connected');
    return;
});

pool.query = util.promisify(pool.query);// AGENTE DE QUERYS

module.exports = pool; //EXPORTS DATABASE 