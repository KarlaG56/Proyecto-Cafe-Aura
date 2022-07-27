//Invocamos a la conexion de la DB
const conexion = require('../database/db');
//GUARDAR un REGISTRO
exports.save = (req, res)=>{
    const nombre= req.body.nombre;
    const telefono = req.body.telefono;
    const fecha = req.body.fecha;
    conexion.query('INSERT INTO reservacion SET ?',{nombre:nombre, telefono:telefono, fecha:fecha}, (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.redirect('/indexs');         
        }
});
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res)=>{
    const id_reservacion = req.body.id_reservacion;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const fecha = req.body.fecha;
    conexion.query('UPDATE reservacion SET ? WHERE id_reservacion = ?',[{nombre:nombre, telefono:telefono, fecha:fecha}, id_reservacion], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/indexs');         
        }
});
};