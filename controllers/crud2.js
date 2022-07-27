//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const nombre= req.body.nombre;
    const NumeroTelefonico = req.body.NumeroTelefonico;
    const Cantidad = req.body.Cantidad;
    conexion.query('INSERT INTO compra SET ?',{nombre:nombre, NumeroTelefonico:NumeroTelefonico, Cantidad:Cantidad}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/indexs2');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const Id_compra = req.body.Id_compra;
    const nombre = req.body.nombre;
    const NumeroTelefonico = req.body.NumeroTelefonico;
    const Cantidad = req.body.Cantidad;
    conexion.query('UPDATE compra SET ? WHERE Id_compra = ?',[{nombre:nombre, NumeroTelefonico:NumeroTelefonico, Cantidad:Cantidad}, Id_compra], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/indexs2');         
        }
});
};