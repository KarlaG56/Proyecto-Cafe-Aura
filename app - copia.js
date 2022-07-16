const express = require ('express');
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));



app.set('view engine', 'ejs');

const bcrypt = require('bcryptjs');

const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave:true,
    saveUninitialized:true
}));

const connection = require('./database/db');


app.get('/login', (req, res)=>{
    res.render('login');
})
app.get('/register', (req, res)=>{
    res.render('register');
})
app.get('/pagina', (req, res)=>{
    res.render('pagina');
})
app.get('/acerca', (req, res)=>{
    res.render('acerca');
})
app.get('/menu', (req, res)=>{
    res.render('menu');
})
app.get('/reservacion', (req, res)=>{
    res.render('reservacion');
})
app.post('/register',async(req, res)=>{
const user = req.body.user;
const name = req.body.name;
const rol = req.body.rol;
const pass = req.body.pass;
let passwordHaash = await bcrypt.hash(pass, 8);
connection.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash},async(error, results)=>{
    if(error){
        console.log(error);
    }else{
        res.render('register',{
            alert: true,
            alertTitle:"Estado del registro",
            alertMessage: "Registro exitoso!",
            alertIcon:'success',
            showConfirmButton:false,
            timer:1500,
            ruta:''
        })
    }
})
})

app.post('/auth', async(req,res)=>{
const user = req.body.user;
const pass = req.body.pass;
let passwordHaash = await bcrypt.hash(pass, 8);
if(user && pass){
    connection.query('SELECT * FROM users WHERE user = ?', [user], async(error, results)=>{
        if(results.length == 0 || !(await bcrypt.compare(pass, results[0].pass))){
            res.render('login',{
                alert: true,
                alertTitle:"Error",
                alertMessage: "Usuario y/o contraseña incorrectos",
                alertIcon:'error',
                showConfirmButton:true,
                timer:false,
                ruta:'login'
            });
        }else{
            req.session.loggedin = true;
            req.session.name=results[0].name
            res.render('login',{
                alert: true,
                alertTitle:"Conexión exitosa",
                alertMessage: "Login correcto",
                alertIcon:'success',
                showConfirmButton:false,
                timer:1500,
                ruta:''
            });
        }
    })
}else{
    res.send('Por favor ingrese un usuario y/o contraseña')
}
})

app.get('/', (req,res)=>{
if(req.session.loggedin){
    res.render('index',{
        login:true,
        name: req.session.name
    });
}else{
    res.render('index',{
        login: false,
        name: 'Debe iniciar sesión'
    })
}
})


app.get('/logout', (req, res)=>{
req.session.destroy(()=>{
    res.redirect('/')
})
})

app.listen(3000, (req, res)=>{
console.log('SERVER RUNNING IN http://localhost:3000')
})
