import Express from 'express'
import {
    crearUsuario,
    getAllUsers,
    editarUsuario,
    eliminarUsuario,
  } from '../../controllers/usuarios/controllers-usuarios.js';

const rutasUsuario = Express.Router();

const generalCallback = (res) => {(err, result) => {
    if (err) {
        res.status(500).send('Error consultando productos');
    } else {
        res.json(result);
    }
}};

rutasUsuario.route('/usuarios').get((req, res) => {
    console.log('alguien consulta lista de usuarios');
    getAllUsers(generalCallback(res));
});

rutasUsuario.route('/usuarios/nuevo').post((req,res) => {
rutasUsuario.route('/usuarios').post((req, res) => {
    /*Este condicional sirve para crear correctamente el estado */
    if(req.body.status === "true"){
        req.body.status = true
    }else if(req.body.status === "false"){
        req.body.status = false
    }
    console.log(typeof(req.body.status))
    crearUsuario(req.body, generalCallback(res));

});

rutasUsuario.route('usuarios/:id').patch((req, res) => {
rutasUsuario.route('/usuarios/:id').patch((req, res) => {
    /*Este condicional sirve para modificar correctamente el estado */
    if(req.body.status === "true"){
        req.body.status = true
    }else if(req.body.status === "false"){
        req.body.status = false
    }
    console.log(typeof(req.body.status))
    editarUsuario(req.params.id, req.body, generalCallback(res));
});

rutasUsuario.route('usuarios/:id').delete((req, res) => {
    eliminarUsuario(req.params.id, generalCallback(res));
});

});

});


export default {rutasUsuario};
