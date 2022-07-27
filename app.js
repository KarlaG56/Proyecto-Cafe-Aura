const express = require ('express');
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'})

app.use('/', require('./router'));


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
app.get('/indexs', (req, res)=>{
    res.render('indexs');
})
app.get('/indexs2', (req, res)=>{
    res.render('indexs2');
})
app.get('/edit', (req, res)=>{
    res.render('edit');
})
app.get('/edit2', (req, res)=>{
    res.render('edit2');
})
app.get('/register', (req, res)=>{
    res.render('register');
})
app.get('/pagina', (req, res)=>{
    if(req.session.loggedin){
        res.render('pagina',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('pagina',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/acerca', (req, res)=>{
    if(req.session.loggedin){
        res.render('acerca',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('acerca',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/menu', (req, res)=>{
    if(req.session.loggedin){
        res.render('menu',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('menu',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/reservacion', (req, res)=>{
    if(req.session.loggedin){
        res.render('reservacion',{
            login:true,
            name: req.session.name
        });
    }else {
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
      }
})

app.get('/compra', (req, res)=>{
    if(req.session.loggedin){
        res.render('compra',{
            login:true,
            name: req.session.name
        });
    }else{
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
    }
})
app.get('/servicio', (req, res)=>{
    if(req.session.loggedin){
        res.render('servicio',{
            login:true,
            name: req.session.name
        });
    }else{
        res.render('servicio',{
            login: false,
            name: 'Debe iniciar sesión'
        })
    }
})
app.get('/reserva', (req, res)=>{
    if(req.session.reservado){
        res.render('reserva',{
            reserva:true,
            nombre: req.session.nombre,
            mesas: req.session.mesas,
            telefono: req.session.telefono,
            clientes: req.session.clientes,
            fecha: req.session.fecha,
            horario: req.session.horario,
            mensaje: req.session.mensaje
        });
    }else{
        res.render('reservacion',{
            reserva: false,
            nombre: 'Debe hacer una reservación'
        })
    }
})
app.get('/confirms', (req, res)=>{
    res.render('confirms');
})
app.get('/confirmcompra', (req, res)=>{
    res.render('confirmcompra');
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

app.post('/reservacion',async(req, res)=>{
    const mesas = req.body.mesas;
    const telefono = req.body.telefono;
    const clientes = req.body.clientes;
    const fecha = req.body.fecha;
    const horario = req.body.horario;
    const mensaje = req.body.mensaje;
    const nombre = req.body.nombre;
    connection.query('INSERT INTO reservacion SET ?', {mesas:mesas, telefono:telefono, clientes:clientes, fecha:fecha,horario:horario,mensaje:mensaje,nombre:nombre},async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('confirms',{
                alert: true,
                alertTitle:"Estado del registro",
                alertMessage: "Reservación exitosa!",
                alertIcon:'success',
                showConfirmButton:false,
                timer:1500,
                ruta:''
            })
        }
    })
    })
    app.post('/compra',async(req, res)=>{
        const ListaProductos = req.body.ListaProductos;
        const NumeroTelefonico = req.body.NumeroTelefonico;
        const Direccion = req.body.Direccion;
        const Cantidad = req.body.Cantidad;
        const Mensaje = req.body.Mensaje;
        const nombre = req.body.nombre;
        connection.query('INSERT INTO compra SET ?', {ListaProductos:ListaProductos, NumeroTelefonico:NumeroTelefonico, Direccion:Direccion, Cantidad:Cantidad,Mensaje:Mensaje,nombre:nombre },async(error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.render('confirmcompra',{
                    alert: true,
                    alertTitle:"Estado del registro",
                    alertMessage: "Reservación exitosa!",
                    alertIcon:'success',
                    showConfirmButton:false,
                    timer:1500,
                    ruta:''
                })
            }
        })
        })

    app.post('/reserv', async(req,res)=>{
        const mesas = req.body.mesas;
        const telefono = req.body.telefono;
        const clientes = req.body.clientes;
        const fecha = req.body.fecha;
        const horario = req.body.horario;
        const mensaje = req.body.mensaje;
        const nombre = req.body.nombre;
        if(nombre && telefono){
            connection.query('SELECT * FROM reservacion WHERE nombre = ?', [nombre], async(error, results)=>{
                if(results.length == 0){
                    res.render('confirm',{
                        alert: true,
                        alertTitle:"Error",
                        alertMessage: "Usuario y/o telefono incorrectos",
                        alertIcon:'error',
                        showConfirmButton:true,
                        timer:false,
                        ruta:'confirm'
                    });
                }else{
                    req.session.reservado = true;
                    req.session.nombre=results[0].nombre
                    req.session.mesas=results[0].mesas
                    req.session.telefono=results[0].telefono
                    req.session.clientes=results[0].clientes
                    req.session.fecha=results[0].fecha
                    req.session.horario=results[0].horario
                    req.session.mensaje=results[0].mensaje
                    res.render('confirm',{
                        alert: true,
                        alertTitle:"Reserva exitosa",
                        alertMessage: "Reserva correcta",
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
