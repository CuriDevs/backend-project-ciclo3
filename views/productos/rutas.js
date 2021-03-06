import Express from 'express'
import {
    crearProducto,
    getAllProducts,
    editarProducto,
    eliminarProducto,
} from '../../controllers/productos/controller-Products.js';

const rutasProducto = Express.Router();

const generalCallback = (res) => (err, result) => {
    if (err) {
        console.log("error", err);
        res.status(500).json({ error: err });
    } else {
        res.json(result);
    }
};


rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien hizo get en la ruta /productos');
    getAllProducts(generalCallback(res));
});

rutasProducto.route('/productos').post((req, res) => {
    /*Este condicional sirve para crear correctamente el estado */
    if(req.body.status === "true"){
        req.body.status = true
    }else if(req.body.status === "false"){
        req.body.status = false
    }
    console.log(typeof(req.body.status))
    crearProducto(req.body, generalCallback(res));
    
});

rutasProducto.route('/productos/:id').patch((req, res) => {
    /*Este condicional sirve para modificar correctamente el estado */
    if(req.body.status === "true"){
        req.body.status = true
    }else if(req.body.status === "false"){
        req.body.status = false
    }
    console.log(typeof(req.body.status))
    editarProducto(req.params.id, req.body, generalCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, generalCallback(res));
});


export default rutasProducto;
