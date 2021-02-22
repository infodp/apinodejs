var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.use(express.json());
app.use(cors());
//Establecemos los prámetros de conexión
var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users_db'
});
//Conexión a la database
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("¡Conexión exitosa a la base de datos!");
    }
});
app.get('/', function(req,res){
    res.send('Ruta INICIO');
});
//Mostrar todos los artículos
app.get('/api/users', (req,res)=>{
    conexion.query('SELECT * FROM users100', (error,filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    })
});

const puerto = process.env.PUERTO || 3000;
app.listen(puerto, function(){
    console.log("Servidor Ok en puerto:"+puerto);
});