const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

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

router.get('/edit/:Id_compra', (req,res)=>{    
    const Id_compra = req.params.Id_compra;
    conexion.query('SELECT * FROM reservacion WHERE Id_compra = ?',[Id_compra] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit2.ejs', {nombre:results[0]});            
        }        
    });
});

router.get('/delete/:Id_compra', (req, res) => {
    const Id_compra = req.params.Id_compra;
    conexion.query('DELETE FROM compra WHERE Id_compra = ?',[Id_compra], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/indexs2');         
        }
    })
});

const crud2 = require('./controllers/crud2');

router.post('/save', crud2.save);
router.post('/update', crud2.update);

module.exports = router;