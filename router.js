const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/indexs', (req, res)=>{     
    conexion.query('SELECT * FROM reservacion',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('indexs', {results:results});            
        }   
    })
})

router.get('/indexs2', (req, res)=>{     
    conexion.query('SELECT * FROM compra',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('indexs2', {results:results});            
        }   
    })
})

router.get('/create', (req,res)=>{
    res.render('create');
})

router.get('/edit/:id_reservacion', (req,res)=>{    
    const id_reservacion = req.params.id_reservacion;
    const telefono = req.params.telefono;
    conexion.query('SELECT * FROM reservacion WHERE id_reservacion = ?',[id_reservacion] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {nombre:results[0],telefono:results[0]});            
        }        
    });
});

router.get('/edit2/:Id_compra', (req,res)=>{    
    const Id_compra = req.params.Id_compra;
    conexion.query('SELECT * FROM compra WHERE Id_compra = ?',[Id_compra] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit2.ejs', {nombre:results[0]});            
        }        
    });
});

router.get('/delete/:id_reservacion', (req, res) => {
    const id_reservacion = req.params.id_reservacion;
    conexion.query('DELETE FROM reservacion WHERE id_reservacion = ?',[id_reservacion], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/indexs');         
        }
    })
});

router.get('/delete2/:Id_compra', (req, res) => {
    const Id_compra = req.params.Id_compra;
    conexion.query('DELETE FROM compra WHERE Id_compra = ?',[Id_compra], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/indexs2');         
        }
    })
});

const crud = require('./controllers/crud');

router.post('/save', crud.save);
router.post('/update', crud.update);

module.exports = router;