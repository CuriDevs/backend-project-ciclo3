import Express from 'express'
import {
    crearProducto,
    getAllProducts,
    editarProducto,
    eliminarProducto,
  } from '../../controllers/productos/controller-Products.js';

const rutasProducto = Express.Router();

const generalCallback = (res) => {(err, result) => {
    if (err) {
        res.status(500).send('Error consultando productos'); 
    } else {
        res.json(result);
    }
}};

rutasProducto.route('/productos').get((req, res) => {
    console.log('alguien consulta lista de productos'); 
    getAllProducts(generalCallback(res));
});

rutasProducto.route('/productos/nuevo').post((req,res) => {
    crearProducto(req.body, generalCallback(res));
});

rutasProducto.route('/productos/:id').patch((req, res) => {
    editarProducto(req.params.id, req.body, generalCallback(res));
});

rutasProducto.route('/productos/:id').delete((req, res) => {
    eliminarProducto(req.params.id, req.body, generalCallback(res));
});


export default rutasProducto;